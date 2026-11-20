/** Significant editorial updates; original publication dates remain intact. */
const EDITORIAL_UPDATES: Record<string, string> = {
  "best-japanese-cookbooks-for-home-cooks": "2026-11-03",
  "best-italian-cookbooks-for-home-cooks": "2026-11-03",
  "best-mexican-cookbooks-for-home-cooks": "2026-11-03",
  "best-korean-cookbooks-for-home-cooks": "2026-11-03",
};
export function storyModifiedAt(story: { slug: string; date: string }): string {
  return EDITORIAL_UPDATES[story.slug] ?? story.date;
}
