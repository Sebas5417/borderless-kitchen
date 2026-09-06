/**
 * Pick free recipes that relate to a journal story, by token overlap between
 * the story's title / themes / target keyword and each recipe's title /
 * cuisine / category / tags / keyword.
 *
 * Added 2026-09-06: an internal-link crawl found 84 of 102 recipe pages with
 * only 1–2 inbound links (the /recipes index plus one "more recipes" card),
 * while the 224 journal entries are the best-linked pages on the site.
 * Surfacing three recipes on every story gives recipes ~650 contextual links.
 * Deterministic: same inputs → same picks, so builds are stable.
 */

type StoryLike = {
  slug: string;
  title: string;
  themes?: string[] | null;
  targetKeyword?: string | null;
};

type RecipeLike = {
  slug: string;
  title: string;
  cuisine: string;
  category: string;
  tags?: string[] | null;
  targetKeyword?: string | null;
  ordering?: number | null;
};

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "how",
  "why", "what", "is", "are", "vs", "your", "you", "from", "at", "by", "it",
  "its", "this", "that", "recipe", "recipes", "guide", "kitchen", "borderless",
  "fusion", "cooking", "cook", "food", "make", "made", "home", "easy", "best",
  "meets", "series", "dish", "dishes", "style",
]);

function tokens(...parts: Array<string | null | undefined | string[]>): Set<string> {
  const out = new Set<string>();
  for (const p of parts) {
    const s = Array.isArray(p) ? p.join(" ") : p ?? "";
    for (const raw of s.toLowerCase().split(/[^a-z0-9]+/)) {
      if (raw.length < 3 || STOP.has(raw)) continue;
      // crude singular: "noodles" -> "noodle", "sauces" -> "sauce"
      const t = raw.endsWith("es") && raw.length > 5 ? raw.slice(0, -2) : raw.endsWith("s") ? raw.slice(0, -1) : raw;
      out.add(t);
    }
  }
  return out;
}

export function relatedRecipesFor<R extends RecipeLike>(
  story: StoryLike,
  recipes: R[],
  limit = 3,
): R[] {
  const st = tokens(story.title, story.themes, story.targetKeyword);
  const scored = recipes.map((r) => {
    const rt = tokens(r.title, r.cuisine, r.category, r.tags, r.targetKeyword);
    let score = 0;
    for (const t of rt) if (st.has(t)) score += 1;
    // cuisine words are the strongest signal (korean, japanese, italian, mexican…)
    for (const t of tokens(r.cuisine)) if (st.has(t)) score += 2;
    return { r, score };
  });
  scored.sort((a, b) => b.score - a.score || (a.r.ordering ?? 100) - (b.r.ordering ?? 100) || a.r.slug.localeCompare(b.r.slug));
  const picked = scored.filter((x) => x.score > 0).slice(0, limit).map((x) => x.r);
  if (picked.length < limit) {
    // Fill from the editorially ordered list, rotating by story slug so the
    // fallback is not the same three recipes on every unmatched story.
    const ordered = [...recipes].sort((a, b) => (a.ordering ?? 100) - (b.ordering ?? 100) || a.slug.localeCompare(b.slug));
    let h = 0;
    for (const ch of story.slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    for (let i = 0; i < ordered.length && picked.length < limit; i++) {
      const c = ordered[(h + i) % ordered.length];
      if (!picked.includes(c)) picked.push(c);
    }
  }
  return picked;
}
