"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "./products";

/**
 * Client-side bag. It only lives until checkout — WooCommerce owns the real cart — so a per-browser
 * localStorage copy is enough to survive reloads. Every storage access is guarded: it can throw or be empty.
 * The provider also carries the catalog (fetched from WooCommerce by the root layout) for client components.
 */
const STORAGE_KEY = "ebtb-cart-v1";

interface StoredLine {
  slug: string;
  qty: number;
}

export interface CartLineItem {
  product: Product;
  qty: number;
}

export interface CartNotice {
  id: number;
  title: string;
  body: string;
}

interface CartContextValue {
  /** The whole catalog, in shop order. */
  products: Product[];
  lines: CartLineItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  notice: CartNotice | null;
  dismissNotice: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStored(known: Map<string, Product>): StoredLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    // Lines for products no longer in the shop (deleted or unpublished in WooCommerce) are dropped.
    return Array.isArray(parsed)
      ? parsed.filter((l): l is StoredLine => typeof l?.slug === "string" && Number.isInteger(l?.qty) && l.qty > 0 && known.has(l.slug))
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ products, children }: { products: Product[]; children: ReactNode }) {
  const bySlug = useMemo(() => new Map(products.map((p) => [p.slug, p])), [products]);
  const [stored, setStored] = useState<StoredLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState<CartNotice | null>(null);

  useEffect(() => {
    // WooCommerce's thank-you page links back with ?rendeles=kesz once the order is placed;
    // the checkout's "back to the bag" links use ?kosar=nyit.
    const params = new URLSearchParams(window.location.search);
    const done = params.get("rendeles") === "kesz";
    setStored(done ? [] : readStored(bySlug));
    setHydrated(true);
    if (done) setNotice({ id: Date.now(), title: "Megrendelve", body: "Köszönjük. Két munkanapon belül feladjuk." });
    if (params.get("kosar") === "nyit") setOpen(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* storage blocked — the cart still works for this page view */
    }
  }, [stored, hydrated]);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 3200);
    return () => window.clearTimeout(t);
  }, [notice]);

  const add = useCallback((slug: string, qty = 1) => {
    const product = bySlug.get(slug);
    if (!product) return;
    setStored((prev) => {
      const hit = prev.find((l) => l.slug === slug);
      return hit ? prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) : [...prev, { slug, qty }];
    });
    setNotice({ id: Date.now(), title: "A kosárban", body: `${product.name} ×${qty} hozzáadva.` });
  }, [bySlug]);

  const setQty = useCallback((slug: string, qty: number) => {
    setStored((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty } : l)));
  }, []);

  const remove = useCallback((slug: string) => {
    setStored((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines = stored.flatMap((l) => {
      const product = bySlug.get(l.slug);
      return product ? [{ product, qty: l.qty }] : [];
    });
    return {
      products,
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      notice,
      dismissNotice: () => setNotice(null),
    };
  }, [products, bySlug, stored, open, add, setQty, remove, notice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
