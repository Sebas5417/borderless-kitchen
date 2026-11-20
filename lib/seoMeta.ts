/**
 * Title / description fitting for search snippets (metadata audit 2026-09-06:
 * 282 of 373 content pages had a <title> over 60 chars because the layout
 * template appends " \u2014 Borderless Kitchen" (20 chars) to everything, and
 * 314 descriptions were over 160 chars because journal deks run ~290 chars).
 *
 * Rules: keep the brand suffix only when the whole title still fits in
 * TITLE_MAX; otherwise emit the page title alone (Next's `absolute`). Trim a
 * description to the last sentence end that fits, else the last word.
 */
export const TITLE_MAX = 60;
export const DESC_MAX = 160;
const BRAND_SUFFIX = " \u2014 Borderless Kitchen";

export function fitTitle(title: string): string | { absolute: string } {
  const t = title.trim();
  return t.length + BRAND_SUFFIX.length <= TITLE_MAX ? t : { absolute: t };
}

export function fitDescription(text: string, max = DESC_MAX): string {
  const d = text.replace(/\s+/g, " ").trim();
  if (d.length <= max) return d;
  const head = d.slice(0, max);
  // Prefer a sentence boundary that still leaves a meaningful description.
  const sentenceEnd = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "), head.lastIndexOf("! "));
  if (sentenceEnd >= 70) return head.slice(0, sentenceEnd + 1);
  const wordEnd = head.lastIndexOf(" ");
  return (wordEnd > 0 ? head.slice(0, wordEnd) : head).replace(/[,;:\u2014-]+$/, "") + "\u2026";
}

/** Keep the primary subject in long editorial search titles. Full headings stay intact. */
export function snippetTitle(title: string, metaTitle?: string): string {
  const source = (metaTitle || title).replace(/\s*[|\u2014-]\s*Borderless Kitchen\s*$/i, "").replace(/\s+/g, " ").trim();
  if (source.length <= 68) return source;
  const breaks = [...source.matchAll(/ — |: |; /g)].map((m) => m.index!).filter((i) => i >= 25 && i <= 68);
  if (breaks.length) return source.slice(0, breaks[breaks.length - 1]);
  let compact = source.slice(0, source.lastIndexOf(" ", 68));
  for (let i = 0; i < 3; i++) compact = compact.replace(/\s+(?:and|or|with|the|of|for|in|to|a|an|vs|why|how)$/i, "").replace(/[,;:\u2014-]+$/, "").trim();
  return compact;
}
