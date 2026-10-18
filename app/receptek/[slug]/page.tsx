import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { RecipeCard } from "@/components/RecipeCard";
import { RelatedProducts } from "@/components/RelatedProducts";
import { Badge, Button, Card, Photo, SectionHeading, SpecStrip } from "@/components/ds";
import { getProduct } from "@/lib/products";
import { getRecipe, getRecipes } from "@/lib/recipes";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getRecipes().map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/receptek/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};
  return {
    title: recipe.title,
    description: recipe.intro,
    alternates: { canonical: `/receptek/${recipe.slug}` },
    openGraph: { type: "article", title: `${recipe.title} — EBTB`, description: recipe.intro, url: `/receptek/${recipe.slug}` },
  };
}

const label = {
  margin: "0 0 14px",
  fontFamily: "var(--font-headline)",
  fontWeight: "var(--weight-black)",
  textTransform: "uppercase",
  letterSpacing: ".02em",
  fontSize: 19,
} as const;

export default async function RecipePage({ params }: PageProps<"/receptek/[slug]">) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();
  const product = await getProduct(recipe.product);
  const more = getRecipes()
    .filter((r) => r.slug !== recipe.slug)
    .sort((a, b) => Number(b.category === recipe.category) - Number(a.category === recipe.category))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: recipe.title,
          description: recipe.intro,
          recipeCategory: recipe.category,
          keywords: recipe.tags.join(", "),
          totalTime: `PT${recipe.minutes}M`,
          recipeYield: `${recipe.serves} adag`,
          recipeIngredient: recipe.ingredients,
          recipeInstructions: recipe.steps.map((text) => ({ "@type": "HowToStep", text })),
          datePublished: recipe.published,
          author: { "@type": "Organization", name: "EBTB", url: site.url },
        }}
      />
      <article style={{ display: "flex", flexDirection: "column" }}>
        <header
          style={{
            padding: "clamp(28px,4vw,56px) var(--gutter-inline)",
            maxWidth: "var(--page-max)",
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "clamp(28px,4vw,56px)",
            alignItems: "center",
          }}
        >
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <nav aria-label="Morzsa" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", letterSpacing: ".12em", textTransform: "uppercase" }}>
              <Link href="/receptek" style={{ color: "var(--text-link)" }}>
                Receptek
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href={`/receptek?kategoria=${encodeURIComponent(recipe.category)}`} style={{ color: "var(--text-link)" }}>
                {recipe.category}
              </Link>
            </nav>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "var(--type-display-md)",
                lineHeight: "var(--leading-display)",
                letterSpacing: "var(--tracking-display)",
              }}
            >
              {recipe.title}
            </h1>
            <p style={{ margin: 0, fontSize: "var(--type-body-lg)", lineHeight: 1.5, maxWidth: "46ch" }}>{recipe.intro}</p>
            <SpecStrip align="left" items={[`${recipe.minutes} PERC`, `${recipe.serves} ADAG`, ...recipe.tags.map((t) => t.toUpperCase())]} />
          </div>
          <div data-reveal style={{ position: "relative" }}>
            <Photo shape="arch" ratio="4 / 3" label={recipe.shot} />
            <span style={{ position: "absolute", bottom: -12, left: -10 }}>
              <Badge tone="blaze" rotate={-6}>
                0 bagel
              </Badge>
            </span>
          </div>
        </header>

        <div
          style={{
            background: "var(--surface-scallion)",
            borderTop: "var(--border-2) solid var(--border-strong)",
            borderBottom: "var(--border-2) solid var(--border-strong)",
            padding: "var(--section-y) var(--gutter-inline)",
          }}
        >
          <div
            style={{
              maxWidth: "var(--page-max)",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "var(--grid-gap)",
              alignItems: "start",
            }}
          >
            <div data-reveal>
              <Card tone="paper" padding={24}>
                <h2 style={label}>Hozzávalók</h2>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {recipe.ingredients.map((i) => (
                    <li key={i} style={{ padding: "10px 0", borderBottom: "1.5px solid #E8DBC1", fontSize: "var(--type-body-md)" }}>
                      {i}
                    </li>
                  ))}
                </ul>
                {product ? (
                  <div style={{ marginTop: 20 }}>
                    <Button as="a" href={`/termekek/${product.slug}`} size="sm" variant="ink">
                      {`${product.name} — megnézem`}
                    </Button>
                  </div>
                ) : null}
              </Card>
            </div>
            <div data-reveal>
              <Card tone="cream" padding={24}>
                <h2 style={label}>Így készül</h2>
                <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 18 }}>
                  {recipe.steps.map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                      <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", letterSpacing: ".14em", color: "var(--blaze-500)", flex: "0 0 auto" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: "var(--type-body-md)", lineHeight: 1.55 }}>{s}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </div>
        </div>
      </article>

      <section
        aria-label="További receptek"
        style={{ padding: "var(--section-y) var(--gutter-inline) 0", maxWidth: "var(--page-max)", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}
      >
        <div data-reveal>
          <SectionHeading align="left" size="sm" eyebrow="Még egy kör" title="További receptek" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "var(--grid-gap)" }}>
          {more.map((r) => (
            <div key={r.slug} data-reveal>
              <RecipeCard recipe={r} />
            </div>
          ))}
        </div>
      </section>

      <RelatedProducts eyebrow="Ehhez ezt szórtuk" title="Vidd haza a keveréket" />
    </>
  );
}
