import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type MarqueeTone = "onion" | "blaze" | "garlic" | "ink" | "scallion";

const TONES: Record<MarqueeTone, CSSProperties> = {
  onion: { background: "var(--surface-onion)", color: "var(--salt-100)" },
  blaze: { background: "var(--surface-blaze)", color: "var(--text-on-blaze)" },
  garlic: { background: "var(--surface-garlic)", color: "var(--poppy-800)" },
  ink: { background: "var(--surface-ink)", color: "var(--text-on-ink)" },
  scallion: { background: "var(--surface-scallion)", color: "var(--poppy-800)" },
};

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  items?: ReactNode[];
  tone?: MarqueeTone;
  separator?: string;
  /** Loop duration in seconds. */
  speed?: number;
}

/**
 * Endless scrolling claim bar — the brand's signature horizontal rule.
 * The `ebtb-marquee` keyframes live in app/globals.css so every instance
 * shares one animation and this stays a server component.
 */
export function Marquee({ items = [], tone = "onion", separator = "✳", speed = 26, style, ...rest }: MarqueeProps) {
  const run = items.concat(items, items);
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "var(--border-2) solid var(--border-strong)",
        borderBottom: "var(--border-2) solid var(--border-strong)",
        padding: "11px 0",
        ...TONES[tone],
        ...style,
      }}
      {...rest}
    >
      <div
        className="ebtb-marquee-track"
        style={{
          display: "flex",
          gap: "var(--space-5)",
          width: "max-content",
          whiteSpace: "nowrap",
          animationDuration: `${speed}s`,
        }}
      >
        {run.map((t, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              gap: "var(--space-5)",
              alignItems: "center",
              fontFamily: "var(--font-ui)",
              fontWeight: "var(--weight-black)" as CSSProperties["fontWeight"],
              textTransform: "uppercase",
              fontSize: "var(--type-label-md)",
              letterSpacing: "var(--tracking-label-wide)",
            }}
          >
            {t}
            <span style={{ opacity: 0.7 }}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
