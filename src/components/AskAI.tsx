"use client";

import { useRef, useState } from "react";
import { PaperPlaneRight, Sparkle } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { suggestedQuestions } from "@/lib/bio";

type Msg = { role: "user" | "assistant"; content: string };

const INTRO =
  "Hi, I'm Nakul's AI. Ask me about his backend systems, GenAI work, BMW and IBM experience, or whether he's a fit for remote or hybrid engineering roles.";

export default function AskAI() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function scrollToEnd() {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  }

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    setError("");
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    setLoading(true);
    scrollToEnd();

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setMessages((m) => [...m, { role: "assistant", content: data.answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
      scrollToEnd();
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    ask(input);
  }

  const showIntro = messages.length === 0 && !loading;

  return (
    <section
      id="ask"
      className="relative mx-auto max-w-container px-6 py-24 md:py-32"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent-strong">
              <Sparkle weight="fill" className="h-3.5 w-3.5" />
              Live demo
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              Ask my AI.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-zinc-400">
              This is a small retrieval-grounded assistant I wired up with the
              Anthropic API. It only knows my background, and it won&apos;t make
              things up. Kick the tires.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <Reveal delay={0.1}>
            <div className="glass flex h-[30rem] flex-col rounded-2xl border border-white/10">
              <div
                ref={scrollRef}
                aria-live="polite"
                className="flex-1 space-y-4 overflow-y-auto p-5 md:p-6"
              >
                {showIntro ? (
                  <Bubble role="assistant" reduce={reduce}>
                    {INTRO}
                  </Bubble>
                ) : null}

                <AnimatePresence initial={false}>
                  {messages.map((m, i) => (
                    <Bubble key={i} role={m.role} reduce={reduce}>
                      {m.content}
                    </Bubble>
                  ))}
                </AnimatePresence>

                {loading ? <Typing /> : null}
                {error ? (
                  <p className="text-sm text-red-400/90">{error}</p>
                ) : null}
              </div>

              <div className="border-t border-white/10 p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => ask(q)}
                      disabled={loading}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400 transition-colors hover:border-accent/50 hover:text-accent-strong disabled:opacity-40"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <form onSubmit={onSubmit} className="flex items-center gap-2">
                  <label htmlFor="ask-input" className="sr-only">
                    Ask a question about Nakul
                  </label>
                  <input
                    id="ask-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my experience…"
                    autoComplete="off"
                    maxLength={500}
                    className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    aria-label="Send question"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-zinc-950 transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <PaperPlaneRight weight="fill" className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Bubble({
  role,
  reduce,
  children,
}: {
  role: "user" | "assistant";
  reduce: boolean | null;
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
          isUser
            ? "bg-white/10 text-zinc-300"
            : "bg-accent text-zinc-950"
        }`}
      >
        {isUser ? "You" : <Sparkle weight="fill" className="h-4 w-4" />}
      </div>
      <div
        className={`max-w-[85%] text-pretty rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-accent/15 text-zinc-100"
            : "bg-white/[0.04] text-zinc-200"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Typing() {
  return (
    <div className="flex gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-zinc-950">
        <Sparkle weight="fill" className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl bg-white/[0.04] px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
