import Link from "next/link";

type Item = { slug: string; title: string };

type Props = {
  prev?: Item;
  next?: Item;
  basePath: string; // e.g. "/journal"
};

export function NextPrevious({ prev, next, basePath }: Props) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Previous and next"
      className="border-t border-hairline mt-20 pt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {prev ? (
        <div>
          <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">
            Previous
          </p>
          <Link
            href={`${basePath}/${prev.slug}`}
            className="font-display text-xl text-ink hover:text-vermillion transition-colors duration-300 leading-tight block"
          >
            ← {prev.title}
          </Link>
        </div>
      ) : (
        <div />
      )}
      {next ? (
        <div className="md:text-right">
          <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">
            Next
          </p>
          <Link
            href={`${basePath}/${next.slug}`}
            className="font-display text-xl text-ink hover:text-vermillion transition-colors duration-300 leading-tight block"
          >
            {next.title} →
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
