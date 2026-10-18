"use client";

import { m, useReducedMotion } from "motion/react";
import type { HTMLMotionProps, Variants } from "motion/react";
import { reveal } from "./tokens";

/**
 * Staggered reveal for grids and lists: children fade + rise one after another.
 * `trigger="view"` waits until the group scrolls in (once, 80px early); `"mount"` plays on load (hero).
 *
 * Put hover classes (ebtb-hover-tile, …) on an element *inside* StaggerItem, not on it:
 * Motion leaves an inline `transform` on the item, which would override a CSS :hover transform.
 *
 * Reduced motion: items show in their final state — no fade, no rise. Enforced in globals.css via
 * [data-stagger-item], because useReducedMotion only knows the answer after hydration.
 */
const group = (gap: number): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: gap } },
});

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: reveal },
};

/**
 * Transform-only variant for above-the-fold content (hero): the element is painted from the first frame,
 * so it still counts for LCP and stays visible if JavaScript is slow or never runs.
 */
const rise: Variants = {
  hidden: { y: 14 },
  shown: { y: 0, transition: reveal },
};

type Tag = "div" | "ul";

interface StaggerGroupProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView"> {
  as?: Tag;
  trigger?: "view" | "mount";
  /** Seconds between children. */
  gap?: number;
  delay?: number;
}

export function StaggerGroup({ as = "div", trigger = "view", gap = 0.08, delay = 0, children, ...rest }: StaggerGroupProps) {
  const reduce = useReducedMotion();
  const Comp = as === "ul" ? m.ul : m.div;
  const variants = group(gap);
  if (delay) variants.shown = { transition: { staggerChildren: gap, delayChildren: delay } };

  const play =
    trigger === "mount"
      ? { animate: "shown" as const }
      : { whileInView: "shown" as const, viewport: { once: true, margin: "-80px" } };

  return (
    <Comp variants={variants} initial={reduce ? false : "hidden"} {...play} {...(rest as Record<string, unknown>)}>
      {children}
    </Comp>
  );
}

interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  as?: "div" | "li";
  /** false = slide only, no fade. Use above the fold. */
  fade?: boolean;
}

export function StaggerItem({ as = "div", fade = true, children, ...rest }: StaggerItemProps) {
  const Comp = as === "li" ? m.li : m.div;
  return (
    <Comp variants={fade ? item : rise} data-stagger-item="" {...(rest as Record<string, unknown>)}>
      {children}
    </Comp>
  );
}
