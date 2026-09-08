/**
 * The Borderless Kitchen printables, sold on Etsy.
 *
 * WHY THIS LIST IS SIX ITEMS AND NOT SEVEN. The Calm Kitchen Kit is deliberately
 * absent. It bundles The Low-Energy Kitchen, which this site gives away free —
 * linking readers to a paid bundle whose headline item they can download here
 * for nothing is the kind of thing a reader notices and resents. Every product
 * below is available nowhere else free.
 *
 * NO PRICES. A shop-wide sale runs intermittently on Etsy, so any figure written
 * into this file would be wrong on the days it matters most. Etsy prices; we link.
 *
 * Links are Etsy listing IDs, which are stable for the life of the listing —
 * unlike the slug, which Etsy regenerates from the title on every retitle.
 */

const UTM =
  "utm_source=borderlesskitchen&utm_medium=site&utm_campaign=printables";

export type Printable = {
  /** Etsy listing id — the stable half of the URL. */
  id: string;
  /** Etsy's slug at time of writing. Cosmetic; the id is what resolves. */
  slug: string;
  title: string;
  /** The one thing this sheet does that a generic planner does not. */
  pitch: string;
  pages: number;
  /** True if the buyer can type into it on screen as well as print it. */
  fillable: boolean;
};

export const PRINTABLES: Printable[] = [
  {
    id: "4570812866",
    slug: "the-borderless-week-weekly-meal-planner",
    title: "The Borderless Week",
    pitch:
      "A seven-day planner you can type into. Plan the week, build the shopping list out of the plan rather than the other way round, and keep the one page that says what you already own.",
    pages: 6,
    fillable: true,
  },
  {
    id: "4570835200",
    slug: "the-sunday-cook-ahead-meal-prep-planner",
    title: "The Sunday Cook-Ahead",
    pitch:
      "Batch cooking planned around the oven rather than the recipes. Which components share a temperature, what goes in while something else rests, and what actually keeps until Thursday.",
    pages: 6,
    fillable: true,
  },
  {
    id: "4570816667",
    slug: "the-two-city-dinner-party-dinner-party",
    title: "The Two-City Dinner Party",
    pitch:
      "A hosting checklist built backwards from the moment people sit down — so the only thing left at seven o'clock is the thing that has to be done at seven o'clock.",
    pages: 6,
    fillable: true,
  },
  {
    id: "4570847799",
    slug: "pasta-night-planned",
    title: "Pasta Night, Planned",
    pitch:
      "Shape, sauce, water, salt and timing on one page. The plan for the night you want it to be good rather than merely fast.",
    pages: 6,
    fillable: true,
  },
  {
    id: "4570860126",
    slug: "aperitivo-hour",
    title: "Aperitivo Hour",
    pitch:
      "The Italian hour before dinner, planned properly: what to pour, what to put beside it, and how much of both for the number of people actually coming.",
    pages: 6,
    fillable: true,
  },
  {
    id: "4570873160",
    slug: "the-holiday-table-christmas-dinner",
    title: "The Holiday Table",
    pitch:
      "Holiday dinners do not fail on the recipes, they fail on the oven. Every dish was tested alone at its own temperature; this maps rack space and timing for all of them at once.",
    pages: 7,
    fillable: true,
  },
];

export function etsyUrl(p: Printable): string {
  return `https://www.etsy.com/listing/${p.id}/${p.slug}?${UTM}`;
}

export const ETSY_SHOP_URL = `https://www.etsy.com/shop/FacelessChannel?${UTM}`;
