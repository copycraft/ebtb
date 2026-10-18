import { Fragment } from "react";
import type { HTMLAttributes } from "react";

export type SpecItem = string | { label: string; value: string };

export interface SpecStripProps extends HTMLAttributes<HTMLDivElement> {
  items?: SpecItem[];
  align?: "left" | "center";
}

/** Mono data row: the brand's way of stating facts (weight, heat, ingredients). */
export function SpecStrip({ items = [], align = "center", style, ...rest }: SpecStripProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--type-label-md)",
        color: "var(--poppy-700)",
        borderTop: "var(--border-1) solid var(--border-soft)",
        borderBottom: "var(--border-1) solid var(--border-soft)",
        padding: "10px 0",
        ...style,
      }}
      {...rest}
    >
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 ? <span style={{ opacity: 0.5 }}>—</span> : null}
          <span>{typeof it === "string" ? it : `${it.label} ${it.value}`}</span>
        </Fragment>
      ))}
    </div>
  );
}
