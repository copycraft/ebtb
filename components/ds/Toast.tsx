"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";

export type ToastTone = "success" | "info" | "warning" | "danger";

const TONES: Record<ToastTone, { background: string; icon: string }> = {
  success: { background: "var(--feedback-success-surface)", icon: "check" },
  info: { background: "var(--feedback-info-surface)", icon: "info" },
  warning: { background: "var(--feedback-warning-surface)", icon: "triangle-alert" },
  danger: { background: "var(--feedback-danger-surface)", icon: "circle-alert" },
};

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: ToastTone;
  title?: ReactNode;
  onClose?: () => void;
}

/** Tinted confirmation / notice. Title has personality, body stays factual. */
export function Toast({ tone = "success", title, children, onClose, style, ...rest }: ToastProps) {
  const t = TONES[tone];
  return (
    <div
      role="status"
      style={{
        display: "flex",
        gap: "var(--space-3)",
        alignItems: "flex-start",
        padding: "var(--space-4)",
        borderRadius: "var(--radius-md)",
        background: t.background,
        border: "var(--border-2) solid var(--border-strong)",
        boxShadow: "var(--shadow-sticker)",
        maxWidth: 420,
        ...style,
      }}
      {...rest}
    >
      <Icon name={t.icon} size={20} style={{ marginTop: 2 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {title ? (
          <span style={{ fontWeight: "var(--weight-black)", textTransform: "uppercase", fontSize: "var(--type-label-md)", letterSpacing: "var(--tracking-label)" }}>
            {title}
          </span>
        ) : null}
        {children ? <span style={{ fontSize: "var(--type-body-sm)" }}>{children}</span> : null}
      </div>
      {onClose ? <IconButton name="x" label="Bezárás" variant="bare" size="sm" onClick={onClose} /> : null}
    </div>
  );
}
