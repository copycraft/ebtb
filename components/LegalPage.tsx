import type { ReactNode } from "react";
import { company, isPlaceholder } from "@/lib/legal";
import { Badge } from "./ds";

/** Renders a company detail; unfilled `[placeholders]` get a highlight so they can't ship unnoticed. */
export function Fill({ children }: { children: string }) {
  return isPlaceholder(children) ? <span className="ebtb-placeholder">{children}</span> : <>{children}</>;
}

/** Shared frame for ÁSZF, privacy, imprint and shipping pages. */
export function LegalPage({ eyebrow, title, children, draft = true }: { eyebrow: string; title: string; children: ReactNode; draft?: boolean }) {
  return (
    <section
      aria-label={title}
      style={{
        padding: "clamp(32px,5vw,72px) var(--gutter-inline) var(--section-y)",
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: "var(--weight-black)",
            textTransform: "uppercase",
            fontSize: "var(--type-label-md)",
            letterSpacing: "var(--tracking-label-wide)",
            color: "var(--blaze-500)",
          }}
        >
          {eyebrow}
        </span>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "var(--type-display-md)",
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
          }}
        >
          {title}
        </h1>
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--poppy-700)" }}>
          {`Utoljára frissítve: ${company.updated}`}
        </p>
        {draft ? (
          <Badge tone="garlic" size="sm">
            Tervezet — jogi ellenőrzés előtt
          </Badge>
        ) : null}
      </header>
      <div className="ebtb-prose">{children}</div>
    </section>
  );
}
