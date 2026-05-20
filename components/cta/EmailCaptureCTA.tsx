type Props = {
  heading?: string;
  body?: string;
  cta?: string;
};

export function EmailCaptureCTA({
  heading = "Get the free starter guide.",
  body = "Five pantry ingredients. Three techniques. Everything you need to cook across borders.",
  cta = "free.borderlesskitchenseries.com →",
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
            <a
              href="https://free.borderlesskitchenseries.com"
              className="inline-flex items-center font-ui text-eyebrow uppercase text-paper border-b border-paper/40 pb-1 hover:text-vermillion hover:border-vermillion transition-colors duration-300"
            >
              {cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
