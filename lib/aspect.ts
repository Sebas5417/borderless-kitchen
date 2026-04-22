import type { AspectToken } from "./tokens";

/**
 * Aspect token → CSS aspect-ratio value + viewBox dimensions
 * for the SVG placeholder.
 */
export const aspectMeta: Record<
  AspectToken,
  { css: string; viewBox: { w: number; h: number } }
> = {
  "hero-wide": { css: "21 / 9", viewBox: { w: 2100, h: 900 } },
  "hero-portrait": { css: "3 / 4", viewBox: { w: 900, h: 1200 } },
  editorial: { css: "4 / 5", viewBox: { w: 800, h: 1000 } },
  square: { css: "1 / 1", viewBox: { w: 1000, h: 1000 } },
};
