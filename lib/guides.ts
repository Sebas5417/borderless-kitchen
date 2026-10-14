/**
 * Buying-guide hub sections for /guides (2026-10-14).
 *
 * An explicit, curated list rather than a theme filter: theme tags on older stories are
 * inconsistent ("buying-guide" is missing on some best-* pages), and the order within a
 * section is editorial — first-buy guides before brand comparisons.
 */
export type GuideSection = { id: string; title: string; dek: string; slugs: string[] };

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "gifts",
    title: "Gift guides",
    dek: "For the cook in your life, sorted by budget.",
    slugs: [
      "best-korean-cooking-gifts-for-home-cooks",
      "best-mexican-cooking-gifts-for-home-cooks",
      "best-japanese-cooking-gifts-for-home-cooks",
      "stocking-stuffers-for-home-cooks-under-25",
    ],
  },
  {
    id: "cookbooks",
    title: "Cookbooks",
    dek: "The books worth owning, and which one to buy first.",
    slugs: [
      "best-japanese-cookbooks-for-home-cooks",
      "best-korean-cookbooks-for-home-cooks",
      "best-mexican-cookbooks-for-home-cooks",
      "best-italian-cookbooks-for-home-cooks",
    ],
  },
  {
    id: "japanese",
    title: "Japanese",
    dek: "Pantry, tools and the label words that matter.",
    slugs: [
      "best-japanese-pantry-starter-kit-ingredients",
      "best-soy-sauce-brands-how-to-choose",
      "soy-sauce-vs-tamari-difference",
      "best-miso-brands-how-to-choose",
      "mirin-vs-rice-vinegar-difference",
      "instant-dashi-vs-homemade-dashi",
      "kombu-vs-wakame-vs-nori-difference",
      "kewpie-vs-regular-mayonnaise-difference",
      "panko-vs-breadcrumbs-difference",
      "best-japanese-knives-for-home-cooks",
      "best-whetstone-for-japanese-knives-how-to-choose",
      "best-japanese-mandoline-slicer-benriner",
      "best-donabe-japanese-clay-pot-how-to-choose",
      "best-japanese-rice-cooker-for-home-cooks",
      "best-ramen-bowls-and-japanese-serving-equipment",
    ],
  },
  {
    id: "korean",
    title: "Korean",
    dek: "Chili, fermentation and the stone bowl.",
    slugs: [
      "gochujang-vs-gochugaru-difference",
      "best-gochujang-brands-how-to-choose",
      "gochujang-substitute-what-to-use-instead",
      "miso-vs-doenjang-difference",
      "dashi-vs-korean-anchovy-broth",
      "best-kimchi-making-supplies-and-equipment",
      "best-dolsot-korean-stone-bowl-how-to-choose",
      "best-korean-bbq-grill-pan-for-home",
    ],
  },
  {
    id: "mexican",
    title: "Mexican",
    dek: "Masa, dried chiles and the tools that make them work.",
    slugs: [
      "masa-harina-vs-cornmeal-difference",
      "best-tortilla-press-how-to-choose",
      "comal-vs-cast-iron-skillet",
      "molcajete-vs-mortar-and-pestle",
      "ancho-vs-guajillo-vs-pasilla-dried-chiles",
      "mexican-oregano-vs-oregano-difference",
      "best-mexican-hot-sauce-valentina-vs-cholula-vs-tapatio",
    ],
  },
  {
    id: "italian",
    title: "Italian",
    dek: "The protected names, the right rice and the pasta machine.",
    slugs: [
      "san-marzano-tomatoes-dop-how-to-buy",
      "parmigiano-reggiano-vs-parmesan-how-to-buy",
      "arborio-vs-carnaroli-vs-vialone-nano-risotto-rice",
      "best-pasta-maker-manual-vs-electric-vs-stand-mixer",
    ],
  },
  {
    id: "across",
    title: "Across cuisines",
    dek: "The things that cross every border in this kitchen.",
    slugs: [
      "korean-mexican-pantry-starter-kit",
      "best-short-grain-rice-for-japanese-and-korean-cooking",
      "best-chili-crisp-brands-how-to-choose",
      "best-wok-for-home-cooking-buying-guide",
    ],
  },
];
