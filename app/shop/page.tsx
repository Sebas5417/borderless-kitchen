import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/editorial/PageHero";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "The Pantry | Borderless Kitchen",
  description:
    "The Japanese and Italian pantry ingredients behind every recipe in the Borderless Kitchen series — with sourcing notes and where to find them.",
  openGraph: {
    title: "The Borderless Kitchen Pantry",
    description:
      "Japanese and Italian pantry essentials for fusion cooking — the ingredients behind Tokyo Meets Tuscany.",
    type: "website",
  },
};

// Replace [ASSOCIATE-ID] with your actual Amazon Associates ID
const AMZ = (asin: string) =>
  `https://www.amazon.com/dp/${asin}?tag=[ASSOCIATE-ID]`;

const JAPANESE_PANTRY = [
  {
    name: "White Miso (Shiro Miso)",
    brand: "Hikari Organic",
    asin: "B004O2Y7E0",
    note:
      "The miso for Western cooking. Short fermentation, mild, sweet. Goes in pizza bianca, compound butter, pasta water. Do not confuse with red miso.",
    use: "Miso White Pizza, Miso Aglio e Olio, compound butter",
  },
  {
    name: "Katsuobushi (Bonito Flakes)",
    brand: "Marutomo",
    asin: "B004WOTK4I",
    note:
      "The inosinate source in dashi. When combined with kombu's glutamate, umami perception multiplies 6–8x. Also used as a finish on vegetables and tofu.",
    use: "Dashi, Tonkotsu Cacio e Pepe, Dashi Risotto",
  },
  {
    name: "Kombu (Dried Kelp)",
    brand: "Wel-Pac",
    asin: "B001HTIKJQ",
    note:
      "Highest naturally-occurring source of glutamate — 2,240mg per 100g vs Parmigiano's 1,200mg. The umami foundation of Japanese cooking. Simmer in water or olive oil; discard before serving.",
    use: "Dashi, kombu-infused olive oil, broths",
  },
  {
    name: "Soy Sauce (Koikuchi Shoyu)",
    brand: "Kikkoman",
    asin: "B004QRBFHS",
    note:
      "The fermented glutamate carrier in Japanese cooking. 1,090mg glutamate per 100g — close to sun-dried tomato, far ahead of most Italian single ingredients. Use where you'd use anchovy-dissolved-in-oil for invisible depth.",
    use: "All broths, marinades, ramen alla carbonara (optional)",
  },
  {
    name: "Mirin (Sweet Rice Wine)",
    brand: "Kikkoman Hon Mirin",
    asin: "B07DD7H4G8",
    note:
      "The Japanese equivalent of Marsala — sweet, alcoholic, fermented rice. Use to deglaze where the recipe calls for white wine when you want a sweeter, less tannic result. Essential in tiramisu matcha soak.",
    use: "Matcha tiramisu, glazes, braises",
  },
  {
    name: "Gochujang (Korean Chili Paste)",
    brand: "Haechandle",
    asin: "B00IK3II4W",
    note:
      "Fermented chili paste — heat plus umami plus sweetness. The Korean equivalent of Calabrian chili paste plus miso, combined. The ingredient behind both Korean-Mexican and Korean-Italian crossovers.",
    use: "Gochujang Short Rib Taco, Gochujang Crema, Kimchi Quesadilla",
  },
  {
    name: "Rice Wine Vinegar",
    brand: "Marukan",
    asin: "B0011UGMBU",
    note:
      "Softer than red wine vinegar. Lower in acetic acid, slightly sweet. Use where you want acid brightness without wine vinegar's sharpness — quick pickles, dressings, braising liquid finishes.",
    use: "Pickled daikon, sesame-lime slaw, quick pickles",
  },
  {
    name: "Toasted Sesame Oil",
    brand: "Kadoya",
    asin: "B074H5CL3N",
    note:
      "Not a cooking oil — a finishing oil. Strong flavor, low smoke point. Add at the end of cooking, exactly as you'd add good olive oil over finished pasta. The Japanese equivalent of the finishing drizzle.",
    use: "Gochujang crema, sesame dressing, noodle finishes",
  },
];

