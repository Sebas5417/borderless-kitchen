import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const title = "Free Japanese–Italian Flavor Pairing Matrix";
const description = "Download the free one-page Flavor Pairing Matrix: sixteen Japanese–Italian ingredient pairings across eight categories, with practical substitution notes.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/flavor-guide" },
  openGraph: { title, description, url: "/flavor-guide", type: "website", images: ["/images/banner-carousel-1.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/banner-carousel-1.png"] },
};
export default function FlavorGuidePage() {
  return (<>
    <section className="bg-ink text-paper py-20 md:py-32">
      <Container>
        <p className="font-ui text-eyebrow uppercase text-paper/60 mb-6">Free printable guide</p>
        <h1 className="font-display text-display-1 leading-tight max-w-4xl mb-8">The Flavor<br /><span className="text-vermillion italic">Pairing Matrix.</span></h1>
        <p className="font-body text-xl text-paper/80 max-w-2xl mb-10">Sixteen Japanese–Italian ingredient pairings. Eight categories. One printable page explaining what each ingredient does and how to make the swap.</p>
        <div className="max-w-lg border border-paper/20 p-8">
          <NewsletterForm variant="inverted" label="Get the free matrix and kitchen notes" buttonLabel="Get the PDF →" successLink={{ href: "/flavor-pairing-matrix.pdf", label: "Download the matrix (PDF) →" }} />
          <p className="font-ui text-xs text-paper/60 mt-4">The download appears here after signup. Occasional kitchen notes; unsubscribe anytime.</p>
        </div>
      </Container>
    </section>
    <section className="py-16 md:py-24">
      <Container><div className="max-w-3xl">
        <h2 className="font-display text-display-2 mb-6">Match the function. Understand the difference.</h2>
        <p className="font-body text-lg text-ink/70 mb-8">From umami and finishing salt to starch, citrus and heat, the matrix pairs familiar Italian ingredients with Japanese ingredients that can serve a similar purpose. Notes explain where sweetness, texture or intensity changes.</p>
        <ul className="font-body text-lg space-y-4 mb-10">
          <li>Parmigiano and white miso: fermented depth, with different salt and sweetness.</li>
          <li>Spaghetti and ramen noodles: structure and sauce, with a different chew.</li>
          <li>Lemon and yuzu: citrus brightness, with a more floral character.</li>
          <li>Chicken stock and kombu dashi: liquid and savory depth, with a lighter finish.</li>
        </ul>
        <p className="font-body text-ink/70 mb-6">Already subscribed? Your download is always available below.</p>
        <a href="/flavor-pairing-matrix.pdf" className="inline-block bg-ink text-paper px-6 py-4 font-ui">Download the free matrix (PDF) →</a>
        <p className="mt-10"><Link href="/free" className="text-vermillion underline">Explore the free recipe collection →</Link></p>
      </div></Container>
    </section>
  </>);
}
