import type { CSSProperties } from "react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { WaitlistBand } from "@/components/WaitlistBand";
import { AboutBand } from "@/components/sections/AboutBand";
import { IdeasAndRecipes } from "@/components/sections/IdeasAndRecipes";
import { ShopBand } from "@/components/sections/ShopBand";
import { Badge, Button, Card, Marquee, Photo, SectionHeading, SpecStrip } from "@/components/ds";
import { claimItems, firstItems, heroSpecs, seeds } from "@/lib/content";
import { site } from "@/lib/site";

const headline: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  margin: 0,
};

export default function Page() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section
        aria-label="EBTB bemutatása"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
          background: "var(--poppy-500)",
          borderBottom: "var(--border-2) solid var(--border-strong)",
          position: "relative",
        }}
      >
        <StaggerGroup
          trigger="mount"
          delay={0.3}
          gap={0.09}
          style={{
            padding: "clamp(32px,5vw,72px) clamp(16px,4vw,56px)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            justifyContent: "center",
            color: "var(--salt-100)",
          }}
        >
          <div className="ebtb-wobble" style={{ alignSelf: "flex-start" }}>
            <Badge tone="garlic" size="md">
              Kis tétel · nagy szórás
            </Badge>
          </div>
          <h1
            className="ebtb-pop"
            style={{
              ...headline,
              fontSize: "clamp(46px,6.4vw,96px)",
              lineHeight: 0.92,
              letterSpacing: "-.02em",
              color: "var(--garlic-300)",
              textShadow: "6px 6px 0 #241C33",
            }}
          >
            Minden, csak
            <br />a bagel nem
          </h1>
          <StaggerItem fade={false}>
            <p style={{ margin: 0, maxWidth: "44ch", fontSize: 19, lineHeight: 1.5 }}>
              Hat pirított összetevő egy tégelyben. Szórd rántottára, avokádóra, túróra, salátára — bármire, ami nem bagel.
            </p>
          </StaggerItem>
          <StaggerItem fade={false} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span className="ebtb-hover-cta">
              <Button size="lg" as="a" href="/bolt">
                Megveszem
              </Button>
            </span>
            <span className="ebtb-hover-cta">
              <Button size="lg" variant="outline" as="a" href="#receptek">
                Mire szórjam?
              </Button>
            </span>
          </StaggerItem>
          <StaggerItem fade={false}>
            <SpecStrip align="left" items={heroSpecs} style={{ color: "#E6DDFB", borderColor: "rgba(255,253,247,.3)", maxWidth: 480 }} />
          </StaggerItem>
        </StaggerGroup>

        <div style={{ padding: "clamp(24px,3vw,48px)", display: "grid", placeItems: "center", position: "relative" }}>
          <div className="ebtb-float" style={{ width: "100%", maxWidth: 420, position: "relative" }}>
            <Photo shape="arch" ratio="4 / 5" label="Nyitott tégely, szórás közben" style={{ width: "100%" }} />
            <div style={{ position: "absolute", bottom: -14, left: -18, pointerEvents: "none" }}>
              <Badge tone="blaze" rotate={-8}>
                0 bagel
              </Badge>
            </div>
          </div>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            {seeds.map((s, i) => (
              <span key={i} className="ebtb-seed" style={s} />
            ))}
          </div>
        </div>
      </section>

      <Marquee items={claimItems} tone="blaze" speed={28} />

      {/* ---- Mi az EBTB ---- */}
      <section
        id="mi-ez"
        aria-label="Mi az EBTB"
        style={{
          padding: "var(--section-y) var(--gutter-inline)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div data-reveal>
          <SectionHeading eyebrow="Mi ez egyáltalán" title="Az everything bagel, tégelyben" align="left">
            Szezám, mák, fokhagyma, hagyma, tengeri só és egy csipet chili. Sós, umamis, csendesen függőséget okozó — és Magyarországon
            eddig nem lehetett kapni.
          </SectionHeading>
        </div>
        <StaggerGroup
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "var(--grid-gap)",
            alignItems: "stretch",
          }}
        >
          {[
            ["01", "Globális íz", "Nem kell magyarázni. Aki egyszer megkóstolta, az keresi."],
            ["02", "Egy szórás, kész", "Nem kell hozzá recept. Rárázod, és máris jobb lett."],
            ["03", "Nem csak reggelire", "Rántottától a sült krumpliig — ugyanaz a tégely, egész nap."],
          ].map(([num, title, text]) => (
            <StaggerItem key={num} style={{ height: "100%" }}>
              <Card tone="paper" padding={24} lift style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    margin: "0 0 12px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--type-label-sm)",
                    letterSpacing: ".14em",
                    color: "var(--blaze-500)",
                  }}
                >
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

      {/* ---- Mire szórd rá: öt ötlet + receptek (teljes lista: /receptek) ---- */}
      <IdeasAndRecipes />

      {/* ---- Bolt, rövid (teljes: /bolt) ---- */}
      <ShopBand limit={3} />

      <Marquee items={firstItems} tone="ink" speed={34} />

      {/* ---- Rólunk, rövid (teljes: /rolunk) ---- */}
      <AboutBand />

      {/* ---- Feliratkozás ---- */}
      {site.showWaitlist ? (
        <section
          aria-label="Feliratkozás"
          style={{ padding: "clamp(48px,7vw,96px) var(--gutter-inline)", display: "grid", placeItems: "center" }}
        >
          <div data-reveal style={{ width: "100%", maxWidth: 620 }}>
            <WaitlistBand />
          </div>
        </section>
      ) : null}
    </>
  );
}
