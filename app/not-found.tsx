import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This border doesn't exist.",
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center">
      <Container>
        <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">404</p>
        <h1 className="font-display text-display-1 text-ink leading-tight max-w-2xl">
          You've crossed a border that doesn't exist here.
        </h1>
        <p className="font-body text-lg text-ink/60 mt-6 max-w-prose">
          The kitchens are real. This page, apparently, is not.
        </p>
        <div className="mt-12">
          <Link
            href="/"
            className="font-ui text-eyebrow uppercase text-ink border-b border-ink pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
          >
            Back to the kitchen →
          </Link>
        </div>
      </Container>
    </section>
  );
}
