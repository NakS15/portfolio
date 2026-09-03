"use client";

import Reveal from "./Reveal";
import { site } from "@/lib/site.config";

const marqueeLogos = [
  { slug: "react", label: "React" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "python", label: "Python" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "angular", label: "Angular" },
  { slug: "postgresql", label: "PostgreSQL" },
  { slug: "mongodb", label: "MongoDB" },
  { slug: "docker", label: "Docker" },
  { slug: "kubernetes", label: "Kubernetes" },
  { slug: "git", label: "Git" },
  { slug: "gitlab", label: "GitLab" },
  { slug: "jenkins", label: "Jenkins" },
];

const fade =
  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative mx-auto max-w-container px-6 py-24 md:py-32"
    >
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          The stack I reach for.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {site.stack.map((group, i) => {
          const highlight = group.group === "GenAI & ML";
          return (
            <Reveal key={group.group} delay={i * 0.05}>
              <div
                className={`h-full rounded-2xl border p-6 ${
                  highlight
                    ? "border-accent/30 bg-gradient-to-br from-accent/10 to-transparent"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="font-mono text-xs text-zinc-500">
                  {group.group}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`cursor-default rounded-full border px-3 py-1 text-sm transition-colors ${
                        highlight
                          ? "border-accent/30 text-accent-strong hover:border-accent"
                          : "border-white/10 text-zinc-300 hover:border-accent/50 hover:text-accent-strong"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div
        className="relative mt-14 overflow-hidden py-2"
        style={{ maskImage: fade, WebkitMaskImage: fade }}
      >
        <div className="flex w-max animate-marquee items-center gap-14">
          {[...marqueeLogos, ...marqueeLogos].map((l, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${l.slug}-${i}`}
              src={`https://cdn.simpleicons.org/${l.slug}/ffffff`}
              alt={l.label}
              title={l.label}
              loading="lazy"
              className="h-7 w-7 shrink-0 opacity-50 transition-opacity hover:opacity-100"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
