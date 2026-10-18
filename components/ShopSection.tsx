"use client";

import { useCart } from "@/lib/cart";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { formatHuf } from "@/lib/format";
import { site } from "@/lib/site";
import { Button, ProductCard } from "./ds";

/**
 * Product grid. "Kosárba" adds to the bag; the name and jar open the product page.
 * `limit` + `moreHref` make the short home-page version with a link to the full shop.
 */
export function ShopSection({ limit, moreHref }: { limit?: number; moreHref?: string }) {
  const { products, add, setOpen, count } = useCart();
  const items = limit ? products.slice(0, limit) : products;

  return (
    <>
      <StaggerGroup
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "var(--grid-gap)",
        }}
      >
        {items.map((p) => (
          <StaggerItem key={p.slug}>
            <div className="ebtb-hover-tile" style={{ height: "100%" }}>
              <ProductCard
                name={p.name}
                price={formatHuf(p.price)}
                claim={p.claim}
                badge={p.badge}
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
      <div data-reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
        {moreHref ? (
          <Button size="lg" variant="outline" as="a" href={moreHref}>
            {`Az egész bolt (${products.length})`}
          </Button>
        ) : null}
        <Button size="lg" variant="ink" onClick={() => setOpen(true)}>
          {count > 0 ? `Tovább a kosárhoz (${count})` : "Tovább a kosárhoz"}
        </Button>
        {site.emagHref ? (
          <Button size="lg" variant="outline" as="a" href={site.emagHref} target="_blank" rel="noopener">
            Az eMAG-on is
          </Button>
        ) : null}
      </div>
    </>
  );
}
