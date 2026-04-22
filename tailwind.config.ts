import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFFCF7",
        ink: "#1A1A1A",
        vermillion: "#B11226",
        hairline: "#E6E1D6",
        "charcoal-deep": "#0A0A0A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-2": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-3": ["clamp(1.75rem, 3.5vw, 2.5rem)", { lineHeight: "1.15" }],
        eyebrow: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        prose: "68ch",
        editorial: "78rem",
      },
      aspectRatio: {
        "hero-wide": "21 / 9",
        "hero-portrait": "3 / 4",
        editorial: "4 / 5",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) both",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
