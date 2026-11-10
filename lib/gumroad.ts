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
 * This is one of three sales paths, not the only one. The paperback
 * (B0HDRBMLPT) and Kindle (B0H6VD21M2) editions were re-verified live on
 * 2026-11-10 and are sold on Amazon — see lib/amazon.ts. The old instruction
 * here ("do not swap it for an Amazon link while the KDP account is suspended")
 * is superseded: the site now links all three formats, and this constant
 * remains the illustrated-PDF destination only.
 */
const SMMC_FALLBACK = "https://facelesschannel.gumroad.com/l/dqnqe";
const smmcFromEnv = process.env.NEXT_PUBLIC_GUMROAD_SMMC_URL;

export const GUMROAD_SMMC_URL: string =
  smmcFromEnv && smmcFromEnv !== "#" ? smmcFromEnv : SMMC_FALLBACK;

/** Price shown next to every SMMC purchase link. Keep in sync with Gumroad. */
export const GUMROAD_SMMC_PRICE = "$9.99";

/**
 * Complementary cooking products from the same store, shown as related items
 * beside the SMMC funnel. These are the only two of the 31 published products
 * whose subject matter is cooking; everything else in the store is health, AI,
 * scam-protection or trading, and cross-selling it to a cookbook audience
 * would be a claim the reader can see through.
 *
 * Prices verified against the live product pages on 2026-11-06
 * (`product:price:amount` in each page's Open Graph metadata):
 *   /l/uycpjs — 7.00
 *   /l/tyugoo — 8.00
 * The 2026-09-15 A12 audit lists $12 and $14 for these two. Those figures are
 * stale; do not copy prices out of that document.
 *
 * Keep in sync with Gumroad. When a price moves, the fix belongs here.
 */
export const GUMROAD_FUSION_PLAYBOOK_URL =
  "https://facelesschannel.gumroad.com/l/uycpjs";
export const GUMROAD_FUSION_PLAYBOOK_PRICE = "$7";

export const GUMROAD_UMAMI_URL = "https://facelesschannel.gumroad.com/l/tyugoo";
export const GUMROAD_UMAMI_PRICE = "$8";
