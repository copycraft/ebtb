"use client";

import { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { Icon } from "./Icon";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (string | { value: string; label: string })[];
}

/** Native select in the Input pill, with a chevron. */
export function Select({ label, options, id, style, ...rest }: SelectProps) {
  const generated = useId();
  const uid = id || generated;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", width: "100%" }}>
      {label ? (
        <label
          htmlFor={uid}
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--type-label-sm)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-label)",
          }}
        >
          {label}
        </label>
      ) : null}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <select
          id={uid}
          style={{
            appearance: "none",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--type-body-md)",
            padding: "13px 44px 13px 18px",
            borderRadius: "var(--radius-pill)",
            background: "var(--surface-card)",
            border: "var(--border-2) solid var(--border-strong)",
            color: "var(--text-body)",
            width: "100%",
            cursor: "pointer",
            ...style,
          }}
          {...rest}
        >
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const text = typeof o === "string" ? o : o.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <Icon name="chevron-down" size={18} style={{ position: "absolute", right: 16, pointerEvents: "none" }} />
      </div>
    </div>
  );
}
