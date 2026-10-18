import { ShopSection } from "../ShopSection";
import { SectionHeading } from "../ds";

/**
 * The garlic shop band. Home shows a short version (`limit` + link to /bolt);
 * /bolt shows every product with the heading as the page's h1.
 */
export function ShopBand({ limit, page = false }: { limit?: number; page?: boolean }) {
  return (
    <section
      id="bolt"
      aria-label="Bolt"
      style={{
        background: "var(--surface-garlic)",
        borderTop: page ? undefined : "var(--border-2) solid var(--border-strong)",
        borderBottom: "var(--border-2) solid var(--border-strong)",
        padding: page ? "clamp(32px,5vw,72px) var(--gutter-inline) var(--section-y)" : "var(--section-y) var(--gutter-inline)",
      }}
    >
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <div data-reveal>
          <SectionHeading
            eyebrow={page ? "Bolt" : "Elsőként a piacon"}
            title="Válaszd ki a tiéd"
            align="left"
            level={page ? 1 : 2}
          >
            {page ? "Három keverék és egy utántöltő. Két munkanapon belül feladjuk." : undefined}
          </SectionHeading>
        </div>
        <ShopSection limit={limit} moreHref={page ? undefined : "/bolt"} />
      </div>
    </section>
  );
}
