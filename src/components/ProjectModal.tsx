"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { site } from "@/lib/site.config";

type Project = (typeof site.projects)[number];

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-6 top-6 text-zinc-500 transition-colors hover:text-accent-strong"
            >
              <X weight="bold" className="h-5 w-5" />
            </button>

            {project.context ? (
              <div className="font-mono text-xs text-accent-strong">
                {project.context}
              </div>
            ) : null}

            <h3
              id="project-modal-title"
              className="mt-2 pr-8 text-2xl font-semibold tracking-tight text-zinc-100"
            >
              {project.title}
            </h3>

            <p className="mt-4 text-pretty leading-relaxed text-zinc-400">
              {project.blurb}
            </p>

            {project.highlights && project.highlights.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-zinc-400">
                    <span className="mt-2 h-px w-4 shrink-0 bg-accent/60" />
                    <span className="text-pretty">{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-xs text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              {project.status ? (
                <span
                  className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${
                    project.status === "private"
                      ? "border-white/10 text-zinc-500"
                      : "border-accent/30 text-accent-strong"
                  }`}
                >
                  {project.status === "private" ? "Private codebase" : "In progress"}
                </span>
              ) : (
                <span />
              )}

              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-sm text-accent-strong"
                >
                  View repository
                  <ArrowUpRight
                    weight="bold"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
