import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { AmazonCTA } from "@/components/cta/AmazonCTA";
import { COOKBOOK_OFFERS, type CookbookId } from "@/lib/cookbookOffers";

export function BookBuyingPanel({ bookId, recipeContext = false }: { bookId: CookbookId; recipeContext?: boolean }) {
  const book = COOKBOOK_OFFERS[bookId];
  return (
    <section className="py-12 md:py-16 border-y border-hairline bg-paper" aria-label={`${book.title} cookbook`}>
      <Container>
        <div className="grid sm:grid-cols-[150px_1fr] gap-8 items-start max-w-4xl mx-auto">
          <Link href={book.page} className="block max-w-[150px]"><Image src={book.cover} alt={`${book.title} cookbook cover`} width={300} height={400} sizes="150px" className="w-full h-auto shadow-lg" /></Link>
          <div>
            <p className="font-ui text-eyebrow uppercase text-vermillion mb-3">{recipeContext ? "Enjoy this recipe? Explore the cookbook." : "Choose your next kitchen adventure"}</p>
            <h2 className="font-display text-display-3">{book.title}</h2>
            <p className="font-body text-lg text-ink/80 mt-4">{book.description}</p>
            <ul className="font-body text-ink/75 list-disc pl-5 mt-4 space-y-2">
              <li>{book.cuisine} fusion cooking by Sebastian Dri</li>
              <li>Paperback and Kindle editions</li>
              <li>Free recipe previews to explore before choosing</li>
            </ul>
            <div className="mt-6"><AmazonCTA href={book.amazon} label={`View ${book.title} on Amazon`} placement={recipeContext ? "recipe-offer" : "book-buying-panel"} /></div>
            <p className="font-body text-sm text-ink/65 mt-4">Check the current price, format and delivery estimate on Amazon.</p>
            <div className="font-body mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <Link href={book.preview} className="underline underline-offset-4 hover:text-vermillion">Try the free {book.cuisine} recipes</Link>
              {recipeContext ? <Link href={book.page} className="underline underline-offset-4 hover:text-vermillion">See what the cookbook includes</Link> : <Link href="/journal/cookbook-christmas-gift-ideas" className="underline underline-offset-4 hover:text-vermillion">Choosing a cookbook gift?</Link>}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
