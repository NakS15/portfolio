"use client";

import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { site } from "@/lib/site.config";

type Project = (typeof site.projects)[number];

function SpotlightCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hasLink = Boolean(project.href && project.href.length > 0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);

    if (reduce) return;
    const rotateY = ((mx / r.width) - 0.5) * 10;
    const rotateX = (0.5 - my / r.height) * 10;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`group relative h-full overflow-hidden rounded-2xl border p-6 transition-transform duration-300 ${
        reduce ? "hover:-translate-y-1" : "ease-out"
      } ${
        featured
          ? "border-accent/25 bg-gradient-to-br from-accent/[0.08] to-transparent"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx) var(--my), rgba(45,212,191,0.14), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={`font-semibold tracking-tight ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
          {hasLink ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title}`}
              className="shrink-0 text-zinc-500 transition-colors hover:text-accent-strong"
            >
              <ArrowUpRight weight="bold" className="h-5 w-5" />
            </a>
          ) : project.status ? (
            <span
              className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${
                project.status === "private"
                  ? "border-white/10 text-zinc-500"
                  : "border-accent/30 text-accent-strong"
              }`}
            >
              {project.status === "private" ? "Private codebase" : "In progress"}
            </span>
          ) : null}
        </div>

        <p
          className={`mt-3 text-pretty leading-relaxed text-zinc-400 ${
            featured ? "max-w-xl text-base md:text-lg" : "text-sm"
          }`}
        >
          {project.blurb}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-xs text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const spanPattern = [
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
];

// Deterministic per-card starting offsets so cards look scattered pre-scroll
// and settle into the grid, without a client/server hydration mismatch.
const scatterSeeds = [
  { rotate: -6, x: -16, y: 20 },
  { rotate: 5, x: 18, y: -12 },
  { rotate: -4, x: 12, y: 16 },
  { rotate: 7, x: -14, y: -18 },
];

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section
      id="work"
      className="relative mx-auto max-w-container px-6 py-24 md:py-32"
    >
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Things I&apos;ve built.
        </h2>
      </Reveal>

      <div
        className="mt-12 grid gap-4 md:grid-cols-6"
        style={{ perspective: "1200px" }}
      >
        {site.projects.map((project, i) => {
          const seed = scatterSeeds[i % scatterSeeds.length];
          return (
            <motion.div
              key={project.title}
              className={spanPattern[i % spanPattern.length]}
              initial={
                reduce
                  ? false
                  : { opacity: 0, rotate: seed.rotate, x: seed.x, y: seed.y }
              }
              whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.75,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SpotlightCard project={project} featured={i === 0} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
