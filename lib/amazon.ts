const TMT_ASIN_FALLBACK = "https://www.amazon.com/dp/B0GY8H2TCQ";

// Treat unset, empty, and the .env.example placeholder the same way so a
// careless `cp .env.example .env` can't silently break every book link.
const PLACEHOLDER_VALUES = new Set(["#", ""]);

/** Appends the Associates tracking tag to any Amazon URL, if one is configured. */
export function withAssociateTag(url: string): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG;
  if (!tag) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}tag=${encodeURIComponent(tag)}`;
}

/** Canonical, tag-aware link to Tokyo Meets Tuscany on Amazon. */
export function tmtAmazonUrl(): string {
  const configured = process.env.NEXT_PUBLIC_AMAZON_URL_TMT;
  const base =
    !configured || PLACEHOLDER_VALUES.has(configured) ? TMT_ASIN_FALLBACK : configured;
  return withAssociateTag(base);
}

/** Tag-aware link to a pantry item by ASIN, for the shop page. */
export function pantryAmazonUrl(asin: string): string {
  return withAssociateTag(`https://www.amazon.com/dp/${asin}`);
}
