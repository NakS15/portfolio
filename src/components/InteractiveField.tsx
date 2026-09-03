"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive constellation drawn on a 2D canvas. Points drift, link to
 * nearby neighbours, and lean toward the pointer. All motion runs on
 * requestAnimationFrame with pointer state kept in a ref (no React re-renders).
 * Under prefers-reduced-motion it paints a single static frame.
 */
export default function InteractiveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    type P = { x: number; y: number; vx: number; vy: number };
    let points: P[] = [];
    const LINK_DIST = 130;

    function build() {
      const canvasElement = canvas!;
      const parent = canvasElement.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasElement.width = Math.floor(width * dpr);
      canvasElement.height = Math.floor(height * dpr);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(28, Math.min(120, Math.round((width * height) / 15000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    function step() {
      context.clearRect(0, 0, width, height);
      const px = pointer.current;

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (px.active) {
          const dx = px.x - p.x;
          const dy = px.y - p.y;
          if (dx * dx + dy * dy < 200 * 200) {
            p.vx += dx * 0.0008;
            p.vy += dy * 0.0008;
          }
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            context.strokeStyle = `rgba(45,212,191,${(1 - dist / LINK_DIST) * 0.5})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      for (const p of points) {
        let r = 1.6;
        let alpha = 0.55;
        if (px.active) {
          const dist = Math.hypot(px.x - p.x, px.y - p.y);
          if (dist < 160) {
            const t = 1 - dist / 160;
            r += t * 2.4;
            alpha += t * 0.45;
          }
        }
        context.fillStyle = `rgba(94,234,212,${Math.min(alpha, 1)})`;
        context.beginPath();
        context.arc(p.x, p.y, r, 0, Math.PI * 2);
        context.fill();
      }

      if (running && !prefersReduced) raf = requestAnimationFrame(step);
    }

    build();
    step();
    if (prefersReduced) running = false;

    const ro = new ResizeObserver(() => {
      build();
      if (prefersReduced) step();
    });
    const parent = canvas.parentElement;
    if (parent) ro.observe(parent);

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      pointer.current.active = true;
    }
    function onLeave() {
      pointer.current.active = false;
      pointer.current.x = -9999;
      pointer.current.y = -9999;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
