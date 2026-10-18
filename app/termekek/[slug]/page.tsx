import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductBuy } from "@/components/ProductBuy";
import { RelatedProducts } from "@/components/RelatedProducts";
import { Badge, Marquee, Photo, PriceTag, SpecStrip } from "@/components/ds";
import { getProduct, getProducts } from "@/lib/products";
import { formatHuf } from "@/lib/format";
import { site } from "@/lib/site";

const PANEL: Record<string, string> = {
  blaze: "var(--surface-blaze)",
  garlic: "var(--surface-garlic)",
  onion: "var(--surface-onion)",
  scallion: "var(--surface-scallion)",
  cream: "var(--sesame-300)",
};

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/termekek/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.claim} ${product.description}`,
    alternates: { canonical: `/termekek/${product.slug}` },
    openGraph: {
      title: `${product.name} — EBTB`,
      description: product.description,
      url: `/termekek/${product.slug}`,
      images: product.images[0] ? [{ url: product.images[0].src, width: product.images[0].width, height: product.images[0].height }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/termekek/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [cover, ...gallery] = product.images;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          brand: { "@type": "Brand", name: "EBTB" },
          weight: product.weight,
          image: product.images.map((i) => i.src),
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "HUF",
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${site.url}/termekek/${product.slug}`,
          },
        }}
      />
      <section
        aria-label={product.name}
        style={{
          padding: "clamp(28px,4vw,56px) var(--gutter-inline) var(--section-y)",
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "clamp(28px,4vw,56px)",
          alignItems: "start",
        }}
      >
        <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <div
            style={{
              position: "relative",
              background: PANEL[product.tone],
              borderRadius: "var(--radius-xl)",
              border: "var(--border-2) solid var(--border-strong)",
              padding: "clamp(24px,4vw,48px)",
            }}
          >
            <span style={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}>
              <Badge tone="paper" rotate={-5}>
                {product.badge ?? "0 bagel"}
              </Badge>
            </span>
            <Photo shape="circle" ratio="1 / 1" src={cover?.src} alt={cover?.alt} label={product.name} />
          </div>
          {gallery.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-3)" }}>
              {gallery.slice(0, 3).map((img) => (
                <Photo key={img.src} shape="rounded" ratio="1 / 1" src={img.thumb} alt={img.alt} />
              ))}
            </div>
          ) : null}
        </div>

        <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <nav aria-label="Morzsa" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", letterSpacing: ".12em", textTransform: "uppercase" }}>
            <Link href="/bolt" style={{ color: "var(--text-link)" }}>
              Bolt
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{product.name}</span>
          </nav>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--type-display-md)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
            }}
          >
            {product.name}
          </h1>
          <PriceTag price={formatHuf(product.price)} size="lg" />
          <p style={{ margin: 0, fontSize: "var(--type-body-lg)", lineHeight: 1.5, maxWidth: "46ch" }}>{product.description}</p>
          <SpecStrip align="left" items={product.facts} />
          <ProductBuy product={product} />
        </div>
      </section>

      <Marquee items={["Szórd rá", "Töltsd újra, ne vegyél újat", "Kis tétel, nagy szórás"]} tone="onion" speed={30} />

      <RelatedProducts exclude={product.slug} />
    </>
  );
}
