/**
 * Design tokens — single source of truth.
 * Tailwind config and raw-SVG components both pull from here.
 */

export const color = {
  paper: "#FFFCF7",
  ink: "#1A1A1A",
  vermillion: "#B11226",
  hairline: "#E6E1D6",
  charcoalDeep: "#0A0A0A",
} as const;

export const font = {
  display: "var(--font-display)",
  ui: "var(--font-ui)",
  body: "var(--font-body)",
} as const;

export const aspect = {
  "hero-wide": "21 / 9",
  "hero-portrait": "3 / 4",
  editorial: "4 / 5",
  square: "1 / 1",
} as const;

export type AspectToken = keyof typeof aspect;

export const proseWidth = "68ch" as const;
