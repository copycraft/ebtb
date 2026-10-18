"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { Icon } from "./Icon";

const SIZES = { sm: 32, md: 44, lg: 52 } as const;

export type IconButtonVariant = "outline" | "primary" | "ink" | "bare";

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  name: string;
  label: string;
  variant?: IconButtonVariant;
  size?: keyof typeof SIZES;
}

const FILLS: Record<IconButtonVariant, CSSProperties> = {
  outline: { background: "var(--surface-card)", color: "var(--poppy-800)" },
  primary: { background: "var(--action-primary)", color: "var(--text-on-blaze)" },
  ink: { background: "var(--surface-ink)", color: "var(--text-on-ink)" },
  bare: {
    background: "transparent",
    color: "var(--poppy-800)",
    border: "var(--border-2) solid transparent",
    boxShadow: "none",
  },
};

/** Circular icon-only control. Min 44px in product surfaces (touch target). */
export function IconButton({
  name,
  label,
  variant = "outline",
  size = "md",
  onClick,
  style,
  ...rest
}: IconButtonProps) {
  const [down, setDown] = useState(false);
  const px = SIZES[size] || SIZES.md;
  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
      style={{
        width: px,
        height: px,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "var(--border-2) solid var(--border-strong)",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        boxShadow: down ? "var(--shadow-pressed)" : "var(--shadow-sticker-sm)",
        transform: down ? "translate(1px,1px)" : "none",
        transition: "transform var(--dur-fast) var(--ease-snap),box-shadow var(--dur-fast) var(--ease-snap)",
        ...FILLS[variant],
        ...style,
      }}
      {...rest}
    >
      <Icon name={name} size={size === "sm" ? 15 : 19} />
    </button>
  );
}
