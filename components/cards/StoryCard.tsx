import Link from "next/link";
import { EditorialImage } from "@/components/media/EditorialImage";

type Props = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  heroImageAlt: string;
  heroSrc?: string | null;
  /** Disable link if the route isn't published yet. */
  inactive?: boolean;
};

export function StoryCard({
  slug,
  title,
  dek,
  date,
  heroImageAlt,
  heroSrc,
  inactive,
}: Props) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const Inner = (
    <article className="group">
      <EditorialImage
        alt={heroImageAlt}
        aspect="editorial"
        slot={`story-card-${slug}`}
        src={heroSrc ?? null}
        className={!inactive ? "transition-opacity duration-500 group-hover:opacity-90" : ""}
      />
      <div className="mt-5">
        <p className="font-ui text-eyebrow uppercase text-ink/50 mb-3">
          {formattedDate}
        </p>
        <h3 className="font-display text-2xl text-ink leading-tight group-hover:text-vermillion transition-colors duration-300">
          {title}
        </h3>
        <p className="font-body text-base text-ink/70 mt-3 leading-relaxed">
          {dek}
        </p>
        {!inactive ? (
          <p className="font-ui text-eyebrow uppercase text-ink/40 mt-4 group-hover:text-vermillion transition-colors duration-300">
            Read essay <span aria-hidden="true">→</span>
          </p>
        ) : null}
      </div>
    </article>
  );

  return inactive ? (
    Inner
  ) : (
    <Link href={`/journal/${slug}`} className="block">
      {Inner}
    </Link>
  );
}
