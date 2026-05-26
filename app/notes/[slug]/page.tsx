import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allFieldNotes } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { ProseLayout } from "@/components/editorial/ProseLayout";
import { MDXContent } from "@/components/MDXContent";

export async function generateStaticParams() {
  return allFieldNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = allFieldNotes.find((n) => n.slug === slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.place
      ? `Field note from ${note.place} — Borderless Kitchen.`
      : "A field note from the Borderless Kitchen series.",
  };
}

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sorted = [...allFieldNotes].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
  const idx = sorted.findIndex((n) => n.slug === slug);
  if (idx === -1) notFound();

  const note = sorted[idx];
  const prev = sorted[idx + 1] ?? null;
  const next = sorted[idx - 1] ?? null;

  const formattedDate = new Date(note.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="py-20 md:py-28">
      <Container>
        <nav aria-label="Breadcrumb" className="max-w-prose mx-auto mb-10">
          <Link
            href="/notes"
            className="font-ui text-eyebrow uppercase text-ink/40 hover:text-vermillion transition-colors duration-300"
          >
            ← Field Notes
          </Link>
        </nav>

        <header className="max-w-prose mx-auto mb-10">
          <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">
            {formattedDate}
            {note.place ? ` · ${note.place}` : ""}
          </p>
          <h1 className="font-display text-display-2 text-ink leading-tight">
            {note.title}
          </h1>
        </header>

        <ProseLayout>
          <MDXContent code={note.body.code} />
        </ProseLayout>

        {note.pantryRefs && note.pantryRefs.length > 0 ? (
          <div className="max-w-prose mx-auto mt-14 pt-8 border-t border-hairline">
            <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4">
              From the pantry
            </p>
            <ul className="flex flex-wrap gap-3">
              {note.pantryRefs.map((ref) => (
                <li key={ref}>
                  <Link
                    href={`/culture/${ref}`}
                    className="font-ui text-eyebrow uppercase text-ink border border-hairline px-4 py-2 hover:border-vermillion hover:text-vermillion transition-colors duration-300"
                  >
                    {ref.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <nav
          aria-label="Previous and next notes"
          className="max-w-prose mx-auto mt-14 pt-8 border-t border-hairline grid grid-cols-2 gap-8"
        >
          {prev ? (
            <div>
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">
                Previous
              </p>
              <Link
                href={`/notes/${prev.slug}`}
                className="font-display text-lg text-ink hover:text-vermillion transition-colors duration-300"
              >
                ← {prev.title}
              </Link>
            </div>
          ) : (
            <div />
          )}
          {next ? (
            <div className="text-right">
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-2">
                Next
              </p>
              <Link
                href={`/notes/${next.slug}`}
                className="font-display text-lg text-ink hover:text-vermillion transition-colors duration-300"
              >
                {next.title} →
              </Link>
            </div>
          ) : null}
        </nav>
      </Container>
    </article>
  );
}
