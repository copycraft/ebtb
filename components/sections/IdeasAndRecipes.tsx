import Link from "next/link";
import { uses } from "@/lib/content";
import { getRecipes } from "@/lib/recipes";
import { RecipeCarousel } from "../RecipeCarousel";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";
import { Button, Photo, SectionHeading } from "../ds";

const label = {
  margin: 0,
  fontFamily: "var(--font-mono)",
  fontSize: "var(--type-label-sm)",
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--poppy-800)",
} as const;

/**
 * Home page: the five starter ideas and the recipe side-scroller in one scallion band.
 * Each idea opens the recipe that shows it off; the full list lives on /receptek.
 */
export function IdeasAndRecipes() {
  return (
    <section
      id="receptek"
      aria-label="Mire szórd rá"
      style={{
        background: "var(--surface-scallion)",
        borderTop: "var(--border-2) solid var(--border-strong)",
        borderBottom: "var(--border-2) solid var(--border-strong)",
        padding: "var(--section-y) 0",
      }}
    >
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <div
          data-reveal
          style={{
            padding: "0 var(--gutter-inline)",
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <SectionHeading eyebrow="Öt ötlet kezdésnek" title="Mire szórd rá?" align="left">
            Kezdd ezekkel, aztán görgess tovább a receptekért — egyik sem bagel.
          </SectionHeading>
          <span className="ebtb-hover-cta">
            <Button size="md" variant="ink" as="a" href="/receptek">
              Összes recept
            </Button>
          </span>
        </div>

        <StaggerGroup
          as="ul"
          gap={0.07}
          style={{
            listStyle: "none",
            margin: 0,
            padding: "0 var(--gutter-inline)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: "var(--grid-gap)",
          }}
        >
          {uses.map((u, i) => (
            <StaggerItem as="li" key={u.title}>
              <Link href={`/receptek/${u.recipe}`} className="ebtb-hover-figure" style={{ display: "flex", flexDirection: "column", gap: 12, color: "inherit" }}>
                <Photo shape="rounded" ratio="1 / 1" label={u.shot} />
                <span style={{ ...label, color: "var(--poppy-700)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontWeight: "var(--weight-black)",
                    textTransform: "uppercase",
                    letterSpacing: ".02em",
                    fontSize: 16,
                    lineHeight: 1.2,
                  }}
                >
                  {u.title}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div data-reveal>
          <RecipeCarousel recipes={getRecipes().slice(0, 10)} label={<p style={label}>Friss receptek</p>} />
        </div>
      </div>
    </section>
  );
}
