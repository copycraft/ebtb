import type { Metadata } from "next";
import { Button, Card, Marquee, SectionHeading } from "@/components/ds";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { AboutBand } from "@/components/sections/AboutBand";
import { firstItems } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rólunk",
  description: "Az everything bagel feltét itthon eddig nem volt kapható. Kis tételben pirítjuk, durvára törjük, és még azon a héten tégelybe zárjuk.",
  alternates: { canonical: "/rolunk" },
};

const values = [
  ["01", "Kis tételben", "Pirítva, durvára törve, és még azon a héten tégelybe zárva — ezért még illata is van."],
  ["02", "Semmi töltelék", "Se csomósodásgátló, se cukor. Ami a tégelyben van, az mind íz."],
  ["03", "Egy dolog, rendesen", "Nem csinálunk mindenből egy kicsit. Egy keveréket csinálunk, és azt nagyon."],
];

export default function AboutPage() {
  return (
    <>
      <AboutBand page />

      <Marquee items={firstItems} tone="ink" speed={34} />

      <section
        aria-label="Amiben hiszünk"
        style={{
          padding: "var(--section-y) var(--gutter-inline)",
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
        }}
      >
        <div data-reveal>
          <SectionHeading eyebrow="Amiben hiszünk" title="Három szabály" align="left" />
        </div>
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "var(--grid-gap)" }}>
          {values.map(([num, title, text]) => (
            <StaggerItem key={num} style={{ height: "100%" }}>
              <Card tone="paper" padding={24} lift style={{ height: "100%" }}>
                <p style={{ margin: "0 0 12px", fontFamily: "var(--font-mono)", fontSize: "var(--type-label-sm)", letterSpacing: ".14em", color: "var(--blaze-700)" }}>
                  {num}
                </p>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-headline)",
                    fontWeight: "var(--weight-black)",
                    textTransform: "uppercase",
                    letterSpacing: ".02em",
                    fontSize: 19,
                  }}
                >
                  {title}
                </h3>
                <p style={{ margin: 0, fontSize: "var(--type-body-md)", lineHeight: 1.5 }}>{text}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section
        aria-label="Hol kapható"
        style={{
          background: "var(--surface-garlic)",
          borderTop: "var(--border-2) solid var(--border-strong)",
          borderBottom: "var(--border-2) solid var(--border-strong)",
          padding: "var(--section-y) var(--gutter-inline)",
        }}
      >
        <div
          data-reveal
          style={{ maxWidth: "var(--page-max)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end", justifyContent: "space-between" }}
        >
          <SectionHeading eyebrow="Hol kapható" title="Itt, és hamarosan máshol is" align="left">
            Most a saját webshopunkban. Ha boltod, kávézód vagy delikáteszed van, írj — szívesen küldünk nagyker árlistát.
          </SectionHeading>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span className="ebtb-hover-cta">
              <Button size="lg" as="a" href="/bolt">
                A boltba
              </Button>
            </span>
            {site.emagHref ? (
              <span className="ebtb-hover-cta">
                <Button size="lg" variant="outline" as="a" href={site.emagHref} target="_blank" rel="noopener">
                  eMAG
                </Button>
              </span>
            ) : null}
            <span className="ebtb-hover-cta">
              <Button size="lg" variant="ink" as="a" href="/kapcsolat?tema=nagyker">
                Nagyker
              </Button>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
