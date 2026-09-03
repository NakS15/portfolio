"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { site } from "@/lib/site.config";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#ask", label: "Ask AI" },
  { href: "#connect", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 12;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled ? "glass border-b border-white/5" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-6">
          <a
            href="#top"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-mono text-[13px] font-bold text-zinc-950">
              {site.initials}
            </span>
            <span className="hidden sm:inline">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-accent-strong"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#ask"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-zinc-100 transition-colors hover:border-accent/60 hover:text-accent-strong md:text-sm"
          >
            Ask my AI
          </a>
        </nav>
      </div>
    </header>
  );
}
