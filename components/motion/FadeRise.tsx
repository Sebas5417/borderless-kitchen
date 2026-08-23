"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Trigger only when in viewport. Defaults to true. */
  inView?: boolean;
};

/**
 * The single motion primitive. Fade + small upward translation,
 * triggered once on viewport entry. Honors prefers-reduced-motion.
 */
export function FadeRise({
  children,
  delay = 0,
  className,
  inView = true,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const initial = { opacity: 0, y: 12 };
  const animate = { opacity: 1, y: 0 };
  const transition = {
    duration: 0.7,
    delay,
    ease: [0.22, 0.61, 0.36, 1] as const,
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      {...(inView
        ? {
            whileInView: animate,
            viewport: { once: true, margin: "-10% 0px -10% 0px" },
          }
        : { animate })}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
