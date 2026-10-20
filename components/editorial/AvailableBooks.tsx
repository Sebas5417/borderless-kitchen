import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { TMT_AMAZON, SMMC_AMAZON } from "@/lib/amazon";

const books = [
  { title: "Tokyo Meets Tuscany", volume: "Volume I", pairing: "Japanese–Italian cooking", cover: "/images/tmt-cover.jpg", href: "/tokyo-meets-tuscany", amazon: TMT_AMAZON, description: "Italian soul. Japanese precision. Thirty recipes that bring the two kitchens together." },
  { title: "Seoul Meets Mexico City", volume: "Volume II · Latest release", pairing: "Korean–Mexican cooking", cover: "/images/smmc-cover-current.png", href: "/seoul-meets-mexico-city", amazon: SMMC_AMAZON, description: "Kimchi meets salsa. Gochujang meets mole. Thirty recipes built around fermented depth and layered heat." },
];

export function AvailableBooks() {
  return (
    <section id="available-books" className="py-12 md:py-20 border-t border-hairline bg-paper" aria-labelledby="available-books-heading">
      <Container>
        <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">Available now · Paperback & Kindle</p>
        <h2 id="available-books-heading" className="font-display text-display-3 mb-10">Choose your next kitchen adventure.</h2>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {books.map((book) => (
            <article key={book.href} className="grid grid-cols-[110px_1fr] sm:grid-cols-[170px_1fr] gap-5 sm:gap-7 items-start">
              <Link href={book.href} aria-label={"Explore " + book.title} className="block">
                <Image src={book.cover} alt={book.title + " cookbook cover"} width={340} height={450} sizes="(min-width: 640px) 170px, 110px" className="w-full h-auto shadow-md" />
              </Link>
              <div>
                <p className="font-ui text-[11px] uppercase tracking-widest text-vermillion mb-2">{book.volume}</p>
                <h3 className="font-display text-2xl sm:text-3xl leading-tight"><Link href={book.href}>{book.title}</Link></h3>
                <p className="font-ui text-xs text-ink/60 mt-3">{book.pairing}</p>
                <p className="font-body text-base text-ink/75 leading-relaxed mt-4">{book.description}</p>
                <a href={book.amazon} target="_blank" rel="sponsored noopener noreferrer" className="inline-block mt-5 bg-ink text-paper px-4 py-3 font-ui text-xs hover:bg-vermillion transition-colors">Buy on Amazon →</a>
                <Link href={book.href} className="block w-fit mt-4 font-ui text-xs border-b border-ink/40 pb-1">Explore the book →</Link>
              </div>
            </article>
          ))}
        </div>
        <p className="font-ui text-xs text-ink/60 mt-8">As an Amazon Associate we earn from qualifying purchases, at no extra cost to you.</p>
      </Container>
    </section>
  );
}
