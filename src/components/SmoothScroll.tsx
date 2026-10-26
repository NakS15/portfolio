"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Drives the whole page with Lenis for inertia-smoothed scrolling. Renders
 * nothing itself; just ties Lenis's RAF loop to native scroll events.
 * Skipped entirely under prefers-reduced-motion so motion-sensitive users
 * keep native, immediate scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
