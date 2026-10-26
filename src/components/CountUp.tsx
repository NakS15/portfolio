"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function zeroedDisplay(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)/);
  if (!match) return value;
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return `${(0).toFixed(decimals)}${value.slice(match[1].length)}`;
}

/**
 * Counts up to a numeric-prefixed stat (e.g. "4.2+", "2M+") once it scrolls
 * into view. Values without a leading number (e.g. "AWS + GCP") render as-is.
 * Starts visibly at 0 (never flashes the final value) and runs slowly enough
 * to be noticeable even when the stat is already near the viewport on load.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const started = useRef(false);
  const [display, setDisplay] = useState(() => zeroedDisplay(value));

  useEffect(() => {
    if (started.current) return;
    const match = value.match(/^(\d+(?:\.\d+)?)/);
    if (!inView || !match) return;
    started.current = true;

    if (reduce) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const suffix = value.slice(match[1].length);
    const duration = 1800;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return <span ref={ref}>{display}</span>;
}
