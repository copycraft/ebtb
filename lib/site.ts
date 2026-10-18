/**
 * Page-level switches. These were editor props on the original .dc.html
 * (`shopHref`, `showWaitlist`, `animate`) — as a Next.js app they are build config.
 */
export const site = {
  /** Public origin, used for canonical URLs, Open Graph and the sitemap. Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  name: "EBTB",
  tagline: "Minden, csak a bagel nem",
  /** Render the newsletter / waitlist band. */
  showWaitlist: true,
  /** Master switch for scroll reveals and the progress bar. */
  animate: true,
  /**
   * WooCommerce store origin (no trailing slash). The cart drawer's checkout button hands the cart
   * over to `${wooBaseUrl}/?ebtb_cart=…` — see docs/woocommerce-handoff.md. Empty = checkout disabled.
   */
  wooBaseUrl: (process.env.NEXT_PUBLIC_WOO_URL || "").replace(/\/$/, ""),
  /** eMAG storefront. Empty = the eMAG button is hidden. */
  emagHref: process.env.NEXT_PUBLIC_EMAG_URL || "",
  /** Orders at or above this total ship free (matches the top ticker). */
  freeShippingHuf: 15000,
  social: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },
} as const;
