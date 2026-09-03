"use client";

import { SealCheck, ArrowUpRight } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { site } from "@/lib/site.config";

const credly = site.socials.find((s) => s.key === "credly");

export default function Certs() {
  return (
    <section
      id="certs"
      className="relative mx-auto max-w-container px-6 py-24 md:py-32"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Certified.
          </h2>
        </Reveal>
        {credly ? (
          <Reveal delay={0.05}>
            <a
              href={credly.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono text-sm text-zinc-400 transition-colors hover:text-accent-strong"
            >
              Verify on Credly
              <ArrowUpRight
                weight="bold"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        ) : null}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {site.certs.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 0.06}>
            <a
              href={cert.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-accent/40"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
                <SealCheck weight="fill" className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-semibold text-zinc-100">
                  {cert.title}
                </div>
                <div className="mt-0.5 text-sm text-zinc-500">
                  {cert.issuer}
                </div>
              </div>
              <ArrowUpRight
                weight="bold"
                className="ml-auto h-5 w-5 shrink-0 text-zinc-600 transition-colors group-hover:text-accent-strong"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
