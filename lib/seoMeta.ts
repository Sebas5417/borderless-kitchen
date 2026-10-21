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

/**
 * Search-snippet title for long editorial headlines (2026-10-16: 159 journal
 * <title>s were over 70 chars, up to 215, so Google showed a cut-off fragment).
 * Prefers the article's own `metaTitle` when it has one, drops a trailing
 * "| Borderless Kitchen", then cuts at the last natural break (" — ", ": ",
 * ", ", " - ") that keeps it within SNIPPET_MAX, else at a word boundary
 * without a dangling connective. The full headline still renders on the page
 * and in Open Graph.
 */
const SNIPPET_MAX = 68;
const DANGLING = /\s+(?:and|or|with|the|of|for|in|to|a|an|why|how|vs|is|are|its|their|plus|&)$/i;

export function snippetTitle(title: string, metaTitle?: string): string {
  const src = (metaTitle || title).replace(/\s*[|\u2014-]\s*Borderless Kitchen\s*$/i, "").trim();
  if (src.length <= SNIPPET_MAX) return src;
  // All break positions that fit; take the last one whose final clause is a
  // real phrase (>= 12 chars), so we never end on a stub like ": Breeds".
  const breaks: number[] = [];
  for (const sep of [" \u2014 ", ": ", ", ", " - ", "; "]) {
    let i = src.indexOf(sep);
    while (i !== -1 && i <= SNIPPET_MAX) {
      breaks.push(i);
      i = src.indexOf(sep, i + 1);
    }
  }
  breaks.sort((x, y) => x - y);
  let best = -1;
  for (let k = 0; k < breaks.length; k++) {
    const prev = k > 0 ? breaks[k - 1] : 0;
    if (breaks[k] >= 20 && breaks[k] - prev >= 12) best = breaks[k];
  }
  let out = best > 0 ? src.slice(0, best) : src.slice(0, src.lastIndexOf(" ", SNIPPET_MAX));
  for (let k = 0; k < 3; k++) out = out.replace(DANGLING, "").replace(/[,;:\u2014-]+$/, "").trim();
  return out;
}
