type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  meta?: string;
};

export function Masthead({ eyebrow, title, subtitle, meta }: Props) {
  return (
    <div className="border-b border-hairline pb-12 md:pb-16 mb-12 md:mb-16">
      {eyebrow ? (
        <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-display-1 text-ink leading-tight max-w-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="font-display italic text-display-3 text-ink/60 mt-4 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      ) : null}
      {meta ? (
        <p className="font-ui text-eyebrow uppercase text-ink/40 mt-8">
          {meta}
        </p>
      ) : null}
    </div>
  );
}
