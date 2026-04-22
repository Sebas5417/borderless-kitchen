import Link from "next/link";
import { EditorialImage } from "@/components/media/EditorialImage";

type Props = {
  slug: string;
  title: string;
  regionA: string;
  regionB: string;
  status: "available" | "coming" | "in-progress";
  coverImageAlt: string;
  /** Image source — null in v1 falls through to placeholder. */
  coverSrc?: string | null;
  /** Disable link if the route isn't published. */
  inactive?: boolean;
};

/**
 * A book card. Used in the home series preview and on /books.
 * Coming-soon variant uses a quieter status eyebrow and skips
 * the link.
 */
export function BookCard({
  slug,
  title,
  regionA,
  regionB,
  status,
  coverImageAlt,
  coverSrc,
  inactive,
}: Props) {
  const statusLabel =
    status === "available"
      ? "Available"
      : status === "coming"
        ? "Coming soon"
        : "In progress";

  const isLinked = !inactive && status === "available";

  const Inner = (
    <article className="group">
      <EditorialImage
        alt={coverImageAlt}
        aspect="hero-portrait"
        slot={`book-card-${slug}`}
        src={coverSrc ?? null}
        className={isLinked ? "transition-opacity duration-500 group-hover:opacity-90" : ""}
      />
      <div className="mt-5">
        <p className="font-ui text-eyebrow uppercase text-ink/50 mb-2">
          {regionA} <span className="mx-2 text-ink/30">×</span> {regionB}
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
          {title}
        </h3>
        <p className="font-ui text-eyebrow uppercase text-ink/40 mt-3">
          {statusLabel}
        </p>
      </div>
    </article>
  );

  return isLinked ? (
    <Link href={`/books/${slug}`} className="block">
      {Inner}
    </Link>
  ) : (
    Inner
  );
}
