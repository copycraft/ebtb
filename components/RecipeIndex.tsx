"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RECIPES_PER_PAGE, recipeCategories } from "@/lib/recipes";
import type { Recipe } from "@/lib/recipes";
import { RecipeCard } from "./RecipeCard";
import { Tag } from "./ds";

const ALL = "Mind";

/** Category filter + paging, both kept in the URL (?kategoria=Saláta&oldal=2) so results are linkable. */
export function RecipeIndex({ recipes }: { recipes: Recipe[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return <RecipeIndexView recipes={recipes} params={params} pathname={pathname} onNavigate={(to) => router.replace(to, { scroll: false })} />;
}

/**
 * Suspense fallback for the prerendered HTML: the unfiltered first page, same markup.
 * Without it the static page has no grid and the footer jumps down on hydration (CLS).
 */
export function RecipeIndexFallback({ recipes }: { recipes: Recipe[] }) {
  return <RecipeIndexView recipes={recipes} params={new URLSearchParams()} pathname="/receptek" onNavigate={() => {}} />;
}

interface ViewProps {
  recipes: Recipe[];
  params: Pick<URLSearchParams, "get">;
  pathname: string;
  onNavigate: (href: string) => void;
}

function RecipeIndexView({ recipes, params, pathname, onNavigate }: ViewProps) {
  const category = recipeCategories.find((c) => c === params.get("kategoria")) ?? ALL;
  const filtered = category === ALL ? recipes : recipes.filter((r) => r.category === category);
  const pages = Math.max(1, Math.ceil(filtered.length / RECIPES_PER_PAGE));
  const page = Math.min(pages, Math.max(1, Number(params.get("oldal")) || 1));
  const shown = filtered.slice((page - 1) * RECIPES_PER_PAGE, page * RECIPES_PER_PAGE);

  const href = (next: { kategoria?: string; oldal?: number }) => {
    const q = new URLSearchParams();
    const k = next.kategoria ?? category;
    if (k !== ALL) q.set("kategoria", k);
    if (next.oldal && next.oldal > 1) q.set("oldal", String(next.oldal));
    const s = q.toString();
    return s ? `${pathname}?${s}` : pathname;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div role="group" aria-label="Szűrés kategóriára" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {[ALL, ...recipeCategories].map((c) => (
          <Tag key={c} selected={c === category} onClick={() => onNavigate(href({ kategoria: c }))}>
            {c}
          </Tag>
        ))}
      </div>

      <p
        aria-live="polite"
        style={{
          margin: 0,
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label-sm)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
        }}
      >
        {`${filtered.length} recept`}
      </p>

      {shown.length > 0 ? (
        <m.ul
          layout
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: "var(--grid-gap)",
          }}
        >
          {/* popLayout: leaving cards are taken out of flow at once, so the rest slide into place together. */}
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((r, i) => (
              <m.li
                key={r.slug}
                layout
                data-stagger-item=""
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.9, 0.25, 1], delay: i * 0.04 } }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                transition={{ layout: { type: "spring", stiffness: 420, damping: 38 } }}
              >
                <RecipeCard recipe={r} />
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      ) : (
        <p style={{ color: "var(--text-muted)" }}>Ebben a kategóriában még nincs recept. Gyanús.</p>
      )}

      {pages > 1 ? (
        <nav aria-label="Lapozás" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={href({ oldal: n })}
              scroll={false}
              aria-current={n === page ? "page" : undefined}
              aria-label={`${n}. oldal`}
              className="ebtb-nav-link"
              style={{
                minWidth: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                borderRadius: "var(--radius-pill)",
                border: "var(--border-2) solid var(--border-strong)",
                fontFamily: "var(--font-mono)",
                background: n === page ? "var(--surface-ink)" : "var(--surface-card)",
                color: n === page ? "var(--text-on-ink)" : "var(--poppy-800)",
              }}
            >
              {n}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
