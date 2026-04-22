import { type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Use the full editorial max-width (78rem). Defaults to true. */
  wide?: boolean;
};

export function Container({
  className,
  wide = true,
  children,
  ...rest
}: Props) {
  const maxW = wide ? "max-w-editorial" : "max-w-prose";
  return (
    <div
      className={`mx-auto px-6 md:px-10 ${maxW} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
