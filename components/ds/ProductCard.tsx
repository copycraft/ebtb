"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { Photo } from "./Photo";

export type ProductTone = "blaze" | "garlic" | "onion" | "scallion" | "cream";

const MEDIA: Record<ProductTone, string> = {
  blaze: "var(--surface-blaze)",
  garlic: "var(--surface-garlic)",
  onion: "var(--surface-onion)",
  scallion: "var(--surface-scallion)",
  cream: "var(--sesame-300)",
};

export interface ProductCardProps {
  name: string;
  price: string;
  claim?: string;
  badge?: string;
  tone?: ProductTone;
  image?: string;
  cta?: string;
  specs?: string[];
  /** Product page. Makes the media panel and name a link; the CTA stays an add-to-cart button. */
  href?: string;
  onAdd?: () => void;
  style?: CSSProperties;
}

/** Product tile: colour-block media panel, name, spec strip, action. */
export function ProductCard({
  name,
  price,
  claim,
  badge,
  tone = "blaze",
  image,
  cta = "Add to cart",
  specs = [],
  href,
  onAdd,
  style,
  ...rest
}: ProductCardProps) {
  const photo = (
    <Photo
      src={image}
      ratio="1 / 1"
      shape="circle"
      tone="cream"
      label={name}
      style={{ border: "var(--border-2) solid var(--border-strong)" }}
    />
  );
  return (
    <Card padding={0} lift style={{ display: "flex", flexDirection: "column", ...style }} {...rest}>
      <div
        style={{
          position: "relative",
          background: MEDIA[tone],
          borderBottom: "var(--border-2) solid var(--border-strong)",
          padding: "var(--space-5)",
        }}
      >
        {badge ? (
          <span style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
            <Badge tone="paper" size="sm" rotate={-5}>
              {badge}
            </Badge>
          </span>
        ) : null}
        {href ? (
          <Link href={href} tabIndex={-1} aria-hidden="true" style={{ display: "block" }}>
            {photo}
          </Link>
        ) : (
          photo
        )}
      </div>
      <div
        style={{
          padding: "var(--space-4) var(--space-5)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
          flex: 1,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-headline)",
            fontWeight: "var(--weight-black)" as CSSProperties["fontWeight"],
            textTransform: "uppercase",
            fontSize: "var(--type-headline-sm)",
            letterSpacing: "var(--tracking-headline)",
          }}
        >
          {href ? (
            <Link href={href} className="ebtb-card-link" style={{ color: "inherit" }}>
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        {claim ? (
          <p style={{ margin: 0, fontSize: "var(--type-body-sm)", color: "var(--text-muted)" }}>{claim}</p>
        ) : null}
        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            flexWrap: "wrap",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-label-sm)",
            color: "var(--poppy-700)",
            borderTop: "var(--border-1) solid var(--border-soft)",
            borderBottom: "var(--border-1) solid var(--border-soft)",
            padding: "8px 0",
            margin: "var(--space-2) 0",
          }}
        >
          <span>{price}</span>
          {specs.map((s, i) => (
            <span key={i}>— {s}</span>
          ))}
        </div>
        <Button fullWidth size="sm" onClick={onAdd}>
          {cta}
        </Button>
      </div>
    </Card>
  );
}
