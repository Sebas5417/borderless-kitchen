import Link from "next/link";

type Props = {
  heading?: string;
  body?: string;
  cta?: string;
  href?: string;
};

export function EmailCaptureCTA({
  heading = "Get the free Flavor Pairing Matrix.",
  body = "The Italian × Japanese ingredient chart behind every recipe in the book. Enter your email — free PDF, one page.",
  cta = "Get it free →",
  href = "/free",
}: Props) {
  return (
    <section className="bg-ink text-paper py-16 md:py-20">
      <div className="mx-auto px-6 md:px-10 max-w-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <p className="font-ui text-eyebrow uppercase text-paper/50 mb-3">
              Free download
            </p>
            <h2 className="font-display text-display-3 text-paper leading-tight">
              {heading}
            </h2>
            <p className="font-body text-base text-paper/70 mt-4 max-w-prose">
              {body}
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Link
              href={href}
              className="inline-flex items-center font-ui text-eyebrow uppercase text-paper border-b border-paper/40 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
