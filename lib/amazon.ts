/**
 * Canonical Amazon URL for Tokyo Meets Tuscany — always carries the
 * Associates tag. The env override wins unless it's empty or the literal
 * "#": that value is truthy, so a plain `??` fallback never triggered and
 * every CTA on the site once pointed at "#".
 */
const FALLBACK =
  "https://www.amazon.com/dp/B0GY8H2TCQ?tag=borderlesskitchen-20";

const fromEnv = process.env.NEXT_PUBLIC_AMAZON_URL_TMT;

export const TMT_AMAZON =
  fromEnv && fromEnv !== "#" ? fromEnv : FALLBACK;

const SMMC_FALLBACK =
  "https://www.amazon.com/dp/B0H6VD21M2?tag=borderlesskitchen-20";

const smmcFromEnv = process.env.NEXT_PUBLIC_AMAZON_URL_SMMC;

export const SMMC_AMAZON =
  smmcFromEnv && smmcFromEnv !== "#" ? smmcFromEnv : SMMC_FALLBACK;

/**
 * Which book a page should sell. Every recipe and pantry page used to point
 * at Tokyo Meets Tuscany, and journal routing only caught the
 * "korean-cooking" theme, so kimchi, gochujang and barbacoa pages sold the
 * Japanese-Italian book (2026-10-09). Matches on any descriptive text a page
 * has: themes, cuisine, tags, origin, slug, title.
 */
const SMMC_PATTERN =
  /korea|kimchi|gochu|bibimbap|bulgogi|galbi|tteok|banchan|seoul|jjigae|japchae|mexic|taco|birria|barbacoa|al-pastor|\bmole\b|tortilla|tamal|pozole|chipotle|oaxaca/i;

export type BookCta = { href: string; title: string };

export function bookFor(...signals: (string | string[] | undefined)[]): BookCta {
  const text = signals.flat().filter(Boolean).join(" ");
  return SMMC_PATTERN.test(text)
    ? { href: SMMC_AMAZON, title: "Seoul Meets Mexico City" }
    : { href: TMT_AMAZON, title: "Tokyo Meets Tuscany" };
}
