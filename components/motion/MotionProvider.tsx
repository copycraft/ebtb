"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";
import type { ReactNode } from "react";

/**
 * Root for every Motion animation on the site.
 * - LazyMotion + `m` components keep the bundle to the features we use (domMax: layout + gestures).
 *   `strict` makes a stray `motion.div` throw in development instead of silently pulling in the full bundle.
 * - reducedMotion="user": with the OS "reduce motion" setting on, transform and layout animations are skipped.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
