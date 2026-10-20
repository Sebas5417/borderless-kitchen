import type { PantryEntry } from "contentlayer/generated";
import { directProductUrl } from "./affiliateProducts";

export function pantryShopQuery(term: string): string {
  return term.replace(/[()]/g, " ").replace(/[^ -~]/g, " ").replace(/\s+/g, " ").trim();
}

/** Only verified direct product destinations are offered to readers. */
export function pantryShopUrl(term: string): string | undefined {
  return directProductUrl(pantryShopQuery(term));
}

export function isShoppable(entry: Pick<PantryEntry, "classification">): boolean {
  return entry.classification?.toLowerCase() === "ingredient";
}
