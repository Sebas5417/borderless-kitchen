import type { PantryEntry } from "contentlayer/generated";
import { isShoppable } from "@/lib/pantryShopLink";

/**
 * The shoppable pantry ingredients a journal story actually cooks with.
 *
 * 2026-10-09: 158 of the journal stories mention a pantry ingredient
 * (gochujang, miso, kombu...) at least twice but linked nowhere to buy it,
 * while the same ingredient's /culture page already carried a tagged
 * Amazon search link. This reads the story body instead of pantryRefs,
 * which only ~19 stories fill in.
 *
 * An ingredient counts when its name appears at least twice as a whole
 * word - once is usually a passing comparison, not a recipe component.
 */

/**
 * Ingredients whose Amazon search is not a useful buying link: alcohol
 * (sake, makgeolli) mostly cannot ship, fresh daikon is a grocery item, and
 * a bare "sesame" search returns noise - stories mean the oil or the seeds,
 * which have their own entries.
 */
const NOT_SOLD_ONLINE = new Set(["sake", "rice-wine-makgeolli", "daikon", "sesame"]);

/** Extra names an entry should match, beyond its term. */
const ALIASES: Record<string, string[]> = {
  "toasted-sesame-oil": ["sesame oil"],
  bonito: ["bonito flakes"],
};

/** Overlapping entries: when the specific one matches, drop the general. */
const SUPERSEDED_BY: Record<string, string[]> = {
  sesame: ["sesame-seeds", "toasted-sesame-oil"],
  perilla: ["perilla-leaves-kkaennip"],
  bonito: ["katsuobushi"],
};

function namesFor(slug: string, term: string): string[] {
  const names = [...(ALIASES[slug] ?? []), term.replace(/\s*\([^)]*\)/g, "")];
  const gloss = term.match(/\(([^)]*)\)/)?.[1];
  // Only latin-script glosses: "Daikon (kanji)" should not match on the kanji.
  if (gloss && /^[ -~]+$/.test(gloss)) names.push(gloss);
  return names.map((n) => n.trim()).filter(Boolean);
}

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function shoppableIngredientsFor(
  bodyRaw: string,
  entries: PantryEntry[],
  max = 4,
): PantryEntry[] {
  // "for the sake of" is not a bottle of sake.
  const text = bodyRaw.replace(/\bsake of\b/gi, "");
  const scored = entries
    .filter((entry) => isShoppable(entry) && !NOT_SOLD_ONLINE.has(entry.slug))
    .map((entry) => {
      const count = namesFor(entry.slug, entry.term).reduce(
        (n, name) =>
          n + (text.match(new RegExp(`\\b${escape(name)}\\b`, "gi"))?.length ?? 0),
        0,
      );
      return { entry, count };
    })
    .filter((s) => s.count >= 2);

  const matched = new Set(scored.map((s) => s.entry.slug));
  return scored
    .filter((s) => !(SUPERSEDED_BY[s.entry.slug] ?? []).some((slug) => matched.has(slug)))
    .sort((a, b) => b.count - a.count)
    .slice(0, max)
    .map((s) => s.entry);
}
