/**
 * Gumroad product URL for the print-quality Flavor Pairing Matrix PDF.
 * null until NEXT_PUBLIC_GUMROAD_MATRIX_URL is set — callers must hide the
 * purchase link entirely rather than ship a dead one. Same "#" guard as
 * lib/amazon.ts: a placeholder "#" is truthy and would otherwise leak into
 * every CTA.
 */
const fromEnv = process.env.NEXT_PUBLIC_GUMROAD_MATRIX_URL;

export const GUMROAD_MATRIX_URL: string | null =
  fromEnv && fromEnv !== "#" ? fromEnv : null;
