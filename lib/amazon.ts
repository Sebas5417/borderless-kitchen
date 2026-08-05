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
