import { Container } from "@/components/layout/Container";

const bundles = [
  {
    title: "Japanese Pantry & Breakfast PDF Bundle",
    description: "The Japanese Pantry and Japanese Breakfast together: 70 pages across two English-language PDF guides.",
    price: "$8.99",
    href: "https://facelesschannel.gumroad.com/l/japanese-pantry-breakfast-bundle",
    id: "japanese",
  },
  {
    title: "Korean Cooking & Fusion PDF Bundle",
    description: "Korean Home Cooking and Korean-Mexican Fusion together: 84 pages across two English-language PDF cookbooks.",
    price: "$11.99",
    href: "https://facelesschannel.gumroad.com/l/korean-cooking-fusion-bundle",
    id: "korean",
  },
] as const;

function bundleUrl(href: string, placement: string, id: string) {
  const url = new URL(href);
  url.searchParams.set("utm_source", "borderlesskitchenseries");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "cookbook-bundles-20261103");
  url.searchParams.set("utm_content", `${placement}-${id}`);
  return url.toString();
}

export function PdfBundles({ placement }: { placement: string }) {
  return (
    <section id="pdf-bundles" className="py-12 md:py-16 border-t border-hairline bg-paper" aria-label="PDF cookbook bundles">
      <Container>
        <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Two-guide PDF bundles</p>
        <h2 className="font-display text-display-3 mb-4">Cook a little further.</h2>
        <p className="font-body text-lg text-ink/70 mb-8 max-w-prose">Each bundle includes the two listed digital guides. The printed series books are separate products.</p>
        <div className="grid md:grid-cols-2 gap-8">
          {bundles.map((bundle) => (
            <article key={bundle.id} className="border border-hairline p-6">
              <h3 className="font-display text-2xl">{bundle.title}</h3>
              <p className="font-body text-lg text-ink/75 mt-4">{bundle.description}</p>
              <p className="font-ui text-sm text-vermillion mt-4">{bundle.price} USD · two PDF guides · no physical shipment</p>
              <p className="font-body text-sm text-ink/65 mt-3">If you already own either guide, compare the included products before buying. Confirm current price and any tax at checkout.</p>
              <a href={bundleUrl(bundle.href, placement, bundle.id)} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 bg-ink text-paper px-4 py-3 font-ui text-xs hover:bg-vermillion transition-colors">
                See the bundle on Gumroad →
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}