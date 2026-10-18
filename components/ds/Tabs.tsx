"use client";

import { m } from "motion/react";
import { useRef } from "react";
import type { HTMLAttributes, KeyboardEvent } from "react";

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: string[];
  value: string;
  onChange?: (item: string) => void;
  /** Prefix for tab / panel ids; the panel should use `${idBase}-panel`. */
  idBase: string;
}

/** Segmented pill tab list. Arrow keys move between tabs. */
export function Tabs({ items, value, onChange, idBase, style, ...rest }: TabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = items.indexOf(value);
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    onChange?.(items[next]);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      onKeyDown={onKey}
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        gap: 4,
        padding: 4,
        borderRadius: "var(--radius-lg)",
        border: "var(--border-2) solid var(--border-strong)",
        background: "var(--sesame-300)",
        alignSelf: "flex-start",
        ...style,
      }}
      {...rest}
    >
      {items.map((it, i) => {
        const on = value === it;
        return (
          <button
            key={it}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${i}`}
            aria-selected={on}
            aria-controls={`${idBase}-panel`}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange?.(it)}
            style={{
              position: "relative",
              isolation: "isolate",
              fontFamily: "var(--font-ui)",
              fontWeight: "var(--weight-bold)",
              fontSize: "var(--type-label-sm)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-label)",
              padding: "9px 18px",
              cursor: "pointer",
              border: "none",
              borderRadius: "var(--radius-pill)",
              background: "transparent",
              color: "var(--poppy-800)",
            }}
          >
            {on ? (
              <m.span
                layoutId={`${idBase}-active`}
                aria-hidden="true"
                transition={{ type: "spring", stiffness: 520, damping: 40 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: -1,
                  borderRadius: "var(--radius-pill)",
                  background: "var(--surface-card)",
                  boxShadow: "var(--shadow-sticker-sm)",
                }}
              />
            ) : null}
            {it}
          </button>
        );
      })}
    </div>
  );
}
