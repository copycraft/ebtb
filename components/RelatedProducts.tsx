"use client";

import { useCart } from "@/lib/cart";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { formatHuf } from "@/lib/format";
import { ProductCard, SectionHeading } from "./ds";

/** "Ezeket is szórd" — the rest of the range, under a product page or recipe. */
export function RelatedProducts({
  exclude,
  eyebrow = "Ehhez is jó",
  title = "Ezeket is szórd",
}: {
  exclude?: string;
  eyebrow?: string;
  title?: string;
}) {
  const { products, add } = useCart();
  const items = products.filter((p) => p.slug !== exclude);

  return (
    <section
      aria-label={title}
      style={{
        padding: "var(--section-y) var(--gutter-inline)",
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
      }}
    >
      <div data-reveal>
        <SectionHeading align="left" size="sm" eyebrow={eyebrow} title={title} />
      </div>
      <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "var(--grid-gap)" }}>
        {items.map((p) => (
          <StaggerItem key={p.slug}>
            <div className="ebtb-hover-tile" style={{ height: "100%" }}>
              <ProductCard
                name={p.name}
                price={formatHuf(p.price)}
                claim={p.claim}
                tone={p.tone}
                image={p.images[0]?.src}
                specs={[p.weight]}
                href={`/termekek/${p.slug}`}
                cta="Kosárba"
                onAdd={() => add(p.slug)}
              />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
