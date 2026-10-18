import Link from "next/link";
import type { Recipe } from "@/lib/recipes";
import { Badge, Card, Photo } from "./ds";

/** Recipe tile: photo, category sticker, title, mono time/serving facts. The whole card is the link. */
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/receptek/${recipe.slug}`} className="ebtb-recipe-card" style={{ color: "inherit", display: "block", height: "100%" }}>
      <Card padding={0} lift style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative", borderBottom: "var(--border-2) solid var(--border-strong)" }}>
          <Photo shape="square" ratio="4 / 3" label={recipe.shot} style={{ border: "none" }} />
          <span style={{ position: "absolute", top: 12, left: 12 }}>
            <Badge tone="garlic" size="sm" rotate={-4}>
              {recipe.category}
            </Badge>
          </span>
        </div>
        <div style={{ padding: "var(--space-4) var(--space-5) var(--space-5)", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-headline)",
              fontWeight: "var(--weight-black)",
              textTransform: "uppercase",
              letterSpacing: ".02em",
              fontSize: 18,
              lineHeight: 1.2,
            }}
          >
            {recipe.title}
          </h3>
          <p style={{ margin: 0, fontSize: "var(--type-body-sm)", lineHeight: 1.5, flex: 1 }}>{recipe.intro}</p>
          <p
            style={{
              margin: 0,
              paddingTop: 10,
              borderTop: "var(--border-1) solid var(--border-soft)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label-sm)",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--poppy-700)",
            }}
          >
            {`${recipe.minutes} perc — ${recipe.serves} adag`}
          </p>
        </div>
      </Card>
    </Link>
  );
}
