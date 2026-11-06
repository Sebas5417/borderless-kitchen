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

/**
 * Gumroad product URL for the illustrated Seoul Meets Mexico City cookbook
 * (v4 illustrated edition, $9.99 — live since 2026-11-05). Unlike the matrix
 * above, this product is already published at a known URL, so the constant
 * falls back to it rather than to null: the SMMC funnel must have a working
 * purchase link with no env configuration. Same "#" guard as lib/amazon.ts.
 *
 * This is the KDP-independent sales path. Do not swap it for an Amazon link
 * while the KDP account is suspended.
 */
const SMMC_FALLBACK = "https://facelesschannel.gumroad.com/l/dqnqe";
const smmcFromEnv = process.env.NEXT_PUBLIC_GUMROAD_SMMC_URL;

export const GUMROAD_SMMC_URL: string =
  smmcFromEnv && smmcFromEnv !== "#" ? smmcFromEnv : SMMC_FALLBACK;

/** Price shown next to every SMMC purchase link. Keep in sync with Gumroad. */
export const GUMROAD_SMMC_PRICE = "$9.99";
