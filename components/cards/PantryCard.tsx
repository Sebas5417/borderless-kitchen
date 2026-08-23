import Link from "next/link";

type Props = {
  slug: string;
  term: string;
  classification: string;
  origin: string[];
};

export function PantryCard({ slug, term, classification, origin }: Props) {
  return (
    <Link href={`/culture/${slug}`} className="group block border-b border-hairline pb-5 pt-5 first:border-t">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-ink group-hover:text-vermillion transition-colors duration-300 leading-tight">
            {term}
          </h3>
          <p className="font-ui text-eyebrow uppercase text-ink/40 mt-1">
            {classification} · {origin.join(", ")}
          </p>
        </div>
        <span className="font-ui text-eyebrow text-ink/30 group-hover:text-vermillion transition-colors duration-300 shrink-0">
          →
        </span>
      </div>
    </Link>
  );
}
