/**
 * Pick journal stories that relate to a journal story.
 *
 * Added 2026-09-06: journal pages linked recipes and pantry terms but never
 * other stories, so the 233 entries only reached each other through the
 * /journal index and prev/next. Seven of the eight buying guides had zero
 * inbound contextual links. Three related stories on every entry gives the
 * journal ~700 contextual internal links.
 *
 * Scoring: shared themes (3 each) > shared pantryRefs (2 each) > title-token
 * overlap after stopwords (1 each). Future-dated stories are scheduled, not
 * published — sitemap.ts and journal/page.tsx both filter `date <= now`, and
 * this mirrors that so a block never links a page that is not on the index.
 * Deterministic: ties break by newest date, then slug, so builds are stable.
 */

type StoryLike = {
  slug: string;
  title: string;
  date: string;
  themes?: string[] | null;
  pantryRefs?: string[] | null;
};

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "how",
  "why", "what", "is", "are", "vs", "your", "you", "from", "at", "by", "it",
  "its", "this", "that", "recipe", "recipes", "guide", "kitchen", "borderless",
  "fusion", "cooking", "cook", "food", "make", "made", "home", "easy", "best",
  "meets", "series", "dish", "dishes", "style", "complete", "science", "2026",
  "2025", "every", "should", "know", "actually", "real", "version", "ways",
]);

function titleTokens(title: string): Set<string> {
  const out = new Set<string>();
  for (const raw of title.toLowerCase().split(/[^a-z0-9]+/)) {
    if (raw.length < 3 || STOP.has(raw)) continue;
    const t = raw.endsWith("es") && raw.length > 5 ? raw.slice(0, -2) : raw.endsWith("s") ? raw.slice(0, -1) : raw;
    out.add(t);
  }
  return out;
}

export function relatedStoriesFor<S extends StoryLike>(
  story: S,
  stories: S[],
  limit = 3,
  now: Date = new Date(),
): S[] {
  const themes = new Set(story.themes ?? []);
  const pantry = new Set(story.pantryRefs ?? []);
  const words = titleTokens(story.title);

  const scored: Array<{ s: S; score: number }> = [];
  for (const s of stories) {
    if (s.slug === story.slug) continue;
    if (new Date(s.date) > now) continue;
    let score = 0;
    for (const t of s.themes ?? []) if (themes.has(t)) score += 3;
    for (const p of s.pantryRefs ?? []) if (pantry.has(p)) score += 2;
    for (const w of titleTokens(s.title)) if (words.has(w)) score += 1;
    if (score > 0) scored.push({ s, score });
  }

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      +new Date(b.s.date) - +new Date(a.s.date) ||
      a.s.slug.localeCompare(b.s.slug),
  );
  return scored.slice(0, limit).map((x) => x.s);
}
