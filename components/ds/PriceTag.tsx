import type { HTMLAttributes, ReactNode } from "react";

export interface PriceTagProps extends HTMLAttributes<HTMLSpanElement> {
  price: ReactNode;
  compareAt?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const SIZES = { sm: "var(--type-body-md)", md: "var(--type-headline-sm)", lg: "var(--type-headline-md)" };

/** Price in mono, optional struck-through compare-at. */
export function PriceTag({ price, compareAt, size = "md", style, ...rest }: PriceTagProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: "var(--space-2)",
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: SIZES[size],
        ...style,
      }}
      {...rest}
    >
      {price}
      {compareAt ? (
        <span style={{ textDecoration: "line-through", color: "var(--text-muted)", fontSize: "var(--type-body-sm)" }}>{compareAt}</span>
      ) : null}
    </span>
  );
}
