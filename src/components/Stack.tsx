"use client";

import Reveal from "./Reveal";
import OrbitingCircles from "./OrbitingCircles";
import { site } from "@/lib/site.config";

const innerOrbit = [
  { slug: "react", label: "React" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "python", label: "Python" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "docker", label: "Docker" },
];

const outerOrbit = [
  { slug: "javascript", label: "JavaScript" },
  { slug: "angular", label: "Angular" },
  { slug: "postgresql", label: "PostgreSQL" },
  { slug: "mongodb", label: "MongoDB" },
  { slug: "kubernetes", label: "Kubernetes" },
  { slug: "git", label: "Git" },
  { slug: "gitlab", label: "GitLab" },
  { slug: "jenkins", label: "Jenkins" },
];

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

      <Reveal delay={0.1}>
        <div className="relative mx-auto mt-16 h-72 max-w-md sm:h-80">
          <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/30 bg-accent/10 font-mono text-sm font-bold text-accent-strong shadow-lg shadow-accent/10">
            {site.initials}
          </div>
          <OrbitingCircles items={innerOrbit} radius={85} duration={18} />
          <OrbitingCircles items={outerOrbit} radius={145} duration={28} reverse />
        </div>
      </Reveal>
    </section>
  );
}