const ITALIAN_PANTRY = [
  {
    name: "Pecorino Romano (DOP)",
    brand: "Fulvi",
    asin: "B01N4LGJ8I",
    note:
      "Not Parmigiano. Sharper, saltier, higher in glutamates relative to its age. The correct cheese for carbonara, cacio e pepe, and amatriciana. When combining with miso, reduce salt everywhere else.",
    use: "Ramen alla Carbonara, Miso Cacio e Pepe",
  },
  {
    name: "Guanciale (Cured Pork Jowl)",
    brand: "La Quercia (or local Italian market)",
    asin: "B01LWPE9U6",
    note:
      "Not pancetta. Not bacon. Cured pork jowl with a higher fat-to-lean ratio and no smoke character. Renders cleaner and deeper than either substitute. The inosinate source in carbonara — cannot be functionally replaced without changing the dish.",
    use: "Ramen alla Carbonara, all carbonara variants",
  },
  {
    name: "Calabrian Chili in Oil (Nduja paste or whole)",
    brand: "Tutto Calabria",
    asin: "B07J7R8Y3C",
    note:
      "The Italian equivalent of gochujang in the chili function — fruity, oily, moderately hot. Does not have gochujang's fermented depth but has a better fat-delivery mechanism (already in oil). Use in pasta, pizza, marinades.",
    use: "Pasta all'arrabbiata, chili oil lasagna, pizza",
  },
  {
    name: "Imported Italian Pasta (Rigatoni / Spaghetti)",
    brand: "De Cecco",
    asin: "B07CZ1ZFQT",
    note:
      "Bronze-die extruded pasta has a rough surface that holds sauce. Teflon-extruded (most cheap pasta) has a smooth surface that slides. The texture difference is significant in emulsified sauces like carbonara.",
    use: "Any pasta recipe",
  },
];

const SUBSCRIPTIONS = [
  {
    name: "Bokksu — Japanese Snack Subscription",
    brand: "Bokksu",
    asin: "",
    bokksuLink: "https://www.bokksu.com/?refer=borderlesskitchen",
    note:
      "Monthly Japanese snack and pantry box. The fastest way to start building familiarity with Japanese flavor profiles — mochi, dashi crackers, matcha sweets. Each box comes with a culture guide. $15 credit per referral.",
    use: "Flavor exploration, pantry introduction, gift",
  },
];

const KOREAN_PANTRY = [
  {
    name: "Gochugaru (Korean Red Pepper Flakes)",
    brand: "Taekyung",
    asin: "B09CLDRDBB",
    note:
      "The chili flakes that define kimchi and tteokbokki. Not interchangeable with regular chili flakes — gochugaru has a sweet, fruity heat (3/10 on most scales) and a vivid red color. Buy the 500g bag and freeze what you don't use within a month.",
    use: "Kimchi, gochujang substitute, tteokbokki, Korean fried chicken",
  },
  {
    name: "Doenjang (Korean Soybean Paste)",
    brand: "Haechandle",
    asin: "B00ZDH4SCW",
    note:
      "The Korean equivalent of aged Japanese miso — fermented soybean paste with a deeper, earthier funk than shiro miso. The fermentation is longer and less controlled, producing a more complex, almost blue-cheese intensity. Use where you'd use miso but want more edge.",
    use: "Doenjang Carbonara, soups, dipping sauce, marinades",
  },
  {
    name: "Fish Sauce (Vietnamese or Thai)",
    brand: "Red Boat",
    asin: "B007Y9TGM4",
    note:
      "The invisible umami intensifier across Korean, Thai, and Mexican coastal cooking. Red Boat is the premium standard — 40°N barrels, two-ingredient product (fish + salt). Used in kimchi paste, Korean soups, and anywhere you want savory depth without fishiness.",
    use: "Kimchi, doenjang jjigae, Korean braising liquid",
  },
  {
    name: "Tteok — Cylinder Rice Cakes (refrigerated)",
    brand: "Choripdong",
    asin: "B07TD9ZK8K",
    note:
      "The Korean rice cake for tteokbokki. Dense, chewy, made from short-grain rice flour. Holds its shape in simmering sauce without dissolving. Functions as pasta substitute in Korean-Italian fusions — same structural role, different texture and flavor.",
    use: "Tteokbokki Arrabbiata, tteok soup, stir-fries",
  },
];

