import Link from "next/link";
import { Container } from "@/components/layout/Container";

const guides = [
  { cuisine: "japanese", title: "Japanese cookbooks for home cooks", slug: "best-japanese-cookbooks-for-home-cooks" },
  { cuisine: "italian", title: "Italian cookbooks for home cooks", slug: "best-italian-cookbooks-for-home-cooks" },
  { cuisine: "korean", title: "Korean cookbooks for home cooks", slug: "best-korean-cookbooks-for-home-cooks" },
  { cuisine: "mexican", title: "Mexican cookbooks for home cooks", slug: "best-mexican-cookbooks-for-home-cooks" },
];

export function CookbookGuideLinks({ cuisines }: { cuisines?: string[] }) {
  const selected = cuisines ? guides.filter((g) => cuisines.includes(g.cuisine)) : guides;
  return (
    <section className="py-12 md:py-16 border-t border-hairline" aria-labelledby="cookbook-guides">
      <Container>
        <h2 id="cookbook-guides" className="font-display text-display-3">Find your next cookbook</h2>
        <p className="font-body text-lg text-ink/70 mt-4 max-w-prose">Compare books by the cuisine you love and the way you cook, or choose a gift for someone who enjoys time in the kitchen.</p>
        <ul className="font-body text-lg mt-6 grid gap-4 sm:grid-cols-2">
          {selected.map((guide) => <li key={guide.slug}><Link className="underline underline-offset-4 hover:text-vermillion" href={`/journal/${guide.slug}`}>{guide.title}</Link></li>)}
          <li><Link className="underline underline-offset-4 hover:text-vermillion" href="/journal/cookbook-christmas-gift-ideas">Cookbook Christmas gift ideas</Link></li>
          <li><Link className="underline underline-offset-4 hover:text-vermillion" href="/books/compare">Compare cookbooks, formats and PDF guides</Link></li>
          <li><Link className="underline underline-offset-4 hover:text-vermillion" href="/books">Japanese-Italian and Korean-Mexican fusion cookbooks</Link></li>
        </ul>
      </Container>
    </section>
  );
}
