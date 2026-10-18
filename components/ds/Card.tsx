"use client";

import { useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type CardTone = "paper" | "cream" | "blaze" | "garlic" | "onion" | "ink" | "scallion";

const TONES: Record<CardTone, CSSProperties> = {
  paper: { background: "var(--surface-card)" },
  cream: { background: "var(--sesame-300)" },
  blaze: { background: "var(--surface-blaze)", color: "var(--text-on-blaze)" },
  garlic: { background: "var(--surface-garlic)" },
  onion: { background: "var(--surface-onion)", color: "var(--salt-100)" },
  ink: { background: "var(--surface-ink)", color: "var(--text-on-ink)" },
  scallion: { background: "var(--surface-scallion)" },
};

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  tone?: CardTone;
  shadow?: boolean;
  padding?: string | number;
  lift?: boolean;
  children?: ReactNode;
}

/** The container. 20px radius, 2px ink outline, optional hard shadow. */
export function Card({
  tone = "paper",
  shadow = true,
  padding = "var(--space-5)",
  lift = false,
  children,
  style,
  ...rest
}: CardProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: "var(--radius-lg)",
        border: "var(--border-2) solid var(--border-strong)",
        boxShadow: shadow
          ? lift && hover
            ? "var(--shadow-sticker-lg)"
            : "var(--shadow-sticker)"
          : "none",
        transform: lift && hover ? "translate(-3px,-3px)" : "none",
        transition: "transform var(--dur-med) var(--ease-snap),box-shadow var(--dur-med) var(--ease-snap)",
        padding,
        overflow: "hidden",
        ...TONES[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
