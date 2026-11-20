import { TMT_AMAZON, SMMC_AMAZON } from "@/lib/amazon";

export const COOKBOOK_OFFERS = {
  tmt: { id: "tmt", title: "Tokyo Meets Tuscany", cuisine: "Japanese-Italian", cover: "/images/tmt-cover.jpg", page: "/tokyo-meets-tuscany", preview: "/recipes/cuisine/japanese-italian", amazon: TMT_AMAZON, description: "Thirty recipes and six master sauces connecting Japanese ingredients and Italian cooking." },
  smmc: { id: "smmc", title: "Seoul Meets Mexico City", cuisine: "Korean-Mexican", cover: "/images/smmc-cover-current.png", page: "/seoul-meets-mexico-city", preview: "/recipes/cuisine/korean-mexican", amazon: SMMC_AMAZON, description: "Thirty recipes and six master sauces exploring Korean and Mexican flavors together." },
} as const;
export type CookbookId = keyof typeof COOKBOOK_OFFERS;
export function cookbookForCuisine(cuisine: string) {
  return /korean/i.test(cuisine) ? COOKBOOK_OFFERS.smmc : COOKBOOK_OFFERS.tmt;
}
export const FEATURED_RECIPE_OFFERS = new Set([
  "udon-bolognese", "miso-carbonara", "ramen-alla-carbonara", "dashi-risotto", "bibimbap-risotto",
  "gochujang-braised-short-rib-taco", "gochugaru-elote-korean-mexican-corn", "kimchi-quesadilla", "korean-fried-chicken-tacos", "mexican-korean-birria-tacos",
]);
