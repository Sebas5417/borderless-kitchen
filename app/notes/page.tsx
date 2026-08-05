import type { Metadata } from "next";
import Link from "next/link";
import { allFieldNotes } from "contentlayer/generated";
import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";
import { PageHero } from "@/components/editorial/PageHero";

export const metadata: Metadata = {
  alternates: { canonical: "/notes" },
  title: "Field Notes",
  description:
    "Short fragments from the road and the counter — smells, knife marks, restaurants without names, ingredients in motion.",
};

export default function NotesPage() {
  const notes = [...allFieldNotes].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );

  return (
    <>
      <PageHero
        eyebrow="Field Notes"
        headline="Fragments from the road and the counter."
        dek="Shorter than essays. Sometimes a paragraph. Always something small that turned out to be worth writing down."
        src="/images/banner-notes.png"
        alt="Editorial banner — Borderless Kitchen field notes."
      />

      <section className="py-16 md:py-24">
        <Container>
          <FadeRise>
            <ul className="max-w-2xl mx-auto divide-y divide-hairline">
              {notes.map((note) => {
                const formatted = new Date(note.date).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" },
                );
                return (
                  <li key={note.slug} className="py-8 first:pt-0 last:pb-0">
                    <Link href={`/notes/${note.slug}`} className="group block">
                      <p className="font-ui text-eyebrow uppercase text-ink/40 mb-3">
                        {formatted}
                        {note.place ? ` · ${note.place}` : ""}
                      </p>
                      <h2 className="font-display text-2xl md:text-3xl text-ink leading-tight group-hover:text-vermillion transition-colors duration-300">
                        {note.title}
                      </h2>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}
