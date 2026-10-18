import { Badge, Button, Photo, SectionHeading } from "../ds";

/**
 * The "Rólunk" story band. Home shows the short version with a link to /rolunk;
 * /rolunk opens with the long version as its h1.
 */
export function AboutBand({ page = false }: { page?: boolean }) {
  return (
    <section
      id="rolunk"
      aria-label="Rólunk"
      style={{
        borderTop: page ? undefined : "var(--border-2) solid var(--border-strong)",
        padding: page ? "clamp(32px,5vw,72px) var(--gutter-inline) var(--section-y)" : "var(--section-y) var(--gutter-inline)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "clamp(28px,4vw,56px)",
          alignItems: "center",
        }}
      >
        <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SectionHeading eyebrow="Rólunk" title="Mi nem másolunk trendet" align="left" level={page ? 1 : 2}>
            Az everything bagel feltét Amerikában klasszikus. Itthon eddig nem lehetett kapni, ezért megcsináltuk: kis tételben pirítjuk,
            durvára törjük, és még azon a héten tégelybe zárjuk.
          </SectionHeading>
          {page ? (
            <p style={{ margin: 0, maxWidth: "48ch", fontSize: 17, lineHeight: 1.5 }}>
              Egy dolgot csinálunk, de azt rendesen. A bagelt meghagyjuk a pékeknek.
            </p>
          ) : null}
          <div>
            <span className="ebtb-hover-cta">
              <Button size="md" variant="ink" as="a" href={page ? "/kapcsolat" : "/rolunk"}>
                {page ? "Írj nekünk" : "Bővebben rólunk"}
              </Button>
            </span>
          </div>
        </div>
        <div data-reveal style={{ position: "relative", maxWidth: page ? 460 : 400, width: "100%", justifySelf: "center" }}>
          <Photo shape="arch" ratio="4 / 5" tone="blaze" label="A csapat a pörkölőnél, kötényben" />
          <div style={{ position: "absolute", top: 18, right: -12 }}>
            <Badge tone="garlic" rotate={7}>
              Elsőként itthon
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
