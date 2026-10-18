import type { Product } from "./products";
import { site } from "./site";

export interface CheckoutLine {
  product: Product;
  qty: number;
}

/**
 * The WooCommerce handoff URL: `${wooBaseUrl}/?ebtb_cart=12:2,15:1`.
 * The store side (docs/woocommerce-handoff.md) empties its cart, adds these IDs and redirects to checkout.
 * Returns null while the store URL is missing or the bag is empty.
 */
export function checkoutUrl(lines: CheckoutLine[]) {
  if (!site.wooBaseUrl || lines.length === 0) return null;
  const cart = lines.map((l) => `${l.product.wooId}:${l.qty}`).join(",");
  return `${site.wooBaseUrl}/?ebtb_cart=${encodeURIComponent(cart)}`;
}
