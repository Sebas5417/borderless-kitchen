import { aspectMeta } from "@/lib/aspect";
import type { AspectToken } from "@/lib/tokens";
import { color } from "@/lib/tokens";

type Props = {
  aspect: AspectToken;
  slot?: string;
  alt?: string;
  className?: string;
};

/**
 * Pure-SVG placeholder.
 * Charcoal-to-black radial gradient with a small, muted vermillion dot
 * at the optical center. No external assets; no network. Named by slot
 * for debugging in the DOM.
 */
export function PlaceholderImage({
  aspect,
  slot,
  alt = "",
  className,
}: Props) {
  const { viewBox } = aspectMeta[aspect];
  const cx = viewBox.w / 2;
  const cy = viewBox.h / 2;
  // Dot is ~1.2% of the smaller side. Quiet, centered, not loud.
  const dotR = Math.min(viewBox.w, viewBox.h) * 0.012;
  const gradientId = `bk-grad-${aspect}`;

  return (
    <svg
      role={alt ? "img" : "presentation"}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      data-slot={slot}
      viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient
          id={gradientId}
          cx="50%"
          cy="50%"
          r="75%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor={color.ink} />
          <stop offset="100%" stopColor={color.charcoalDeep} />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
      <circle
        cx={cx}
        cy={cy}
        r={dotR}
        fill={color.vermillion}
        opacity={0.35}
      />
    </svg>
  );
}
