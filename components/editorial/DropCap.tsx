type Props = {
  children: string;
};

/**
 * Renders first letter as a large editorial drop cap.
 * Pass only the opening paragraph text.
 */
export function DropCap({ children }: Props) {
  const first = children.charAt(0);
  const rest = children.slice(1);

  return (
    <p className="mb-7 font-body text-lg text-ink/90 leading-relaxed">
      <span
        className="float-left font-display text-[5.5rem] leading-[0.8] text-ink mr-3 mt-1 select-none"
        aria-hidden="true"
      >
        {first}
      </span>
      <span aria-label={children}>{first}{rest}</span>
    </p>
  );
}
