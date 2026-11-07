/**
 * Which book a /culture pantry entry belongs to.
 *
 * The pantry library is shared across both volumes, but the origin field is not:
 * a term whose only origin is Korea can never appear in Tokyo Meets Tuscany
 * (Tuscan × Japanese), and vice versa. Routing every entry to the TMT Amazon
 * listing sold the wrong book on eight Korean pages and asserted a provenance
 * the TMT manuscripts do not contain (doenjang, ganjang, gochugaru, tteok,
 * makgeolli and kkaennip appear in zero TMT recipes).
 *
 * Mixed-origin terms (daikon, perilla, sesame oil, yuzu — Japanese and Korean)
 * deliberately stay on the TMT path: a Japanese origin is present, so the claim
 * and the sale are both defensible there. Only an exclusively-Korean term is
 * unambiguous enough to re-route automatically.
 */
export type PantryBook = "tmt" | "smmc";

export function pantryBookOf(origin: readonly string[]): PantryBook {
  const origins = origin.map((o) => o.toLowerCase());
  const korean = origins.some((o) => o.includes("korea"));
  const alsoTmt = origins.some(
    (o) => o.includes("japan") || o.includes("italy") || o.includes("china"),
  );
  return korean && !alsoTmt ? "smmc" : "tmt";
}
