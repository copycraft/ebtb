"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import { Icon } from "./Icon";

export interface QuantityStepperProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md";
  /** Names the item for screen readers: "Mennyiség — Everything Blend". */
  label?: string;
}

/** − / count / + pill. Clamps to [min, max]. */
export function QuantityStepper({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  label = "Mennyiség",
  style,
  ...rest
}: QuantityStepperProps) {
  const set = (n: number) => onChange && onChange(Math.min(max, Math.max(min, n)));
  const px = size === "sm" ? 32 : 40;
  const btn: CSSProperties = {
    width: px,
    height: px,
    display: "grid",
    placeItems: "center",
    background: "transparent",
    border: "none",
    borderRadius: "var(--radius-pill)",
    cursor: "pointer",
    color: "var(--poppy-800)",
  };
  return (
    <div
      role="group"
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "var(--border-2) solid var(--border-strong)",
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-sticker-sm)",
        ...style,
      }}
      {...rest}
    >
      <button type="button" aria-label="Kevesebb" disabled={value <= min} onClick={() => set(value - 1)} style={{ ...btn, opacity: value <= min ? 0.4 : 1 }}>
        <Icon name="minus" size={16} />
      </button>
      <span
        aria-live="polite"
        style={{ minWidth: 34, textAlign: "center", fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: "var(--type-body-md)" }}
      >
        {value}
      </span>
      <button type="button" aria-label="Több" disabled={value >= max} onClick={() => set(value + 1)} style={{ ...btn, opacity: value >= max ? 0.4 : 1 }}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
