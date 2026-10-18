import type { Metadata } from "next";
import { Suspense } from "react";
import { RecipeIndex, RecipeIndexFallback } from "@/components/RecipeIndex";
import { SectionHeading } from "@/components/ds";
import { getRecipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Receptek",
  description: "Rántotta, saláta, sült zöldség, túró — egyszerű receptek, amikre ráfér egy szórás EBTB.",
  alternates: { canonical: "/receptek" },
};

export default function RecipesPage() {
  const recipes = getRecipes();
  return (
    <section
      aria-label="Receptek"
      style={{
        padding: "clamp(32px,5vw,72px) var(--gutter-inline) var(--section-y)",
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
      }}
    >
      <div data-reveal>
        <SectionHeading eyebrow="Receptek" title="Mire szórtuk ma?" align="left">
          Egyszerű ételek, amiken a keverék a főszereplő. Egyik sem bagel.
        </SectionHeading>
      </div>
      {/* useSearchParams needs a Suspense boundary to keep this page static; the fallback is the unfiltered list. */}
      <Suspense fallback={<RecipeIndexFallback recipes={recipes} />}>
        <RecipeIndex recipes={recipes} />
      </Suspense>
    </section>
  );
}
