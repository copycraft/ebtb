"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "@/lib/recipes";
import { RecipeCard } from "./RecipeCard";
import { IconButton } from "./ds";

/**
 * Side-scrolling recipe row. Native horizontal scroll with snap points — swipe on touch,
 * shift+wheel / trackpad / arrow keys on desktop — plus prev/next buttons that page by one viewport.
 */
export function RecipeCarousel({ recipes, label }: { recipes: Recipe[]; label?: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "0 var(--gutter-inline)" }}>
        <div style={{ flex: 1, minWidth: 0 }}>{label}</div>
        <IconButton name="arrow-left" label="Előző receptek" onClick={() => page(-1)} disabled={edge.start} style={{ opacity: edge.start ? 0.4 : 1 }} />
        <IconButton name="arrow-right" label="Következő receptek" onClick={() => page(1)} disabled={edge.end} style={{ opacity: edge.end ? 0.4 : 1 }} />
      </div>
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Receptek, vízszintesen görgethető"
        className="ebtb-carousel"
        style={{
          listStyle: "none",
          margin: 0,
          display: "flex",
          gap: "var(--grid-gap)",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollPaddingInline: "var(--gutter-inline)",
          padding: "4px var(--gutter-inline) 18px",
        }}
      >
        {recipes.map((r) => (
          <li key={r.slug} style={{ flex: "0 0 clamp(260px, 78vw, 320px)", scrollSnapAlign: "start" }}>
            <RecipeCard recipe={r} />
          </li>
        ))}
      </ul>
    </div>
  );
}
