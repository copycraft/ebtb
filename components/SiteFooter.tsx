import Link from "next/link";
import type { CSSProperties } from "react";
import { footerColumns, legalLinks } from "@/lib/content";
import { site } from "@/lib/site";
import { CookieSettingsLink } from "./CookieBanner";

const columnLabel: CSSProperties = {
  margin: "0 0 4px",
  fontFamily: "var(--font-mono)",
  fontSize: "var(--type-label-sm)",
  letterSpacing: ".18em",
  textTransform: "uppercase",
  color: "rgba(255,253,247,.55)",
};

const footerLink: CSSProperties = { color: "var(--salt-100)", fontSize: "var(--type-body-md)", width: "fit-content" };

const legalLink: CSSProperties = { color: "rgba(255,253,247,.6)" };

export function SiteFooter() {
  return (
    <footer
      aria-label="Lábléc"
      style={{
        background: "var(--surface-ink)",
        color: "var(--salt-100)",
        borderTop: "var(--border-2) solid var(--border-strong)",
        padding: "clamp(40px,6vw,80px) var(--gutter-inline) 28px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "clamp(24px,4vw,48px)",
        }}
      >
        <div style={{ gridColumn: "1/-1" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              margin: 0,
              fontSize: "clamp(56px,13vw,168px)",
              lineHeight: 0.86,
              letterSpacing: "-.02em",
              color: "var(--surface-garlic)",
            }}
          >
            EBTB
          </p>
          <p
            style={{
              margin: "8px 0 0",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-label-sm)",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "var(--scallion-500)",
            }}
          >
            Minden, csak a bagel nem
          </p>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title} style={{ display: "flex", flexDirection: "column", gap: 10, alignContent: "start" }}>
            <p style={columnLabel}>{col.title}</p>
            {col.links.map((l) => (
              <Link key={l.href} href={l.href} className="ebtb-footer-link" style={footerLink}>
                {l.label}
              </Link>
            ))}
          </nav>
        ))}

        <nav aria-label="Máshol" style={{ display: "flex", flexDirection: "column", gap: 10, alignContent: "start" }}>
          <p style={columnLabel}>Máshol</p>
          <a href={site.social.instagram} target="_blank" rel="noopener" className="ebtb-footer-link" style={footerLink}>
            Instagram
          </a>
          <a href={site.social.tiktok} target="_blank" rel="noopener" className="ebtb-footer-link" style={footerLink}>
            TikTok
          </a>
          {site.emagHref ? (
            <a href={site.emagHref} target="_blank" rel="noopener" className="ebtb-footer-link" style={footerLink}>
              eMAG
            </a>
          ) : null}
        </nav>
      </div>
      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "clamp(32px,5vw,56px) auto 0",
          paddingTop: 20,
          borderTop: "1.5px solid rgba(255,253,247,.22)",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px 24px",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label-sm)",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "rgba(255,253,247,.6)",
        }}
      >
        <p style={{ margin: 0 }}>© 2026 EBTB — Jelenleg Magyarországra szállítunk — EU hamarosan — 0 bagel</p>
        <nav aria-label="Jogi információk" style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="ebtb-footer-link" style={legalLink}>
              {l.label}
            </Link>
          ))}
          <CookieSettingsLink style={legalLink} />
        </nav>
      </div>
    </footer>
  );
}
