"use client";

import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  SealCheck,
  ArrowUpRight,
  FileArrowDown,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { site } from "@/lib/site.config";

const iconFor: Record<string, Icon> = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  credly: SealCheck,
  email: EnvelopeSimple,
};

export default function Connect() {
  return (
    <section
      id="connect"
      className="relative mx-auto max-w-container px-6 py-24 md:py-32"
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent/[0.07] via-white/[0.02] to-transparent p-8 md:p-14">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-zinc-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {site.availability}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
                Let&apos;s build something good.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-zinc-400">
                Hiring for a GenAI, backend, or full-stack role? I&apos;m open to
                remote work. Grab a resume or reach out on any channel.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                {site.resumes.map((r, i) => (
                  <MagneticButton
                    key={r.href}
                    href={r.href}
                    download
                    variant={i === 0 ? "primary" : "ghost"}
                    aria-label={`Download ${r.label}`}
                  >
                    <FileArrowDown weight="bold" className="h-4 w-4" />
                    {r.label}
                  </MagneticButton>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {site.socials.map((social, i) => {
                const Glyph = iconFor[social.key] ?? ArrowUpRight;
                const isMail = social.key === "email";
                return (
                  <Reveal key={social.key} delay={0.1 + i * 0.06}>
                    <a
                      href={social.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noreferrer"}
                      className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-accent/40"
                    >
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-zinc-300 ring-1 ring-inset ring-white/10 transition-colors group-hover:bg-accent/10 group-hover:text-accent group-hover:ring-accent/30">
                        <Glyph weight="fill" className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-zinc-100">
                          {social.label}
                        </div>
                        <div className="truncate font-mono text-xs text-zinc-500">
                          {social.handle}
                        </div>
                      </div>
                      <ArrowUpRight
                        weight="bold"
                        className="ml-auto h-5 w-5 shrink-0 text-zinc-600 transition-all group-hover:text-accent-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
