"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";

const MOVEMENT_DAMPING = 1400;

// Home base (Nagpur/Pune, India) plus remote-work / tech hubs across Europe
// and beyond, to visually back up "Available for remote and hybrid roles".
// Exported so the legend text next to the globe stays in sync with the dots.
export const GLOBE_MARKERS = [
  { name: "Nagpur", lat: 21.1458, lng: 79.0882, size: 0.14 },
  { name: "Pune", lat: 18.5204, lng: 73.8567, size: 0.12 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, size: 0.12 },
  { name: "London", lat: 51.5072, lng: -0.1276, size: 0.09 },
  { name: "Berlin", lat: 52.52, lng: 13.405, size: 0.09 },
  { name: "Amsterdam", lat: 52.3676, lng: 4.9041, size: 0.09 },
  { name: "Paris", lat: 48.8566, lng: 2.3522, size: 0.09 },
  { name: "Dublin", lat: 53.3498, lng: -6.2603, size: 0.09 },
  { name: "Zurich", lat: 47.3769, lng: 8.5417, size: 0.09 },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686, size: 0.09 },
  { name: "Munich", lat: 48.1351, lng: 11.582, size: 0.09 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, size: 0.09 },
  { name: "Toronto", lat: 43.6532, lng: -79.3832, size: 0.09 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, size: 0.09 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, size: 0.09 },
] as const;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.35, 0.35, 0.38],
  markerColor: [94 / 255, 234 / 255, 212 / 255],
  glowColor: [0.2, 0.45, 0.42],
  markers: GLOBE_MARKERS.map((m) => ({
    location: [m.lat, m.lng] as [number, number],
    size: m.size,
  })),
};

export default function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  function updatePointerInteraction(value: number | null) {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  }

  function updateMovement(clientX: number) {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  }

  useEffect(() => {
    function onResize() {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth;
    }
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...GLOBE_CONFIG,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005;
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs]);

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[500px] ${className}`}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
