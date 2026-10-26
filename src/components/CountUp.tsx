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
 * Counts up to a numeric-prefixed stat (e.g. "4.2+", "2M+") every time it
 * scrolls into view, resetting to 0 when it scrolls out so it replays on
 * re-entry. Values without a leading number (e.g. "AWS + GCP") render as-is.
 * Runs slowly enough to be noticeable even on a quick scroll past.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(() => zeroedDisplay(value));

  useEffect(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    if (!inView) {
      setDisplay(zeroedDisplay(value));
      return;
    }

    if (reduce) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    // Animate with at least one decimal of precision so small whole-number
    // targets (e.g. "2M+") still look like they're counting, not jumping
    // between 2-3 integer frames. The exact original string is used on the
    // final frame so the resting value always matches the source data.
    const animDecimals = Math.max(decimals, 1);
    const suffix = value.slice(match[1].length);
    const duration = 1800;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      if (t >= 1) {
        setDisplay(value);
        return;
      }
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${(target * eased).toFixed(animDecimals)}${suffix}`);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return <span ref={ref}>{display}</span>;
}
