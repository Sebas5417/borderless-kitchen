import Link from "next/link";

/**
 * "Buying guide" callout: the guides a page's own text points at (lib/storyGuides.ts).
 * Internal links only, so no affiliate disclosure is needed here; the guides carry
 * their own.
 */
export function GuideCallout({ guides }: { guides: { slug: string; title: string }[] }) {
  if (guides.length === 0) return null;
  return (
    <div className="max-w-prose mx-auto mt-16 pt-10 border-t border-hairline">
      <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
        {guides.length === 1 ? "Buying guide" : "Buying guides"}
      </p>
      <ul className="space-y-3">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/journal/${g.slug}`}
              className="font-display text-lg text-ink leading-snug hover:text-vermillion transition-colors duration-300"
            >
              {g.title} →
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4">
        <Link
          href="/guides"
          className="font-ui text-eyebrow uppercase text-ink/50 hover:text-vermillion transition-colors duration-300"
        >
          All buying guides
        </Link>
      </p>
    </div>
  );
}
