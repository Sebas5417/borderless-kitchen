/**
 * Contextual buying-guide links (2026-10-14).
 *
 * 42 buying guides exist, but a story about stir-frying or tortillas only reached
 * the wok or tortilla-press guide if someone had hand-written the link. This picks
 * the guides a page's own text points at, by the same rule as storyPantry: a term
 * must appear at least twice as a whole word, counted by distinct position.
 *
 * Guides already linked in the body, and the page's own guide, are skipped.
 */
export type GuideRule = { slug: string; terms: string[] };

export const GUIDE_RULES: GuideRule[] = [
  { slug: "best-wok-for-home-cooking-buying-guide", terms: ["wok", "woks"] },
  { slug: "best-japanese-knives-for-home-cooks", terms: ["gyuto", "santoku", "Japanese knife", "Japanese knives"] },
  { slug: "best-whetstone-for-japanese-knives-how-to-choose", terms: ["whetstone", "whetstones"] },
  { slug: "best-japanese-rice-cooker-for-home-cooks", terms: ["rice cooker", "rice cookers"] },
  { slug: "best-donabe-japanese-clay-pot-how-to-choose", terms: ["donabe"] },
  { slug: "best-dolsot-korean-stone-bowl-how-to-choose", terms: ["dolsot", "stone bowl"] },
  { slug: "best-tortilla-press-how-to-choose", terms: ["tortilla press", "tortillas"] },
  { slug: "molcajete-vs-mortar-and-pestle", terms: ["molcajete", "mortar and pestle"] },
  { slug: "comal-vs-cast-iron-skillet", terms: ["comal"] },
  { slug: "best-japanese-mandoline-slicer-benriner", terms: ["mandoline", "Benriner"] },
  { slug: "best-pasta-maker-manual-vs-electric-vs-stand-mixer", terms: ["pasta machine", "pasta maker", "fresh pasta"] },
  { slug: "best-korean-bbq-grill-pan-for-home", terms: ["Korean BBQ", "Korean barbecue", "grill pan"] },
  { slug: "best-kimchi-making-supplies-and-equipment", terms: ["make kimchi", "making kimchi", "homemade kimchi"] },
  { slug: "best-store-bought-kimchi-how-to-choose", terms: ["kimchi"] },
  { slug: "best-gochujang-brands-how-to-choose", terms: ["gochujang"] },
  { slug: "best-miso-brands-how-to-choose", terms: ["miso"] },
  { slug: "best-soy-sauce-brands-how-to-choose", terms: ["soy sauce"] },
  { slug: "best-chili-crisp-brands-how-to-choose", terms: ["chili crisp", "chili oil"] },
  { slug: "best-japanese-curry-roux-golden-curry-vs-vermont-vs-java", terms: ["curry roux", "Japanese curry"] },
  { slug: "best-korean-instant-ramyeon-shin-vs-buldak-vs-jin", terms: ["ramyeon", "ramyun", "instant ramen", "instant noodles"] },
  { slug: "best-mexican-hot-sauce-valentina-vs-cholula-vs-tapatio", terms: ["hot sauce", "Valentina"] },
  { slug: "san-marzano-tomatoes-dop-how-to-buy", terms: ["San Marzano"] },
  { slug: "parmigiano-reggiano-vs-parmesan-how-to-buy", terms: ["Parmigiano", "Parmesan"] },
  { slug: "arborio-vs-carnaroli-vs-vialone-nano-risotto-rice", terms: ["risotto"] },
  { slug: "best-short-grain-rice-for-japanese-and-korean-cooking", terms: ["short-grain rice", "sushi rice"] },
  { slug: "masa-harina-vs-cornmeal-difference", terms: ["masa harina", "masa"] },
  { slug: "ancho-vs-guajillo-vs-pasilla-dried-chiles", terms: ["ancho", "guajillo", "pasilla", "dried chiles"] },
  { slug: "mexican-oregano-vs-oregano-difference", terms: ["Mexican oregano"] },
  { slug: "instant-dashi-vs-homemade-dashi", terms: ["dashi"] },
  { slug: "soy-sauce-vs-tamari-difference", terms: ["tamari"] },
  { slug: "panko-vs-breadcrumbs-difference", terms: ["panko"] },
  { slug: "kewpie-vs-regular-mayonnaise-difference", terms: ["Kewpie"] },
  { slug: "mirin-vs-rice-vinegar-difference", terms: ["mirin"] },
];

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function guidesFor(bodyRaw: string, selfSlug: string, max = 2): string[] {
  return GUIDE_RULES.filter(
    (rule) => rule.slug !== selfSlug && !bodyRaw.includes(`/journal/${rule.slug}`),
  )
    .map((rule) => {
      const starts = new Set<number>();
      for (const term of rule.terms) {
        for (const m of bodyRaw.matchAll(new RegExp(`\\b${escape(term)}\\b`, "gi"))) {
          starts.add(m.index ?? -1);
        }
      }
      return { slug: rule.slug, count: starts.size };
    })
    .filter((g) => g.count >= 2)
    .sort((a, b) => b.count - a.count)
    .slice(0, max)
    .map((g) => g.slug);
}
