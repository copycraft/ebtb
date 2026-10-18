"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `.in` to every `[data-reveal]` element as it scrolls into view.
 * Re-runs on every route change, since client navigation mounts new `[data-reveal]` nodes.
 * Renders nothing — the styles live in app/globals.css.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = () => Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes().forEach((n) => n.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    nodes().forEach((n) => io.observe(n));

    // Client components (e.g. the recipe filter) can add reveal nodes after this effect.
    const mo = new MutationObserver(() => nodes().forEach((n) => io.observe(n)));
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
