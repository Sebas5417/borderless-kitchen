/** Product destinations matched in the browser on 2026-10-20.
 * Preserve the registered Associates tag. Never invent an ASIN or fall back to search.
 * Names and source URLs are recorded in docs/link-audit-2026-10-20.json.
 */
export const AMAZON_TAG = "borderlesskitchen-20";
const PRODUCTS: Record<string, string> = {
  "hikari organic white miso": "B00IBNZAEE",
  "hikari white miso shiro": "B00IBNZAEE",
  "hikari organic white miso paste 176oz": "B00IBNZAEE",
  "miso": "B00IBNZAEE",
  "marutomo katsuobushi": "B0006B4IHE",
  "katsuobushi": "B0006B4IHE",
  "bonito katsuobushi": "B0006B4IHE",
  "katsuobushi bonito flakes": "B0006B4IHE",
  "wel-pac kombu": "B00ZB13JHO",
  "welpac dashi kombu dried seaweed 4oz": "B00ZB13JHO",
  "kombu": "B00ZB13JHO",
  "kombu dried kelp": "B00ZB13JHO",
  "kadoya toasted sesame oil": "B002HMN6SC",
  "toasted sesame oil": "B002HMN6SC",
  "taekyung gochugaru": "B005G8IDTQ",
  "gochugaru": "B005G8IDTQ",
  "gochugaru korean red pepper flakes": "B005G8IDTQ",
  "korean gochugaru coarse red pepper flakes": "B005G8IDTQ",
  "haechandle doenjang": "B00EZX6X04",
  "doenjang": "B00EZX6X04",
  "haechandle gochujang": "B07BDRMFDZ",
  "cj haechandle gochujang": "B07BDRMFDZ",
  "gochujang": "B07BDRMFDZ",
  "red boat fish sauce": "B00B617XK2",
  "fulvi pecorino romano": "B078F7M6GJ",
  "tutto calabria calabrian chili in oil": "B004ROGVCG",
  "de cecco imported italian pasta": "B0014CRZWE",
  "baking steel original baking steel": "B00N205G22",
  "cuisinart fine mesh sieve": "B007TUQF9O",
  "tojiro dp gyuto 210mm": "B000UAPQGS",
  "king 1000 6000 combination whetstone": "B001DT1X9O",
  "victorinox fibrox pro 8 inch chef knife": "B000638D32",
  "global g-2 8 inch chef knife": "B00005OL44",
  "misono ux10 gyuto 210mm": "B000XSX8IA",
  "shun classic 8 inch chef knife": "B0000Y7KNQ",
  "miyabi evolution 8 inch chef knife": "B072JX5SG8",
  "instant pot duo 7in1": "B00FLYWNYQ",
  "zojirushi nhs06 3cup rice cooker": "B00004S575",
  "zojirushi rice cooker 3-cup": "B00004S575",
  "zojirushi nwjec10 55cup induction rice cooker": "B09N9Z183T",
  "le creuset enameled cast iron square grill pan": "B009ZML3SW",
  "joyce chen 14 inch carbon steel wok": "B002AQSWMU",
  "craft wok 14 inch carbon steel": "B00PUZT9MU",
  "souped up recipes flat bottom carbon steel wok": "B0CXJB22CC",
  "otoshibuta wooden drop lid": "B08L8PQ3J3",
  "bamboo steamer set 2-tier": "B0001VQIYU"
};

export function directProductUrl(query: string): string | undefined {
  const key = query.toLowerCase().replace(/\s+/g, " ").trim();
  const asin = PRODUCTS[key];
  return asin ? `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}` : undefined;
}
