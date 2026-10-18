import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type BadgeTone = "blaze" | "garlic" | "onion" | "scallion" | "paper" | "ink";

const TONES: Record<BadgeTone, CSSProperties> = {
  blaze: { background: "var(--surface-blaze)", color: "var(--text-on-blaze)" },
  garlic: { background: "var(--surface-garlic)", color: "var(--poppy-800)" },
  onion: { background: "var(--surface-onion)", color: "var(--salt-100)" },
  scallion: { background: "var(--surface-scallion)", color: "var(--poppy-800)" },
  paper: { background: "var(--surface-card)", color: "var(--poppy-800)" },
  ink: { background: "var(--surface-ink)", color: "var(--text-on-ink)" },
};

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  tone?: BadgeTone;
  rotate?: number;
  size?: "sm" | "md";
  children?: ReactNode;
}

/** Sticker badge: pill claim label that sits on cards, packs and hero art. */
export function Badge({ tone = "garlic", rotate = 0, size = "md", children, style, ...rest }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-ui)",
        fontWeight: "var(--weight-black)" as CSSProperties["fontWeight"],
        textTransform: "uppercase",
        fontSize: size === "sm" ? "var(--type-label-sm)" : "var(--type-label-md)",
        letterSpacing: "var(--tracking-label)",
        padding: size === "sm" ? "5px 12px" : "7px 16px",
        borderRadius: "var(--radius-pill)",
        border: "var(--border-2) solid var(--border-strong)",
        boxShadow: "var(--shadow-sticker-sm)",
        transform: rotate ? `rotate(${rotate}deg)` : "none",
        whiteSpace: "nowrap",
        ...TONES[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
