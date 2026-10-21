import type { Metadata } from "next";
import { directProductUrl } from "@/lib/affiliateProducts";
import Link from "next/link";
import { TMT_AMAZON } from "@/lib/amazon";
import { GUMROAD_PLAYBOOK, GUMROAD_WORKBOOK_URL } from "@/lib/gumroad";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/editorial/PageHero";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "Japanese, Korean & Italian Pantry Essentials",
  alternates: { canonical: "/shop" },
  description:
    "Japanese, Korean, and Italian pantry essentials: miso, shoyu, mirin, gochujang, pecorino, recipe uses, and where to buy.",
  openGraph: { ...({
    title: "The Borderless Kitchen Pantry",
    description:
      "Japanese and Italian pantry essentials for fusion cooking — the ingredients behind Tokyo Meets Tuscany.",
    type: "website",
    url: "/shop",
    images: [
      {
        url: "/images/tmt-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Tokyo Meets Tuscany — the pantry behind the book",
      },
    ],
  }), title: "Japanese, Korean & Italian Pantry Essentials", description: "Japanese, Korean, and Italian pantry essentials: miso, shoyu, mirin, gochujang, pecorino, recipe uses, and where to buy.", url: "/shop" },
  twitter: { ...({ card: "summary_large_image", images: ["/images/tmt-cover.jpg"] }), title: "Japanese, Korean & Italian Pantry Essentials", description: "Japanese, Korean, and Italian pantry essentials: miso, shoyu, mirin, gochujang, pecorino, recipe uses, and where to buy.", card: "summary_large_image" },

};

// Use only currently verified product pages. Unmatched products retain their
// sourcing advice without an outbound shopping link.
const AMZ = (item: { brand: string; name: string }) => {
  const name = item.name.replace(/\s*\([^)]*\)/g, " ");
  const q = `${item.brand} ${name}`.replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
  return directProductUrl(q);
};

const JAPANESE_PANTRY = [
  {
    name: "White Miso (Shiro Miso)",
    brand: "Hikari Organic",
    note:
      "The miso for Western cooking. Short fermentation, mild, sweet. Goes in pizza bianca, compound butter, pasta water. Do not confuse with red miso.",
    use: "Miso White Pizza, Miso Aglio e Olio, compound butter",
  },
  {
    name: "Katsuobushi (Bonito Flakes)",
    brand: "Marutomo",
    note:
      "The inosinate source in dashi. Combined with kombu's glutamate, it makes umami taste far stronger than either alone (up to about eightfold in lab taste tests). Also used as a finish on vegetables and tofu.",
    use: "Dashi, Tonkotsu Cacio e Pepe, Dashi Risotto",
  },
  {
    name: "Kombu (Dried Kelp)",
    brand: "Wel-Pac",
    note:
      "Highest naturally-occurring source of glutamate — 2,240mg per 100g vs Parmigiano's 1,200mg. The umami foundation of Japanese cooking. Simmer in water or olive oil; discard before serving.",
    use: "Dashi, kombu-infused olive oil, broths",
  },
  {
    name: "Soy Sauce (Koikuchi Shoyu)",
    brand: "Kikkoman",
    note:
      "The fermented glutamate carrier in Japanese cooking. 1,090mg glutamate per 100g — close to sun-dried tomato, far ahead of most Italian single ingredients. Use where you'd use anchovy-dissolved-in-oil for invisible depth.",
    use: "All broths, marinades, ramen alla carbonara (optional)",
  },
  {
    name: "Mirin (Sweet Rice Wine)",
    brand: "Takara Hon Mirin",
    asin: "B07DD7H4G8",
    note:
      "The Japanese equivalent of Marsala — sweet, alcoholic, fermented rice. Use to deglaze where the recipe calls for white wine when you want a sweeter, less tannic result. Essential in tiramisu matcha soak.",
    use: "Matcha tiramisu, glazes, braises",
  },
  {
    name: "Rice Wine Vinegar",
    brand: "Marukan",
    note:
      "Softer than red wine vinegar. Lower in acetic acid, slightly sweet. Use where you want acid brightness without wine vinegar's sharpness — quick pickles, dressings, braising liquid finishes.",
    use: "Pickled daikon, sesame-lime slaw, quick pickles",
  },
  {
    name: "Toasted Sesame Oil",
    brand: "Kadoya",
    note:
      "Not a cooking oil — a finishing oil. Strong flavor, low smoke point. Add at the end of cooking, exactly as you'd add good olive oil over finished pasta. The Japanese equivalent of the finishing drizzle.",
    use: "Gochujang crema, sesame dressing, noodle finishes",
  },
];

