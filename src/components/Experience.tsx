"use client";

import Reveal from "./Reveal";
import { site } from "@/lib/site.config";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-container px-6 py-24 md:py-32"
    >
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Where I&apos;ve shipped.
        </h2>
      </Reveal>

      <div className="mt-14 max-w-3xl">
        {site.experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05}>
            <div className="relative border-l border-white/10 pb-12 pl-8 last:pb-0">
              <span className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-zinc-950" />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-white/5 text-[9px] font-semibold text-zinc-200">
                  {job.logoSlug ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://cdn.simpleicons.org/${job.logoSlug}/ffffff`}
                        alt={job.company}
                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                        onError={(e) => {
                          const img = e.currentTarget;
                          const fallback = img.parentElement?.querySelector("span") as HTMLElement | null;
                          img.style.display = "none";
                          if (fallback) fallback.classList.remove("hidden");
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <span className="hidden z-10 flex h-full w-full items-center justify-center">
                        {job.logoText ?? job.company.slice(0, 2).toUpperCase()}
                      </span>
                    </>
                  ) : (
                    <span className="flex h-full w-full items-center justify-center">
                      {job.logoText ?? job.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">
                  {job.role}
                  <span className="text-zinc-500"> · {job.company}</span>
                </h3>
              </div>

              <div className="mt-1 font-mono text-xs text-zinc-500">
                {job.period} · {job.location}
              </div>

              <p className="mt-4 text-pretty text-sm leading-relaxed text-zinc-300">
                {job.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-zinc-400">
                    <span className="mt-2 h-px w-4 shrink-0 bg-accent/60" />
                    <span className="text-pretty">{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-xs text-zinc-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
