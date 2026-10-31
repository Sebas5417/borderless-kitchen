import { PdfCookbooks } from "@/components/cta/PdfCookbooks";
import { AvailableBooks } from "@/components/editorial/AvailableBooks";
import type { Metadata } from "next";
import { allBooks } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { EditorialImage } from "@/components/media/EditorialImage";
import { EmailCaptureCTA } from "@/components/cta/EmailCaptureCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/books" },
  title: "The Series",
  description:
    "Explore the Borderless Kitchen cookbooks: Tokyo Meets Tuscany and Seoul Meets Mexico City. Both available in paperback and on Kindle, with more volumes in development.",

  twitter: { ...({}), title: "The Series", description: "Explore the Borderless Kitchen cookbooks: Tokyo Meets Tuscany and Seoul Meets Mexico City. Both available in paperback and on Kindle, with more volumes in development.", card: "summary_large_image" },

  openGraph: { ...({}), title: "The Series", description: "Explore the Borderless Kitchen cookbooks: Tokyo Meets Tuscany and Seoul Meets Mexico City. Both available in paperback and on Kindle, with more volumes in development.", url: "/books" },
};


export default function BooksPage() {
  const future = allBooks
    .filter((b) => b.status === "coming" && b.slug !== "seoul-meets-mexico-city")
    .sort((a, b) => (a.ordering ?? 100) - (b.ordering ?? 100));

  return (
    <>
      <section className="py-12 md:py-16"><Container>
        <p className="font-ui text-eyebrow uppercase text-vermillion mb-4">The Borderless Kitchen series</p>
        <h1 className="font-display text-display-2">Two cookbooks. Four kitchens.</h1>
        <p className="font-body text-lg text-ink/70 mt-5 max-w-prose">Start with Japanese–Italian cooking in Tokyo Meets Tuscany, or explore Korean–Mexican flavors in Seoul Meets Mexico City. Both are available now.</p>
      </Container></section>
      <AvailableBooks />
      <PdfCookbooks placement="books" />

      {/* Future volumes */}
      {future.length > 0 ? (
        <section className="py-24 md:py-32 border-t border-hairline">
          <Container>
            <p className="font-ui text-eyebrow uppercase text-ink/50 mb-12">
              Further volumes
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {future.map((book) => (
                <li key={book.slug}>
                  <article>
                    <EditorialImage
                      alt={book.coverImageAlt}
                      aspect="hero-portrait"
                      slot={`future-${book.slug}`}
                      src={book.coverImageSrc ?? null}
                    />
                    <div className="mt-5">
                      <p className="font-ui text-eyebrow uppercase text-ink/50 mb-2">
                        {book.regionA} × {book.regionB}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                        {book.title}
                      </h3>
                      <p className="font-ui text-eyebrow uppercase text-ink/40 mt-3">
                        Coming soon
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <EmailCaptureCTA />
    </>
  );
}