const ITALIAN_PANTRY = [
  {
    name: "Pecorino Romano (DOP)",
    brand: "Fulvi",
    note:
      "Not Parmigiano. Sheep's milk, sharper and saltier. The correct cheese for carbonara, cacio e pepe, and amatriciana. When combining with miso, reduce salt everywhere else.",
    use: "Ramen alla Carbonara, Miso Cacio e Pepe",
  },
  {
    name: "Guanciale (Cured Pork Jowl)",
    brand: "La Quercia (or local Italian market)",
    note:
      "Not pancetta. Not bacon. Cured pork jowl with a higher fat-to-lean ratio and no smoke character. Renders cleaner and deeper than either substitute. The inosinate source in carbonara — cannot be functionally replaced without changing the dish.",
    use: "Ramen alla Carbonara, all carbonara variants",
  },
  {
    name: "Calabrian Chili Paste (Crushed Chilies in Oil)",
    brand: "Tutto Calabria",
    note:
      "The Italian equivalent of gochujang in the chili function — fruity, oily, moderately hot. Does not have gochujang's fermented depth but has a better fat-delivery mechanism (already in oil). Use in pasta, pizza, marinades.",
    use: "Pasta all'arrabbiata, chili oil lasagna, pizza",
  },
  {
    name: "Imported Italian Pasta (Rigatoni / Spaghetti)",
    brand: "De Cecco",
    note:
      "Bronze-die extruded pasta has a rough surface that holds sauce. Teflon-extruded (most cheap pasta) has a smooth surface that slides. The texture difference is significant in emulsified sauces like carbonara.",
    use: "Any pasta recipe",
  },
];


const KOREAN_PANTRY = [
  {
    name: "Gochujang (Korean Chili Paste)",
    brand: "Haechandle",
    asin: "B00IK3II4W",
    note:
      "Fermented chili paste — heat plus umami plus sweetness. The Korean equivalent of Calabrian chili paste plus miso, combined. The ingredient behind both Korean-Mexican and Korean-Italian crossovers.",
    use: "Gochujang Short Rib Taco, Gochujang Crema, Kimchi Quesadilla",
  },
  {
    name: "Gochugaru (Korean Red Pepper Flakes)",
    brand: "Taekyung",
    note:
      "The chili flakes that define kimchi and tteokbokki. Not interchangeable with regular chili flakes — gochugaru has a sweet, fruity heat (3/10 on most scales) and a vivid red color. Buy the 500g bag and freeze what you don't use within a month.",
    use: "Kimchi, gochujang substitute, tteokbokki, Korean fried chicken",
  },
  {
    name: "Doenjang (Korean Soybean Paste)",
    brand: "Haechandle",
    note:
      "The Korean equivalent of aged Japanese miso — fermented soybean paste with a deeper, earthier funk than shiro miso. The fermentation is longer and less controlled, producing a more complex, almost blue-cheese intensity. Use where you'd use miso but want more edge.",
    use: "Doenjang Carbonara, soups, dipping sauce, marinades",
  },
  {
    name: "Fish Sauce (Vietnamese or Thai)",
    brand: "Red Boat",
    note:
      "The invisible umami intensifier across Korean, Thai, and Mexican coastal cooking. Red Boat is the premium standard: just anchovy and salt, and the 40°N on the label is its protein (nitrogen) grade, not a barrel. Used in kimchi paste, Korean soups, and anywhere you want savory depth without fishiness.",
    use: "Kimchi, doenjang jjigae, Korean braising liquid",
  },
  {
    name: "Tteok — Cylinder Rice Cakes (refrigerated)",
    brand: "Choripdong",
    note:
      "The Korean rice cake for tteokbokki. Dense, chewy, made from short-grain rice flour. Holds its shape in simmering sauce without dissolving. Functions as pasta substitute in Korean-Italian fusions — same structural role, different texture and flavor.",
    use: "Tteokbokki Arrabbiata, tteok soup, stir-fries",
  },
];

