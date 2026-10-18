"use client";

import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "style"> {
  label: ReactNode;
  style?: CSSProperties;
}

/** 24px rounded-square box (the one square-ish control), blaze when checked. Native input stays in the form. */
export function Checkbox({ label, checked = false, disabled = false, style, ...rest }: CheckboxProps) {
  return (
    <label
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        fontSize: "var(--type-body-md)",
        lineHeight: 1.45,
        ...style,
      }}
    >
      <input
        type="checkbox"
        className="ebtb-checkbox-input"
        checked={checked}
        disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 24, height: 24, margin: 0 }}
        {...rest}
      />
      <span
        aria-hidden="true"
        style={{
          width: 24,
          height: 24,
          flex: "0 0 auto",
          display: "grid",
          placeItems: "center",
          borderRadius: "var(--radius-sm)",
          border: "var(--border-2) solid var(--border-strong)",
          background: checked ? "var(--action-primary)" : "var(--surface-card)",
          color: "var(--salt-100)",
          boxShadow: "var(--shadow-sticker-sm)",
          transition: "background var(--dur-fast) var(--ease-snap)",
        }}
      >
        {checked ? <Icon name="check" size={15} /> : null}
      </span>
      <span>{label}</span>
    </label>
  );
}
