"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { formatHuf } from "@/lib/format";
import { site } from "@/lib/site";
import { Button, Card, Icon, QuantityStepper, Tabs } from "./ds";

const TABS = ["Összetevők", "Mire jó", "Szállítás"] as const;

/** The interactive half of the product page: quantity, add to bag, info tabs. */
export function ProductBuy({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<string>(TABS[0]);

  const copy: Record<string, string> = {
    Összetevők: product.ingredients,
    "Mire jó":
      "Rántotta, avokádós pirítós, túró, sült zöldség, sült krumpli, uborkasaláta, popcorn. A főzés végén szórd rá, hogy a szezám ropogós maradjon.",
    Szállítás: `Két munkanapon belül feladjuk. ${formatHuf(site.freeShippingHuf)} felett ingyenes, alatta egységes díj. Jelenleg csak Magyarországra szállítunk.`,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", flexWrap: "wrap" }}>
        <QuantityStepper value={qty} onChange={setQty} label={`Mennyiség — ${product.name}`} />
        <Button size="lg" style={{ flex: "1 1 200px" }} onClick={() => add(product.slug, qty)}>
          Kosárba
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "var(--space-4)",
          flexWrap: "wrap",
          alignItems: "center",
          color: "var(--text-muted)",
          fontSize: "var(--type-body-sm)",
        }}
      >
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <Icon name="truck" size={16} />
          {`Ingyenes ${formatHuf(site.freeShippingHuf)}-tól`}
        </span>
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <Icon name="refresh-cw" size={16} />
          Utántöltő is van
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
        <Tabs items={[...TABS]} value={tab} onChange={setTab} idBase="termek-info" aria-label="Termékinformáció" />
        <Card
          tone="cream"
          padding="var(--space-5)"
          shadow={false}
          role="tabpanel"
          id="termek-info-panel"
          aria-labelledby={`termek-info-tab-${TABS.indexOf(tab as (typeof TABS)[number])}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.p
              key={tab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: [0.2, 0.9, 0.25, 1] }}
              style={{ margin: 0, fontSize: "var(--type-body-md)", lineHeight: 1.55 }}
            >
              {copy[tab]}
            </m.p>
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
