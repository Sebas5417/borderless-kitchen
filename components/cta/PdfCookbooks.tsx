import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PDF_COOKBOOKS, cookbookUrl } from "@/lib/pdfCookbooks";

export function PdfCookbooks({ placement, topic }: { placement: string; topic?: string }) {
  let books = [...PDF_COOKBOOKS];
  if (topic) {
    const s = topic.toLowerCase();
    const id = /breakfast|onigiri|tamagoyaki|ochazuke/.test(s) ? "japanese-breakfast"
      : /korean.*mexican|mexican.*korean|gochujang.*taco|kimchi.*quesadilla/.test(s) ? "korean-mexican-fusion"
      : /korean|kimchi|gochujang|bulgogi|bibimbap|doenjang|ssamjang/.test(s) ? "korean-home-cooking"
      : /japanese|miso|dashi|kombu|shoyu|mirin|katsuobushi/.test(s) ? "the-japanese-pantry" : null;
    if (!id) return null;
    books = books.filter((b) => b.id === id);
  }
  return (
    <section id={topic ? undefined : "pdf-cookbooks"} className="py-12 md:py-16 border-t border-hairline bg-paper" aria-label="Downloadable cooking guides">
      <Container>
        <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">PDF cooking guides by Sebastian Dri</p>
        <h2 className="font-display text-display-3 mb-4">{topic ? "Keep exploring this kitchen." : "Choose a kitchen. Start cooking."}</h2>
        <p className="font-body text-lg text-ink/70 mb-8 max-w-prose">Focused recipe collections and a Japanese pantry reference, available as PDF downloads on Gumroad.</p>
        <div className={topic ? "max-w-3xl" : "grid md:grid-cols-2 gap-8"}>
          {books.map((book) => (
            <article key={book.id} className="flex gap-5 border border-hairline p-5 items-start">
              <a href={cookbookUrl(book.href, placement, book.id)} target="_blank" rel="noopener noreferrer" aria-label={`View ${book.title} on Gumroad`} className="shrink-0 w-24 sm:w-32">
                <Image src={book.cover} alt={`${book.title} cover`} width={256} height={384} sizes="(min-width: 640px) 128px, 96px" className="w-full h-auto shadow-md" />
              </a>
              <div>
                <h3 className="font-display text-xl sm:text-2xl leading-tight">{book.title}</h3>
                <p className="font-ui text-sm text-vermillion mt-3">{book.price} · {book.pages} pages · PDF</p>
                <p className="font-body text-base text-ink/70 mt-3">{book.summary}</p>
                <a href={cookbookUrl(book.href, placement, book.id)} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 bg-ink text-paper px-4 py-3 font-ui text-xs hover:bg-vermillion transition-colors">Get the PDF on Gumroad →</a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
