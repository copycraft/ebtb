"use client";

import { AnimatePresence, m } from "motion/react";
import { useCart } from "@/lib/cart";
import { checkoutUrl } from "@/lib/checkout";
import { formatHuf } from "@/lib/format";
import { site } from "@/lib/site";
import { Drawer } from "./Drawer";
import { AnimatedNumber } from "./motion/AnimatedNumber";
import { Button, CartLine, PriceTag, Toast } from "./ds";

/** The bag. Checkout leaves the site: the lines are handed to WooCommerce in one URL. */
export function CartDrawer() {
  const { lines, total, open, setOpen, setQty, remove } = useCart();
  const href = checkoutUrl(lines);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      title="A kosarad"
      footer={
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="ebtb-label">Részösszeg</span>
            <PriceTag price={<AnimatedNumber value={total} format={formatHuf} />} size="md" />
          </div>
          {href ? (
            <Button fullWidth size="lg" as="a" href={href}>
              Tovább a pénztárhoz
            </Button>
          ) : (
            <Button fullWidth size="lg" disabled>
              Tovább a pénztárhoz
            </Button>
          )}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", color: "var(--text-muted)", textAlign: "center" }}>
            {lines.length > 0 && !href
              ? "A pénztár hamarosan nyílik"
              : `Ingyenes szállítás ${formatHuf(site.freeShippingHuf)}-tól`}
          </span>
        </>
      }
    >
      {lines.length === 0 ? (
        <p style={{ padding: "var(--space-6) 0", color: "var(--text-muted)" }}>Még üres. Gyanús.</p>
      ) : (
        <>
          <AnimatePresence initial={false}>
            {lines.map((l) => (
              <m.div
                key={l.product.slug}
                layout
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40, transition: { duration: 0.16 } }}
                transition={{ duration: 0.22, ease: [0.2, 0.9, 0.25, 1] }}
              >
                <CartLine
                  name={l.product.name}
                  variant={l.product.weight}
                  image={l.product.images[0]?.thumb}
                  price={formatHuf(l.product.price * l.qty)}
                  qty={l.qty}
                  onQty={(n) => setQty(l.product.slug, n)}
                  onRemove={() => remove(l.product.slug)}
                />
              </m.div>
            ))}
          </AnimatePresence>
          <m.div layout style={{ margin: "var(--space-5) 0" }}>
            <ShippingMeter total={total} />
          </m.div>
        </>
      )}
    </Drawer>
  );
}

/**
 * Progress toward free shipping. The bar grows with transform: scaleX (no width animation → no layout work).
 */
function ShippingMeter({ total }: { total: number }) {
  const goal = site.freeShippingHuf;
  const left = goal - total;
  const done = left <= 0;
  return (
    <Toast tone={done ? "success" : "info"} title={done ? "Ingyenes szállítás" : "Majdnem ingyenes a szállítás"} style={{ maxWidth: "none" }}>
      <span style={{ display: "block", marginBottom: 10 }}>
        {done ? "Ezt a csomagot mi álljuk." : `Még ${formatHuf(left)}, és nem fizetsz szállítást.`}
      </span>
      <span
        role="progressbar"
        aria-label="Az ingyenes szállításig"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={Math.min(total, goal)}
        style={{
          display: "block",
          height: 12,
          borderRadius: "var(--radius-pill)",
          border: "var(--border-2) solid var(--border-strong)",
          background: "var(--surface-card)",
          overflow: "hidden",
        }}
      >
        <m.span
          initial={false}
          animate={{ scaleX: Math.min(1, total / goal) }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          style={{ display: "block", height: "100%", background: done ? "var(--surface-scallion)" : "var(--action-primary)", transformOrigin: "0 50%" }}
        />
      </span>
    </Toast>
  );
}
