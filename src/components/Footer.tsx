"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { site } from "@/lib/site.config";

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-container px-6 pb-12 pt-8">
      <div className="flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-mono text-sm font-bold text-zinc-950">
            {site.initials}
          </span>
          <div className="text-sm text-zinc-400">
            {site.name}
            <span className="text-zinc-600"> · {site.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
            {site.socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === "email" ? undefined : "_blank"}
                rel={s.key === "email" ? undefined : "noreferrer"}
                className="transition-colors hover:text-accent-strong"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-accent/50 hover:text-accent-strong"
          >
            <ArrowUp weight="bold" className="h-4 w-4" />
          </a>
        </div>
      </div>

      <p className="mt-8 font-mono text-xs text-zinc-600">
        Built with Next.js, Tailwind, and Motion. Designed and coded by{" "}
        {site.name.split(" ")[0]}.
      </p>
    </footer>
  );
}
