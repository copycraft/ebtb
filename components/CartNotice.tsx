"use client";

import { AnimatePresence, m } from "motion/react";
import { useCart } from "@/lib/cart";
import { Toast } from "./ds";

/** Bottom-right confirmation after "Kosárba". The live region stays mounted so screen readers hear it. */
export function CartNotice() {
  const { notice, dismissNotice, open } = useCart();
  return (
    <div aria-live="polite" style={{ position: "fixed", right: "var(--gutter-inline)", bottom: 24, zIndex: 65, pointerEvents: "none" }}>
      <AnimatePresence>
        {notice && !open ? (
          <m.div
            key={notice.id}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 500, damping: 28 } }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.16 } }}
            style={{ pointerEvents: "auto" }}
          >
            <Toast title={notice.title} onClose={dismissNotice} style={{ minWidth: 260 }}>
              {notice.body}
            </Toast>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
