import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { bioContext, fallbackAnswers } from "@/lib/bio";

// The Anthropic SDK needs the Node runtime (not edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || process.env.AI_MODEL || "openai/gpt-4o-mini";
const ANTHROPIC_MODEL = process.env.AI_MODEL || "claude-3-5-haiku-latest";

const FORBIDDEN_PATTERNS = [
  /\b(sex|sexual|nude|porn|explicit|adult|fetish|lesbian|gay|xxx|erotic)\b/i,
  /\b(hate|racist|slur|nazi|terrorist|bomb|kill|murder|weapon|assault)\b/i,
  /\b(drug|cocaine|heroin|meth|lsd|hack|phish|scam|fraud)\b/i,
  /\b(politics|election|government|president|minister|religion|church|mosque|temple)\b/i,
  /\b(sexual content|adult content|naked|pornographic)\b/i,
];

const PROFILE_HINTS = [
  "nakul",
  "bukkawar",
  "experience",
  "backend",
  "genai",
  "rag",
  "mcp",
  "agent",
  "ai",
  "java",
  "python",
  "typescript",
  "javascript",
  "spring",
  "quarkus",
  "node",
  "fastapi",
  "react",
  "angular",
  "aws",
  "gcp",
  "azure",
  "kafka",
  "kubernetes",
  "docker",
  "bmw",
  "ibm",
  "hdfc",
  "fastag",
  "resume",
  "cv",
  "contact",
  "email",
  "linkedin",
  "github",
  "remote",
  "hire",
  "job",
  "role",
  "fit",
  "skills",
  "projects",
  "work",
  "career",
];

function validateQuestion(question: string): { ok: boolean; message?: string } {
  const normalized = question.toLowerCase();

  if (normalized.length < 3) {
    return { ok: false, message: "Please ask a real question about Nakul's experience, projects, or skills." };
  }

  if (FORBIDDEN_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return {
      ok: false,
      message: "I can only help with questions about Nakul's background, work, skills, projects, and hiring fit.",
    };
  }

  const hasProfileHint = PROFILE_HINTS.some((hint) => normalized.includes(hint));
  const looksLikeGeneralChat = !hasProfileHint;

  if (looksLikeGeneralChat) {
    const generalTopics = [
      "hello",
      "hi",
      "who are you",
      "what is the weather",
      "tell me a joke",
      "write code",
      "math",
      "science",
      "movie",
      "song",
      "travel",
      "recipe",
      "relationship",
      "love",
    ];

    const generalMatch = generalTopics.some((topic) => normalized.includes(topic));
    if (!generalMatch) {
      return {
        ok: false,
        message: "I can only answer questions related to Nakul's profile, work, GenAI projects, and hiring fit.",
      };
    }
  }

  return { ok: true };
}

/**
 * Deterministic answer used when there is no API key or the API call fails.
 * Keeps the demo working on static/keyless deploys.
 */
function fallback(question: string): string {
  const hit = fallbackAnswers.find((f) => f.match.test(question));
  if (hit) return hit.answer;
  return "Happy to help. I can speak to Nakul's backend experience, his GenAI work (RAG, MCP, and agents), his time at BMW and IBM, and why he's a fit for remote and hybrid roles. For anything specific, email him at nakulbukkawar07@gmail.com.";
}

export async function POST(req: Request) {
  let question = "";
  try {
    const body = await req.json();
    question = typeof body?.question === "string" ? body.question.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!question) {
    return NextResponse.json({ error: "Ask a question first." }, { status: 400 });
  }
  if (question.length > 500) question = question.slice(0, 500);

  const validation = validateQuestion(question);
  if (!validation.ok) {
    return NextResponse.json({
      answer: validation.message,
      source: "blocked",
    });
  }

  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  // No key configured -> seamless canned answer.
  if (!openRouterKey && !anthropicKey) {
    return NextResponse.json({ answer: fallback(question), source: "fallback" });
  }

  try {
    if (openRouterKey) {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Nakul Portfolio",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [
            { role: "system", content: bioContext },
            { role: "user", content: question },
          ],
          temperature: 0.4,
          max_tokens: 400,
        }),
      });

      if (!res.ok) {
        throw new Error(`OpenRouter error: ${res.status}`);
      }

      const data = await res.json();
      const answer = data?.choices?.[0]?.message?.content?.trim();

      if (answer) {
        return NextResponse.json({ answer, source: "ai" });
      }
    }

    if (anthropicKey) {
      const client = new Anthropic({ apiKey: anthropicKey });
      const msg = await client.messages.create({
        model: ANTHROPIC_MODEL,
        max_tokens: 400,
        system: bioContext,
        messages: [{ role: "user", content: question }],
      });

      const answer = msg.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();

      return NextResponse.json({
        answer: answer || fallback(question),
        source: answer ? "ai" : "fallback",
      });
    }
  } catch {
    // Never break the demo: degrade to the canned answer.
    return NextResponse.json({ answer: fallback(question), source: "fallback" });
  }

  return NextResponse.json({ answer: fallback(question), source: "fallback" });
}
