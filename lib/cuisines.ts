/**
 * Cuisine hubs for /recipes/cuisine/[cuisine] (2026-09-06). Frontmatter
 * cuisine values are inconsistent ("Korean-Italian", "Korean-Italian Fusion"),
 * so hubs key on a normalised slug: lowercase, " Fusion" dropped, spaces to
 * hyphens. Only cuisines with MIN_RECIPES recipes get a hub page.
 */
export const MIN_RECIPES = 3;

export function cuisineSlug(cuisine: string): string {
  return cuisine
    .toLowerCase()
    .replace(/\s+fusion$/, "")
    .trim()
    .replace(/\s+/g, "-");
}

const LABELS: Record<string, string> = {
  japanese: "Japanese",
  korean: "Korean",
  "japanese-italian": "Japanese-Italian Fusion",
  "korean-italian": "Korean-Italian Fusion",
  "korean-mexican": "Korean-Mexican Fusion",
  "korean-japanese": "Korean-Japanese Fusion",
};

export function cuisineLabel(slug: string): string {
  return (
    LABELS[slug] ??
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("-")
  );
}

const INTROS: Record<string, string> = {
  japanese:
    "Free Japanese recipes from the Borderless Kitchen series: dashi, miso, yakitori and the technique-first cooking behind Tokyo Meets Tuscany. Each one is written in full, with the reasoning behind every step.",
  korean:
    "Free Korean recipes from Seoul Meets Mexico City and beyond: gochujang, kimchi, pajeon and the fermentation-driven flavors that anchor the second volume. Full method, no paywall.",
  "japanese-italian":
    "Japanese-Italian fusion recipes from Tokyo Meets Tuscany: where miso meets butter, dashi meets risotto and both kitchens belong on the same plate.",
  "korean-italian":
    "Korean-Italian fusion recipes: gochujang in the ragu, kimchi with the pasta, fermentation against slow-cooked comfort.",
  "korean-mexican":
    "Korean-Mexican fusion recipes from the world of Seoul Meets Mexico City: gochujang and chiles, kimchi and masa, two cuisines built on fire and ferment.",
};

export function cuisineIntro(slug: string): string {
  return (
    INTROS[slug] ??
    `Free ${cuisineLabel(slug)} recipes from the Borderless Kitchen series, written in full with the reasoning behind every step.`
  );
}

type RecipeLike = { cuisine: string };

/** Distinct cuisine slugs with at least MIN_RECIPES recipes, largest first. */
export function cuisineHubs<R extends RecipeLike>(recipes: R[]): { slug: string; label: string; recipes: R[] }[] {
  const groups = new Map<string, R[]>();
  for (const r of recipes) {
    const s = cuisineSlug(r.cuisine);
    groups.set(s, [...(groups.get(s) ?? []), r]);
  }
  return [...groups.entries()]
    .filter(([, rs]) => rs.length >= MIN_RECIPES)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([slug, rs]) => ({ slug, label: cuisineLabel(slug), recipes: rs }));
}

/** Hub slug for a recipe, or null when its cuisine has no hub page. */
export function hubFor<R extends RecipeLike>(recipe: R, recipes: R[]): string | null {
  const s = cuisineSlug(recipe.cuisine);
  return cuisineHubs(recipes).some((h) => h.slug === s) ? s : null;
}
