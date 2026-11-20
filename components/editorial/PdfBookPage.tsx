import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PdfOfferLink } from "@/components/cta/PdfOfferLink";
import { PDF_COOKBOOKS, cookbookUrl } from "@/lib/pdfCookbooks";
import { PDF_DETAILS } from "@/lib/pdfCookbookDetails";
import { breadcrumbJson } from "@/lib/breadcrumbSchema";

const SITE = "https://borderlesskitchenseries.com";
export async function pdfBookMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = PDF_COOKBOOKS.find(b => b.id === slug);
  if (!book) return {};
  const title = `${book.title} | PDF`;
  return { title: { absolute: title }, description: `${book.summary} See the contents and a free preview before choosing your download.`, alternates: { canonical: `/books/${book.id}` }, openGraph: { title, description: book.summary, url: `/books/${book.id}`, type: "website", images: [{ url: book.cover, alt: `${book.title} cover` }] }, twitter: { card: "summary_large_image", title, description: book.summary, images: [book.cover] } };
}
export default async function PdfBookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = PDF_COOKBOOKS.find(b => b.id === slug);
  if (!book) notFound();
  const detail = PDF_DETAILS[book.id];
  const schema = { "@context": "https://schema.org", "@type": ["Book", "Product"], "@id": `${SITE}/books/${book.id}#book`, name: book.title, description: book.summary, image: `${SITE}${book.cover}`, url: `${SITE}/books/${book.id}`, sku: book.id, author: { "@type": "Person", name: "Sebastian Dri", url: `${SITE}/about` }, bookFormat: "https://schema.org/EBook", numberOfPages: book.pages, inLanguage: "en", offers: { "@type": "Offer", url: book.href, priceCurrency: "USD", price: book.price.slice(1), seller: { "@type": "Person", name: "Sebastian Dri" } } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson([{ name: "Books", path: "/books" }, { name: book.title, path: `/books/${book.id}` }]) }} />
    <section className="py-12 md:py-20"><Container>
      <nav aria-label="Breadcrumb" className="font-body text-sm mb-8"><Link className="underline underline-offset-4" href="/books">All cookbooks</Link><span aria-hidden="true"> / </span><span>PDF cooking guide</span></nav>
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start">
        <Image src={book.cover} alt={`${book.title} cover`} width={512} height={768} priority sizes="(min-width: 768px) 30vw, 70vw" className="w-full max-w-sm h-auto shadow-md" />
        <div><p className="font-ui text-eyebrow uppercase text-vermillion mb-4">PDF cookbook by Sebastian Dri</p>
          <h1 className="font-display text-display-2">{book.title}</h1>
          <p className="font-body text-lg mt-5 text-ink/80">{book.summary}</p>
          <p className="font-ui mt-5">{book.price} USD ? {book.pages} pages ? English ? Digital PDF</p>
          <p className="font-body text-sm mt-3 text-ink/70">This is a digital download. No printed book is shipped. Confirm the current price and any applicable tax at checkout on Gumroad.</p>
          <PdfOfferLink href={cookbookUrl(book.href, "product-page", book.id)} productId={book.id} placement="product-page-primary" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 px-6 py-4 bg-ink text-paper font-ui hover:bg-vermillion">Get the PDF on Gumroad</PdfOfferLink>
          <PdfOfferLink href={book.preview} productId={book.id} placement="product-page" preview target="_blank" rel="noopener noreferrer" className="block mt-5 underline underline-offset-4 font-body">Read the free cover and contents preview</PdfOfferLink>
        </div>
      </div>
    </Container></section>
    <section className="py-12 border-t border-hairline"><Container><div className="grid gap-10 md:grid-cols-2">
      <div><h2 className="font-display text-3xl">{detail.focus}</h2><p className="font-body text-lg mt-5 text-ink/80">{detail.audience}</p>
        <h3 className="font-display text-2xl mt-8">Inside the guide</h3><ul className="list-disc pl-6 font-body text-lg space-y-3 mt-4">{detail.inside.map(item => <li key={item}>{item}</li>)}</ul>
        <h3 className="font-display text-2xl mt-8">A few topics from the contents</h3><ul className="list-disc pl-6 font-body text-lg space-y-2 mt-4">{detail.examples.map(item => <li key={item}>{item}</li>)}</ul>
      </div><figure><Image src={book.contentsImage} alt={`Contents-page preview from ${book.title}`} width={640} height={830} sizes="(min-width: 768px) 45vw, 90vw" className="w-full max-w-lg h-auto border border-hairline" /><figcaption className="font-body text-sm text-ink/70 mt-3">An actual contents page from this PDF. Open the free preview to inspect it at full size.</figcaption></figure>
    </div></Container></section>
    <section className="py-12 border-t border-hairline"><Container><div className="max-w-prose font-body text-lg space-y-6">
      <h2 className="font-display text-3xl">Before you choose</h2>
      <div><h3 className="font-display text-2xl">Is this the complete book preview?</h3><p className="mt-3">The free sample contains the cover and contents. The complete {book.pages}-page PDF is sold separately on Gumroad.</p></div>
      <div><h3 className="font-display text-2xl">Is it the same as the printed series?</h3><p className="mt-3">This is a separate PDF guide. Tokyo Meets Tuscany and Seoul Meets Mexico City are different books available through Amazon in paperback and Kindle editions.</p></div>
      <div><h3 className="font-display text-2xl">Where do I complete the purchase?</h3><p className="mt-3">The purchase button opens the product listing on Gumroad. Review the price, delivery information and applicable terms there before paying.</p></div>
      <p><Link href={`/recipes/cuisine/${detail.recipes}`} className="underline underline-offset-4">Explore related free recipes</Link></p>
      <p><Link href="/books/compare" className="underline underline-offset-4">Compare all six cookbooks and guides</Link></p>
    </div></Container></section>
    <section className="py-12 border-t border-hairline"><Container><h2 className="font-display text-3xl mb-6">Other PDF guides</h2><ul className="grid gap-5 sm:grid-cols-3 font-body text-lg">{PDF_COOKBOOKS.filter(b => b.id !== book.id).map(b => <li key={b.id}><Link className="underline underline-offset-4" href={`/books/${b.id}`}>{b.title}</Link><p className="text-sm text-ink/70 mt-2">{b.pages} pages ? {b.price} USD</p></li>)}</ul></Container></section>
  </>;
}
