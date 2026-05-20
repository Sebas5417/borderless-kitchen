type Props = {
  children: React.ReactNode;
  attribution?: string;
};

export function PullQuote({ children, attribution }: Props) {
  return (
    <blockquote className="my-16 md:my-20 border-l-2 border-vermillion pl-8 md:pl-12">
      <p className="font-display italic text-display-3 text-ink leading-tight">
        {children}
      </p>
      {attribution ? (
        <footer className="mt-4 font-ui text-eyebrow uppercase text-ink/50">
          {attribution}
        </footer>
      ) : null}
    </blockquote>
  );
}
