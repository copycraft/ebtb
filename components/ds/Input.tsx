"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

/** Text field. Ink outline, pill radius, mono-ish label above. */
export function Input({ label, hint, error, type = "text", id, style, ...rest }: InputProps) {
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
      <input
        id={uid}
        type={type}
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--type-body-md)",
          padding: "13px 18px",
          borderRadius: "var(--radius-pill)",
          background: "var(--surface-card)",
          color: "var(--text-body)",
          border: `var(--border-2) solid ${error ? "var(--feedback-danger)" : "var(--border-strong)"}`,
          outline: "none",
          width: "100%",
          ...style,
        }}
        {...rest}
      />
      {error ? (
        <span style={{ fontSize: "var(--type-body-sm)", color: "var(--feedback-danger)", fontWeight: "var(--weight-bold)" }}>
          {error}
        </span>
      ) : hint ? (
        <span style={{ fontSize: "var(--type-body-sm)", color: "var(--text-muted)" }}>{hint}</span>
      ) : null}
    </div>
  );
}