const EQUIPMENT = [
  {
    name: "Baking Steel (for pizza)",
    brand: "Baking Steel Original",
    note:
      "Mandatory for Miso White Pizza. Preheated for 45 minutes at maximum heat, it produces pizzeria-quality char on a home oven. The single most impactful pizza equipment upgrade available.",
    use: "Miso White Pizza, any pizza",
  },
  {
    name: "Heavy Dutch Oven (5.5 qt)",
    brand: "Lodge",
    note:
      "Required for braising. Udon Bolognese and Gochujang Short Ribs need a heavy pot that holds even heat over a 2–3 hour braise. Lodge's enameled cast iron is the best price-to-performance option.",
    use: "Udon Bolognese, Gochujang Short Rib, all braises",
  },
  {
    name: "Fine Mesh Sieve (for matcha dusting)",
    brand: "Cuisinart",
    note:
      "For dusting matcha tiramisu and for straining dashi. The fine mesh is essential — coarser sieves clump matcha powder into blobs.",
    use: "Matcha Tiramisu, dashi straining",
  },
];

interface DigitalItem {
  name: string;
  format: string;
  note: string;
  cta: string;
  href: string | null;
}

/**
 * Our own Gumroad products. Items with no URL yet are hidden.
 * Deliberately no KDP book PDFs here: a KDP Select ebook must be exclusive to
 * Amazon, so a Gumroad edition of TMT/SMMC is only safe if neither is enrolled.
 */
const DIGITAL: DigitalItem[] = [
  {
    name: "The Fusion Kitchen Workbook",
    format: "PDF · 24 pages · printable",
    note:
      "The free 5-day mini-course as a printable workbook: five lessons and recipes, a fusion pantry shopping list, a substitution chart and a one-week cooking plan.",
    cta: "Get the workbook",
    href: GUMROAD_WORKBOOK_URL,
  },
  {
    name: "The Fusion Flavor Playbook",
    format: "PDF · $12",
    note:
      "The pairing logic on its own: which ingredients swap for which across cuisines, and why it works.",
    cta: "Get the playbook",
    href: GUMROAD_PLAYBOOK,
  },
  {
    name: "Kitchen Printables",
    format: "Fillable PDFs · on Etsy",
    note:
      "Planners for the logistics half of cooking: the week, the batch, the dinner party, and the holiday oven.",
    cta: "See the printables",
    href: "/printables",
  },
];

interface PantryItem {
  name: string;
  brand: string;
  note: string;
  use: string;
}


