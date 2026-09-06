/**
 * Derive schema.org Recipe `recipeIngredient` and `recipeInstructions` from a
 * free-recipe MDX body at build time.
 *
 * Added 2026-09-05: the 100+ recipe pages already render an ingredients
 * section and a method section, but the JSON-LD only carried name/times/yield,
 * so Google could not show them as Recipe rich results (GSC: 3.87K impressions,
 * 0.9% CTR over 90 days). This parses the raw markdown so the structured data
 * matches what is on the page — nothing is invented.
 *
 * Heading conventions in content/free-recipes (scan of all 102 files):
 *   ingredients: "Ingredients" (57) · "What You Need" (33) · "What you'll need" (7)
 *   method:      "Method" (51) · "How to Make It" (31) · "Instructions" (16)
 */

type HowToStep = { "@type": "HowToStep"; text: string };
type HowToSection = {
  "@type": "HowToSection";
  name: string;
  itemListElement: HowToStep[];
};

const INGREDIENTS_HEADING = /^## (?:Ingredients|What You Need|What you.ll need)\s*$/im;
const METHOD_HEADING = /^## (?:Method|How to Make It|Instructions)\s*$/im;
const NEXT_H2 = /^## /m;

/** Strip inline markdown (bold, italics, links, code) down to plain text. */
function plain(md: string): string {
  return md
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sectionAfter(body: string, heading: RegExp): string | null {
  const m = heading.exec(body);
  if (!m) return null;
  const rest = body.slice(m.index + m[0].length);
  const next = NEXT_H2.exec(rest);
  return next ? rest.slice(0, next.index) : rest;
}

export function parseRecipeIngredients(bodyRaw: string): string[] {
  const sec = sectionAfter(bodyRaw, INGREDIENTS_HEADING);
  if (!sec) return [];
  const out: string[] = [];
  for (const line of sec.split(/\r?\n/)) {
    const m = /^\s*[-*]\s+(.+)$/.exec(line);
    if (m) {
      const t = plain(m[1]);
      if (t) out.push(t);
    }
  }
  return out;
}

/** One chunk of method text -> steps. Numbered/bulleted lines are one step
 *  each; otherwise every paragraph is a step. */
function stepsFrom(chunk: string): HowToStep[] {
  const lines = chunk.split(/\r?\n/);
  const listLines = lines.filter((l) => /^\s*(?:\d+\.|[-*])\s+/.test(l));
  let texts: string[];
  if (listLines.length >= 2) {
    texts = listLines.map((l) => l.replace(/^\s*(?:\d+\.|[-*])\s+/, ""));
  } else {
    texts = chunk.split(/\r?\n\s*\r?\n/);
  }
  return texts
    .map((t) => plain(t.replace(/^\s*(?:\d+\.|[-*])\s+/gm, "")))
    // bold-numbered steps ("**1. Toast…**") keep their marker after plain()
    .map((t) => t.replace(/^\d+[.)]\s+/, ""))
    .filter((t) => t.length > 0)
    .map((text) => ({ "@type": "HowToStep" as const, text }));
}

export function parseRecipeInstructions(
  bodyRaw: string,
): Array<HowToSection | HowToStep> {
  const sec = sectionAfter(bodyRaw, METHOD_HEADING);
  if (!sec) return [];

  // Split on "### Sub-step" headings. Text before the first heading (if any)
  // becomes plain steps.
  const parts = sec.split(/^### +/m);
  const preamble = parts.shift() ?? "";
  const result: Array<HowToSection | HowToStep> = [...stepsFrom(preamble)];

  for (const part of parts) {
    const nl = part.indexOf("\n");
    const name = plain(nl === -1 ? part : part.slice(0, nl));
    const bodyText = nl === -1 ? "" : part.slice(nl + 1);
    const steps = stepsFrom(bodyText);
    if (!name && steps.length === 0) continue;
    if (steps.length === 0) {
      result.push({ "@type": "HowToStep", text: name });
      continue;
    }
    result.push({ "@type": "HowToSection", name, itemListElement: steps });
  }
  return result;
}
