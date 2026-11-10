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

/**
 * Seoul Meets Mexico City — verified live 2026-11-10.
 *
 * Both editions were re-checked on Amazon that day, not assumed from the
 * earlier KDP records: the paperback page (B0HDRBMLPT) returned HTTP 200 with
 * `id="availability"` reading "In Stock" at $19.99, and the Kindle page
 * (B0H6VD21M2) returned HTTP 200 with the `id="tmmSwatches"` swatch reading
 * "Kindle $9.99". The title on both is "Borderless Kitchen: Seoul Meets
 * Mexico City: A Modern Korean-Mexican Fusion Cookbook".
 *
 * These are the ASINs the retail cover in public/images/smmc-cover-amazon.jpg
 * was pulled from, so the picture on the site and the picture on the listing
 * are the same artwork by construction. Do not swap either URL for a
 * different ASIN without re-verifying the cover on that listing.
 */
export const SMMC_AMAZON_PAPERBACK =
  "https://www.amazon.com/dp/B0HDRBMLPT?tag=borderlesskitchen-20";

export const SMMC_AMAZON_KINDLE =
  "https://www.amazon.com/dp/B0H6VD21M2?tag=borderlesskitchen-20";

/**
 * Display prices, matching the same 2026-11-10 read of the two listings.
 * Amazon prices move; if you change one of these, re-read the listing first
 * and update the comment above so the two stay honest together.
 */
export const SMMC_AMAZON_PAPERBACK_PRICE = "$19.99";
export const SMMC_AMAZON_KINDLE_PRICE = "$9.99";
