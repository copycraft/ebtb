import { cache } from "react";
import type { ProductTone } from "@/components/ds";
import { site } from "./site";

/**
 * The catalog lives in WooCommerce (Paymenthandling/mu-plugins/ebtb-products.php serves it).
 * Fetches are cached under PRODUCTS_TAG: WordPress pings /api/revalidate on every product save,
 * and the 5-minute revalidate is the fallback if a ping is missed.
 */
export const PRODUCTS_TAG = "products";

/** Server-side origin of the store. WOO_API_URL overrides it when the server reaches WP on a private address. */
const apiBase = (process.env.WOO_API_URL || site.wooBaseUrl).replace(/\/$/, "");

export interface ProductImage {
  src: string;
  width: number;
  height: number;
  /** Square crop for small slots (cart line). */
  thumb: string;
  alt: string;
}

export interface Product {
  /** WooCommerce product ID — the checkout handoff uses it. */
  wooId: number;
  slug: string;
  name: string;
  /** Gross price in HUF. */
  price: number;
  inStock: boolean;
  claim: string;
  badge?: string;
  tone: ProductTone;
  /** Pack size label, e.g. "65 g". */
  weight: string;
  /** Product-page lead paragraph (Woo short description). */
  description: string;
  ingredients: string;
  /** Mono facts under the price on the product page. */
  facts: string[];
  /** Product image first, then the gallery. Empty until photos are uploaded — the pages show placeholders. */
  images: ProductImage[];
}

interface WooProduct extends Omit<Product, "wooId" | "badge"> {
  id: number;
  badge: string | null;
}

const TONES: ProductTone[] = ["blaze", "garlic", "onion", "scallion", "cream"];

export const getProducts = cache(async (): Promise<Product[]> => {
  if (!apiBase) {
    throw new Error("NEXT_PUBLIC_WOO_URL is not set — products come from WooCommerce. See Paymenthandling/README.md.");
  }
  const res = await fetch(`${apiBase}/wp-json/ebtb/v1/products`, { next: { revalidate: 300, tags: [PRODUCTS_TAG] } });
  if (!res.ok) throw new Error(`WooCommerce products: ${res.status} ${res.statusText} (${apiBase})`);
  const raw = (await res.json()) as WooProduct[];
  return raw.map(({ id, badge, tone, ...p }) => ({
    ...p,
    wooId: id,
    badge: badge ?? undefined,
    tone: TONES.includes(tone) ? tone : "blaze",
  }));
});

export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}
