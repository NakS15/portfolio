import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Single locked accent for the whole page: teal-emerald.
        accent: {
          DEFAULT: "#2dd4bf",
          strong: "#5eead4",
          dim: "#0f766e",
        },
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        beam: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(320%)" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
        beam: "beam 2.4s ease-in-out infinite",
        meteor: "meteor 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
