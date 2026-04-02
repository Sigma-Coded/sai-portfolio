import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "ui-monospace", "monospace"],
      },
      colors: {
        surface: {
          dark: "#05060a",
          light: "#f8fafc",
        },
        accent: {
          primary: "#7dd3fc",
          secondary: "#a855f7",
          tertiary: "#22d3ee",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.05), 0 18px 50px rgba(80,156,255,0.25)",
        card: "0 18px 60px rgba(0,0,0,0.35)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blink: "blink 1.2s steps(2, start) infinite",
        pulseSoft: "pulseSoft 12s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        blink: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSoft: {
          "0%": { filter: "drop-shadow(0 0 6px rgba(125,211,252,0.25))" },
          "50%": { filter: "drop-shadow(0 0 12px rgba(168,85,247,0.35))" },
          "100%": { filter: "drop-shadow(0 0 6px rgba(125,211,252,0.25))" },
        },
      },
      backgroundImage: {
        "grid-light":
          "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.04) 1px, transparent 0)",
        "grid-dark":
          "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.08) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
