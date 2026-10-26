"use client";

import { useReducedMotion } from "framer-motion";

type OrbitItem = { slug: string; label: string };

/**
 * Icons orbiting a center point on a CSS circle (rotate + translate + counter
 * -rotate keeps each icon upright while it swings around). Falls back to a
 * static ring layout under prefers-reduced-motion.
 */
export default function OrbitingCircles({
  items,
  radius,
  duration = 20,
  reverse = false,
}: {
  items: OrbitItem[];
  radius: number;
  duration?: number;
  reverse?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      {items.map((item, i) => {
        const angle = (360 / items.length) * i;
        const delay = -((duration / items.length) * i);

        return (
          <div
            key={item.slug}
            className={`absolute left-1/2 top-1/2 h-9 w-9 -ml-[18px] -mt-[18px] ${
              reduce ? "" : "animate-orbit"
            }`}
            style={
              reduce
                ? {
                    transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`,
                  }
                : ({
                    "--radius": reverse ? -radius : radius,
                    "--duration": duration,
                    animationDelay: `${delay}s`,
                  } as React.CSSProperties)
            }
          >
            <div className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-zinc-900/90 shadow-lg shadow-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/logos/${item.slug}.svg`}
                alt={item.label}
                title={item.label}
                className="h-5 w-5 opacity-80 transition-opacity hover:opacity-100"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
