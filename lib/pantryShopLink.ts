import type { PantryEntry } from "contentlayer/generated";

/**
 * Borderless Kitchen's Amazon Associates tag. Registered; never change it.
 */
const TAG = "borderlesskitchen-20";

/**
 * Build an Amazon search URL for a pantry ingredient.
 *
 * Deliberately a SEARCH link, not a /dp/ product link. The site has used
 * search links for every ingredient recommendation since the buying guides
 * were written: it avoids asserting that one specific product is the right
 * one, and it does not rot when an ASIN goes out of stock.
 *
 * The query is the entry's own `term` and nothing else - no invented
 * qualifiers. Parenthetical glosses are unwrapped rather than dropped, since
 * they are usually the more searchable name ("Bonito (Katsuobushi)"), and
 * non-ASCII glosses are stripped because Amazon's US catalogue does not
 * match them ("Daikon (kanji)").
 */
export function pantryShopQuery(term: string): string {
  return term
    .replace(/[()]/g, " ")
    .replace(/[^ -~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function pantryShopUrl(term: string): string {
  const q = encodeURIComponent(pantryShopQuery(term));
  return `https://www.amazon.com/s?k=${q}&tag=${TAG}`;
}

/**
 * Only real ingredients are shoppable. The schema already separates these:
 * of 38 entries 34 are classified "ingredient" and 4 are not - "al dente"
 * and "umami" are terms, "dashi" and "soffritto" are techniques. Linking
 * "buy al dente on Amazon" would be nonsense, so the classification decides
 * rather than a guess about the word.
 */
export function isShoppable(entry: Pick<PantryEntry, "classification">): boolean {
  return entry.classification?.toLowerCase() === "ingredient";
}
