import type { Metadata, Viewport } from "next";
import { Archivo, Bagel_Fat_One, DM_Mono } from "next/font/google";
import { CartDrawer } from "@/components/CartDrawer";
import { CartNotice } from "@/components/CartNotice";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { Marquee } from "@/components/ds";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { CartProvider } from "@/lib/cart";
import { tickerItems } from "@/lib/content";
import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time: no render-blocking request to Google. latin-ext carries ő/ű.
const bagel = Bagel_Fat_One({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--ff-bagel", display: "swap" });
const archivo = Archivo({ subsets: ["latin", "latin-ext"], variable: "--ff-archivo", display: "swap" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin", "latin-ext"], variable: "--ff-dm-mono", display: "swap" });

const description =
  "Hat pirított összetevő egy tégelyben. Szórd rántottára, avokádóra, túróra, salátára — bármire, ami nem bagel.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "EBTB — Minden, csak a bagel nem",
    template: "%s — EBTB",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: "EBTB",
    title: "EBTB — Minden, csak a bagel nem",
    description,
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6ECD9",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getProducts();
  return (
    <html lang="hu" className={`${bagel.variable} ${archivo.variable} ${dmMono.variable}`}>
      <body className={site.animate ? "ebtb-animate" : undefined}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "EBTB",
            url: site.url,
            slogan: site.tagline,
            sameAs: [site.social.instagram, site.social.tiktok],
          }}
        />
        <a href="#tartalom" className="ebtb-skip-link">
          Ugrás a tartalomra
        </a>
        <MotionProvider>
        <CartProvider products={products}>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
            {site.animate ? <ScrollProgress /> : null}
            <Marquee items={tickerItems} tone="scallion" speed={32} />
            <SiteNav />
            <main id="tartalom" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {children}
            </main>
            <SiteFooter />
          </div>
          <CartDrawer />
          <CartNotice />
          <CookieBanner />
        </CartProvider>
        </MotionProvider>
        {site.animate ? <ScrollReveal /> : null}
      </body>
    </html>
  );
}
