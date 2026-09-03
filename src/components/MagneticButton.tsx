"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

/**
 * A button that leans toward the cursor. Pointer position drives motion
 * values directly (never React state), so it stays smooth on every frame
 * and collapses to static under prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  download,
  target,
  rel,
  "aria-label": ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-accent text-zinc-950 hover:bg-accent-strong"
      : "border border-white/15 text-zinc-100 hover:border-accent/60 hover:text-accent-strong";

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
