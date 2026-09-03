"use client";

import Reveal from "./Reveal";
import { site } from "@/lib/site.config";

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-container px-6 py-24 md:py-32"
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Backend depth, <span className="text-accent">GenAI</span> range.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
              <p>
                I&apos;m a full-stack engineer from Nagpur with 4.2+ years building
                production systems that have to stay resilient, scalable, and
                correct under real-world pressure. Most of my work sits in Java,
                Python, and TypeScript services that power business-critical flows.
              </p>
              <p>
                Lately I&apos;ve been building the GenAI layer on top of that: RAG
                systems, MCP tooling, and agent workflows grounded in backend
                reliability. I enjoy the overlap where solid engineering and
                practical AI meet.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4 md:col-span-5">
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              {site.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={site.photoUrl}
                  alt={site.name}
                  className="aspect-[4/3] w-full object-cover md:aspect-[5/4]"
                />
              ) : (
                <div className="grid aspect-[4/3] w-full place-items-center bg-gradient-to-br from-accent/25 via-zinc-900 to-zinc-950 md:aspect-[5/4]">
                  <span className="font-mono text-6xl font-bold text-accent">
                    {site.initials}
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {site.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <div className="font-mono text-2xl font-bold text-accent">
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm leading-snug text-zinc-400">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