function PantryCard({ item }: { item: PantryItem }) {
  const productUrl = AMZ(item);
  return (
    <div className="border-b border-hairline py-8 group">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        <div className="flex-1">
          <h3 className="font-display text-xl text-ink leading-tight mb-1">
            {item.name}
          </h3>
          <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
            {item.brand}
          </p>
          <p className="font-body text-base text-ink/70 leading-relaxed mb-3">
            {item.note}
          </p>
          <p className="font-ui text-eyebrow uppercase text-ink/40">
            Used in: {item.use}
          </p>
        </div>
        <div className="shrink-0">
          {productUrl ? <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block font-ui text-eyebrow uppercase text-ink border border-ink/30 px-5 py-2.5 hover:border-vermillion hover:text-vermillion transition-colors duration-300"
          >
            View product on Amazon →
          </a> : null}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="The Pantry"
        headline="Japanese, Korean & Italian pantry essentials."
        dek="Ingredient-by-ingredient guide to Japanese, Korean, and Italian pantry staples: what they do, recipe uses, and where to find them."
        src="/images/banner-culture.png"
        alt="The Borderless Kitchen pantry — key ingredients from Japanese and Italian cooking traditions."
      />

      <section className="py-16 md:py-24">
        <Container>
          <FadeRise>
            <p className="font-body text-base text-ink/50 mb-12 max-w-prose">
              Links below are Amazon affiliate links — they cost you nothing extra and
              support the Borderless Kitchen project. We only list what we actually
              use and trust.
            </p>

            <section aria-labelledby="planning-tools-heading" className="mb-16 border border-hairline p-6 md:p-8">
              <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">Before you buy</p>
              <h2 id="planning-tools-heading" className="font-display text-display-3 text-ink mb-4">Measure the space. Count what you need.</h2>
              <p className="font-body text-base text-ink/70 max-w-prose mb-5">Our free planning tools help you count meal-prep containers, check lunch-bag fit, and compare bottle sizes. No email required.</p>
              <Link href="/tools" className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-6 py-3 hover:bg-vermillion transition-colors">Open the free kitchen tools →</Link>
            </section>

            {/* Japanese pantry */}
            <div className="mb-16">
              <h2 className="font-display text-display-2 text-ink mb-2">
                Japanese Pantry
              </h2>
              <p className="font-body text-lg text-ink/60 mb-8 max-w-prose">
                The Japanese ingredients behind Tokyo Meets Tuscany. Stock these
                and you can cook most of the book.
              </p>
              {JAPANESE_PANTRY.map((item) => (
                <PantryCard key={item.name} item={item} />
              ))}
            </div>

            {/* Korean pantry */}
            <div className="mb-16">
              <h2 className="font-display text-display-2 text-ink mb-2">
                Korean Pantry
              </h2>
              <p className="font-body text-lg text-ink/60 mb-8 max-w-prose">
                The Korean ingredients for Seoul Meets Mexico City — Volume II. Stock these
                alongside the Japanese pantry to unlock the full Borderless Kitchen range.
              </p>
              {KOREAN_PANTRY.map((item) => (
                <PantryCard key={item.name} item={item} />
              ))}
            </div>

            {/* Italian pantry */}
            <div className="mb-16">
              <h2 className="font-display text-display-2 text-ink mb-2">
                Italian Pantry
              </h2>
              <p className="font-body text-lg text-ink/60 mb-8 max-w-prose">
                The Italian ingredients that matter — and what makes each
                one worth sourcing correctly rather than substituting.
              </p>
              {ITALIAN_PANTRY.map((item) => (
                <PantryCard key={item.name} item={item} />
              ))}
            </div>

            {/* Equipment */}
            <div className="mb-16">
              <h2 className="font-display text-display-2 text-ink mb-2">
                Equipment
              </h2>
              <p className="font-body text-lg text-ink/60 mb-8 max-w-prose">
                Three pieces of equipment that make a specific difference
                for specific recipes.
              </p>
              {EQUIPMENT.map((item) => (
                <PantryCard key={item.name} item={item} />
              ))}
            </div>

            {/* Digital editions (Gumroad) */}
            <div className="mb-16">
              <h2 className="font-display text-display-2 text-ink mb-2">
                Printable Guides
              </h2>
              <p className="font-body text-lg text-ink/60 mb-8 max-w-prose">
                Our own PDFs, sold directly. Instant download, print or read on a tablet.
              </p>
              {DIGITAL.filter((d): d is DigitalItem & { href: string } => !!d.href).map((d) => (
                <div key={d.name} className="border-b border-hairline py-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-ink leading-tight mb-1">
                        {d.name}
                      </h3>
                      <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
                        {d.format}
                      </p>
                      <p className="font-body text-base text-ink/70 leading-relaxed">
                        {d.note}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <a
                        href={d.href}
                        {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-5 py-2.5 hover:bg-vermillion transition-colors duration-300"
                      >
                        {d.cta} →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Book CTA */}
            <div className="pt-10 border-t border-hairline">
              <p className="font-display italic text-display-3 text-ink/60 mb-6 leading-tight">
                The recipes that use all of this are in the book.
              </p>
              <Link
                href={TMT_AMAZON}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-8 py-4 hover:bg-vermillion transition-colors duration-300"
              >
                Tokyo Meets Tuscany on Amazon →
              </Link>
              <p className="font-ui text-eyebrow uppercase text-ink/40 mt-3">
                Paperback · Kindle
              </p>
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}
