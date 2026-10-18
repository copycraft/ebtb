"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Number that counts to its new value (Magic UI "NumberTicker" idea, without the dependency).
 * Writes straight to the DOM node, so counting doesn't re-render React. Reduced motion: jumps to the value.
 */
export function AnimatedNumber({ value, format = String, duration = 0.45 }: { value: number; format?: (n: number) => string; duration?: number }) {
  const node = useRef<HTMLSpanElement>(null);
  const from = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = node.current;
    if (!el) return;
    if (reduce || from.current === value) {
      el.textContent = format(value);
      from.current = value;
      return;
    }
    const controls = animate(from.current, value, {
      duration,
      ease: [0.2, 0.9, 0.25, 1],
      onUpdate: (n) => {
        el.textContent = format(Math.round(n));
      },
    });
    from.current = value;
    return () => controls.stop();
  }, [value, format, duration, reduce]);

  return <span ref={node}>{format(value)}</span>;
}
