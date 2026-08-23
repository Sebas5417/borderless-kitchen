import { EditorialImage } from "@/components/media/EditorialImage";
import { MDXContent } from "@/components/MDXContent";

type Props = {
  id: string;
  slug: string;
  title: string;
  chapter: string;
  category: string;
  heat: number;
  pairings: string[];
  heroImageAlt: string;
  heroImageSrc?: string | null;
  headnoteCode: string;
};

function HeatDots({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Heat level: ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`block w-1.5 h-1.5 rounded-full ${
            i < level ? "bg-vermillion" : "bg-ink/15"
          }`}
        />
      ))}
    </span>
  );
}

export function RecipeTeaserCard({
  id,
  title,
  chapter,
  category,
  heat,
  pairings,
  heroImageAlt,
  heroImageSrc,
  headnoteCode,
}: Props) {
  return (
    <article
      id={id}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 border-t border-hairline pt-10"
    >
      <div className="lg:col-span-5">
        <EditorialImage
          alt={heroImageAlt}
          aspect="editorial"
          slot={`recipe-${id}`}
          src={heroImageSrc}
        />
      </div>
      <div className="lg:col-span-7 lg:pt-2">
        <div className="flex items-center gap-4 mb-5">
          <p className="font-ui text-eyebrow uppercase text-ink/50">
            {chapter} · {category}
          </p>
          <HeatDots level={heat} />
        </div>
        <h3 className="font-display text-display-3 text-ink leading-tight mb-6">
          {title}
        </h3>
        <div className="font-body text-base text-ink/80 leading-relaxed max-w-prose mb-8 [&_p]:mb-4">
          <MDXContent code={headnoteCode} />
        </div>
        {pairings.length > 0 ? (
          <div>
            <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
              Pairs with
            </p>
            <ul className="space-y-1">
              {pairings.map((p) => (
                <li key={p} className="font-body text-sm text-ink/70">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