const EQUIPMENT = [
  {
    name: "Baking Steel (for pizza)",
    brand: "Baking Steel Original",
    asin: "B00HGOIOAK",
    note:
      "Mandatory for Miso White Pizza. Preheated for 45 minutes at maximum heat, it produces pizzeria-quality char on a home oven. The single most impactful pizza equipment upgrade available.",
    use: "Miso White Pizza, any pizza",
  },
  {
    name: "Heavy Dutch Oven (5.5 qt)",
    brand: "Lodge",
    asin: "B00CCO89UE",
    note:
      "Required for braising. Udon Bolognese and Gochujang Short Ribs need a heavy pot that holds even heat over a 2–3 hour braise. Lodge's enameled cast iron is the best price-to-performance option.",
    use: "Udon Bolognese, Gochujang Short Rib, all braises",
  },
  {
    name: "Fine Mesh Sieve (for matcha dusting)",
    brand: "Cuisinart",
    asin: "B00004S7V8",
    note:
      "For dusting matcha tiramisu and for straining dashi. The fine mesh is essential — coarser sieves clump matcha powder into blobs.",
    use: "Matcha Tiramisu, dashi straining",
  },
];

interface PantryItem {
  name: string;
  brand: string;
  asin: string;
  note: string;
  use: string;
}

interface SubscriptionItem {
  name: string;
  brand: string;
  asin: string;
  bokksuLink: string;
  note: string;
  use: string;
}

function PantryCard({ item }: { item: PantryItem }) {
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
          <a
            href={AMZ(item.asin)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-ui text-eyebrow uppercase text-ink border border-ink/30 px-5 py-2.5 hover:border-vermillion hover:text-vermillion transition-colors duration-300"
          >
            Find on Amazon →
          </a>
        </div>
      </div>
    </div>
  );
}

function SubscriptionCard({ item }: { item: SubscriptionItem }) {
  return (
    <div className="border-b border-hairline py-8">
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
            Good for: {item.use}
          </p>
        </div>
        <div className="shrink-0">
          <a
            href={item.bokksuLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-ui text-eyebrow uppercase text-ink border border-ink/30 px-5 py-2.5 hover:border-vermillion hover:text-vermillion transition-colors duration-300"
          >
            Visit Bokksu →
          </a>
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
        headline="What to stock before you cook."
        dek="The Japanese and Italian ingredients behind every recipe in the Borderless Kitchen series — what each one does and where to find it."
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

            {/* Japanese pantry */}
            <div className="mb-16">
              <h2 className="font-display text-display-2 text-ink mb-2">
                Japanese Pantry
              </h2>
              <p className="font-body text-lg text-ink/60 mb-8 max-w-prose">
                The eight ingredients that unlock both cuisines. Stock these
                and you can make any recipe in Tokyo Meets Tuscany.
              </p>
              {JAPANESE_PANTRY.map((item) => (
                <PantryCard key={item.asin} item={item} />
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
                <PantryCard key={item.asin} item={item} />
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
                <PantryCard key={item.asin} item={item} />
              ))}
            </div>

            {/* Subscriptions */}
            <div className="mb-16">
              <h2 className="font-display text-display-2 text-ink mb-2">
                Japanese Ingredient Subscriptions
              </h2>
              <p className="font-body text-lg text-ink/60 mb-8 max-w-prose">
                The fastest way to build Japanese pantry fluency — curated
                monthly boxes with ingredients you will actually use.
              </p>
              {SUBSCRIPTIONS.map((item) => (
                <SubscriptionCard key={item.name} item={item} />
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
                <PantryCard key={item.asin} item={item} />
              ))}
            </div>

            {/* Book CTA */}
            <div className="pt-10 border-t border-hairline">
              <p className="font-display italic text-display-3 text-ink/60 mb-6 leading-tight">
                The recipes that use all of this are in the book.
              </p>
              <Link
                href="https://www.amazon.com/dp/B0GY8H2TCQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-8 py-4 hover:bg-vermillion transition-colors duration-300"
              >
                Tokyo Meets Tuscany on Amazon →
              </Link>
              <p className="font-ui text-eyebrow uppercase text-ink/40 mt-3">
                Paperback · Kindle · Hardcover
              </p>
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}
