"use client";

import type { ButtonHTMLAttributes } from "react";

export interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** Filter chip. Fills ink when selected. Non-interactive without onClick. */
export function Tag({ selected = false, onClick, children, style, ...rest }: TagProps) {
  const interactive = typeof onClick === "function";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      aria-pressed={interactive ? selected : undefined}
      style={{
        fontFamily: "var(--font-ui)",
        fontWeight: "var(--weight-bold)",
        fontSize: "var(--type-label-sm)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-label)",
        padding: "7px 14px",
        borderRadius: "var(--radius-pill)",
        cursor: interactive ? "pointer" : "default",
        border: "var(--border-2) solid var(--border-strong)",
        background: selected ? "var(--surface-ink)" : "transparent",
        color: selected ? "var(--text-on-ink)" : "var(--poppy-800)",
        transition: "background var(--dur-fast) var(--ease-snap),color var(--dur-fast) var(--ease-snap)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
