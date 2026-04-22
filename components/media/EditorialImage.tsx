import Image from "next/image";
import { aspectMeta } from "@/lib/aspect";
import type { AspectToken } from "@/lib/tokens";
import { PlaceholderImage } from "./PlaceholderImage";

type Props = {
  alt: string;
  aspect: AspectToken;
  /** Slot label for placeholder debug + future asset routing. */
  slot?: string;
  /** Asset path. Null/undefined → render placeholder. */
  src?: string | null;
  /** LCP image flag. */
  priority?: boolean;
  /** Sizes attribute for next/image. */
  sizes?: string;
  className?: string;
};

/**
 * The single image primitive. Always renders inside an aspect-ratio
 * box. When `src` is null/undefined, falls through to PlaceholderImage —
 * which is the v1 default while real photography is sourced.
 */
export function EditorialImage({
  alt,
  aspect,
  slot,
  src,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: Props) {
  const { css } = aspectMeta[aspect];

  return (
    <div
      className={`relative overflow-hidden bg-charcoal-deep ${className ?? ""}`}
      style={{ aspectRatio: css }}
      data-slot={slot}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <PlaceholderImage aspect={aspect} slot={slot} alt={alt} />
      )}
    </div>
  );
}
