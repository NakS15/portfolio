"use client";

import { useReducedMotion } from "framer-motion";

// Deterministic positions/timings (no Math.random) to avoid a client/server
// hydration mismatch.
const SEEDS = [
  { left: "6%", delay: 0, duration: 2.8 },
  { left: "20%", delay: 1.4, duration: 3.2 },
  { left: "38%", delay: 0.6, duration: 2.5 },
  { left: "55%", delay: 2.1, duration: 3.6 },
  { left: "70%", delay: 0.2, duration: 2.9 },
  { left: "88%", delay: 1.8, duration: 3.1 },
];

/** Subtle falling light-trail background accent. Skipped under reduced motion. */
export default function Meteors() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SEEDS.map((s, i) => (
        <span
          key={i}
          className="absolute top-[-10%] h-0.5 w-0.5 animate-meteor rounded-full bg-accent-strong before:absolute before:top-1/2 before:h-px before:w-14 before:-translate-y-1/2 before:bg-gradient-to-r before:from-accent-strong before:to-transparent"
          style={{
            left: s.left,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
