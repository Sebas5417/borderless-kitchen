type Props = {
  className?: string;
};

export function RedRule({ className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`red-rule block ${className ?? ""}`}
    />
  );
}
