"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export type ButtonVariant = "primary" | "ink" | "garlic" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const FILLS: Record<ButtonVariant, CSSProperties> = {
  primary: { background: "var(--action-primary)", color: "var(--text-on-blaze)" },
  ink: { background: "var(--surface-ink)", color: "var(--text-on-ink)" },
  garlic: { background: "var(--surface-garlic)", color: "var(--poppy-800)" },
  outline: { background: "var(--surface-card)", color: "var(--poppy-800)" },
  ghost: {
    background: "transparent",
    color: "var(--poppy-800)",
    boxShadow: "none",
    border: "var(--border-2) solid transparent",
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "3px",
  },
};

const SIZES: Record<ButtonSize, CSSProperties> = {
  sm: { padding: "8px 18px", fontSize: "var(--type-label-sm)" },
  md: { padding: "13px 28px", fontSize: "var(--type-label-md)" },
  lg: { padding: "18px 40px", fontSize: "15px" },
};

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  style?: CSSProperties;
  [key: string]: unknown;
}

/** Pill action button. Hard sticker shadow, shifts into the shadow on press. */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  as = "button",
  href,
  children,
  onClick,
  style,
  ...rest
}: ButtonProps) {
  const [down, setDown] = useState(false);
  const [hover, setHover] = useState(false);
  const fill = FILLS[variant] || FILLS.primary;
  const ghost = variant === "ghost";
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-ui)",
    fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"],
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-label)",
    lineHeight: 1,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "var(--border-2) solid var(--border-strong)",
    borderRadius: "var(--radius-pill)",
    boxShadow: down ? "var(--shadow-pressed)" : "var(--shadow-sticker)",
    transform: down ? "translate(var(--press-shift),var(--press-shift))" : "none",
    transition:
      "transform var(--dur-fast) var(--ease-snap),box-shadow var(--dur-fast) var(--ease-snap),background var(--dur-fast) var(--ease-snap)",
    width: fullWidth ? "100%" : "auto",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
    filter: hover && !disabled && !ghost ? "brightness(0.94)" : "none",
    ...SIZES[size],
    ...fill,
    ...(ghost
      ? { boxShadow: "none", transform: "none", background: hover ? "var(--sesame-300)" : "transparent" }
      : null),
    ...style,
  };

  const shared = {
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => !disabled && setDown(true),
    onMouseUp: () => setDown(false),
    onClick: disabled ? undefined : onClick,
  };

  if (as === "a") {
    return (
      <a href={href} {...shared} {...(rest as Record<string, unknown>)}>
        {children}
      </a>
    );
  }

  return (
    <button disabled={disabled} {...shared} {...(rest as Record<string, unknown>)}>
      {children}
    </button>
  );
}
