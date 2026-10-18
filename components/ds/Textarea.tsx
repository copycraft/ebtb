"use client";

import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

/** Multi-line sibling of Input: same label, outline and type; 20px radius, since a pill can't hold paragraphs. */
export function Textarea({ label, hint, error, id, rows = 5, style, ...rest }: TextareaProps) {
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
      <textarea
        id={uid}
        rows={rows}
        aria-invalid={error ? true : undefined}
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--type-body-md)",
          lineHeight: 1.5,
          padding: "14px 18px",
          borderRadius: "var(--radius-lg)",
          background: "var(--surface-card)",
          color: "var(--text-body)",
          border: `var(--border-2) solid ${error ? "var(--feedback-danger)" : "var(--border-strong)"}`,
          width: "100%",
          resize: "vertical",
          ...style,
        }}
        {...rest}
      />
      {error ? (
        <span style={{ fontSize: "var(--type-body-sm)", color: "var(--feedback-danger)", fontWeight: "var(--weight-bold)" }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: "var(--type-body-sm)", color: "var(--text-muted)" }}>{hint}</span>
      ) : null}
    </div>
  );
}
