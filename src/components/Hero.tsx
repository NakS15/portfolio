"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import InteractiveField from "./InteractiveField";
import MagneticButton from "./MagneticButton";
import { site } from "@/lib/site.config";

function renderAccent(text: string, keyPrefix: string) {
  const parts = text.split(/(<accent>.*?<\/accent>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<accent>(.*?)<\/accent>$/);
    if (m) {
      return (
        <span key={`${keyPrefix}-${i}`} className="text-accent">
          {m[1]}
        </span>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
}

export default function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const item: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden">
      <InteractiveField />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/10 to-zinc-950" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-container flex-col justify-center px-6 pb-16 pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div
            variants={item}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {site.availability}
          </motion.div>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {site.headline.map((line, i) => (
              <motion.span key={i} variants={item} className="block">
                {renderAccent(line, `l${i}`)}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            {site.subhead}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#work" variant="primary">
              See my work
              <ArrowRight weight="bold" className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#ask" variant="ghost">
              <Sparkle weight="fill" className="h-4 w-4 text-accent" />
              Ask my AI
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
