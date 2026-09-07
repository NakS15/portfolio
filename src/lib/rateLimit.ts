/**
 * ------------------------------------------------------------------
 *  Rate limiter for the /api/ask endpoint.
 * ------------------------------------------------------------------
 *  If UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are set, this
 *  uses a real distributed limiter (works correctly across multiple
 *  serverless instances, survives redeploys/cold starts).
 *
 *  If they are NOT set, it falls back to a simple in-memory limiter so
 *  the project still works out of the box with zero setup. The
 *  in-memory fallback is per-instance and resets on cold start, so it
 *  is a "best effort" guard rather than a hard limit in that mode.
 * ------------------------------------------------------------------
 */

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 8;

type LimitResult = { ok: boolean; retryAfterSec?: number };

// ---- In-memory fallback -------------------------------------------------
const memoryStore = new Map<string, { count: number; resetAt: number }>();

function pruneMemoryStore() {
  const now = Date.now();
  for (const [key, value] of memoryStore) {
    if (now > value.resetAt) memoryStore.delete(key);
  }
}

function checkMemoryRateLimit(key: string): LimitResult {
  pruneMemoryStore();
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
    return { ok: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true };
}

// ---- Upstash-backed limiter (lazy-loaded, only if configured) ----------
let upstashLimiterPromise: Promise<{
  limit: (key: string) => Promise<{ success: boolean; reset: number }>;
} | null> | null = null;

function getUpstashLimiter() {
  if (upstashLimiterPromise) return upstashLimiterPromise;

  upstashLimiterPromise = (async () => {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) return null;

    try {
      const { Ratelimit } = await import("@upstash/ratelimit");
      const { Redis } = await import("@upstash/redis");

      const redis = new Redis({ url, token });
      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS, `${WINDOW_SECONDS} s`),
        analytics: false,
        prefix: "ask-ai-ratelimit",
      });

      return {
        limit: async (key: string) => {
          const res = await ratelimit.limit(key);
          return { success: res.success, reset: res.reset };
        },
      };
    } catch {
      // If the packages are missing or misconfigured, silently fall back.
      return null;
    }
  })();

  return upstashLimiterPromise;
}

/**
 * Check whether `key` (usually the client IP) is within the rate limit.
 * Uses Upstash Redis when configured, otherwise falls back to an
 * in-memory, per-instance limiter.
 */
export async function checkRateLimit(key: string): Promise<LimitResult> {
  const upstash = await getUpstashLimiter();

  if (upstash) {
    try {
      const result = await upstash.limit(key);
      if (result.success) return { ok: true };
      return { ok: false, retryAfterSec: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)) };
    } catch {
      // Redis unreachable - fail open to the in-memory limiter rather than
      // blocking all traffic because of an infra hiccup.
      return checkMemoryRateLimit(key);
    }
  }

  return checkMemoryRateLimit(key);
}
