"use client";

import type { HTMLAttributes } from "react";
import { IconButton } from "./IconButton";
import { Photo } from "./Photo";
import { QuantityStepper } from "./QuantityStepper";

export interface CartLineProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  variant?: string;
  price: string;
  qty?: number;
  image?: string;
  onQty?: (qty: number) => void;
  onRemove?: () => void;
}

/** One row in the cart drawer: thumb, name, stepper, line price, remove. */
export function CartLine({ name, variant, price, qty = 1, image, onQty, onRemove, style, ...rest }: CartLineProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "center",
        padding: "var(--space-4) 0",
        borderBottom: "var(--border-1) solid var(--border-soft)",
        ...style,
      }}
      {...rest}
    >
      <Photo src={image} ratio="1 / 1" shape="rounded" tone="cream" label="" style={{ width: 64, flex: "0 0 auto" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-headline)",
            fontWeight: "var(--weight-black)",
            textTransform: "uppercase",
            fontSize: "var(--type-label-md)",
            letterSpacing: "var(--tracking-headline)",
          }}
        >
          {name}
        </span>
        {variant ? (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", color: "var(--text-muted)" }}>{variant}</span>
        ) : null}
        <QuantityStepper value={qty} size="sm" onChange={onQty} label={`Mennyiség — ${name}`} style={{ marginTop: 6, alignSelf: "flex-start" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "var(--space-2)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, whiteSpace: "nowrap" }}>{price}</span>
        <IconButton name="x" label={`${name} eltávolítása`} variant="bare" size="sm" onClick={onRemove} />
      </div>
    </div>
  );
}
