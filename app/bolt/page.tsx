import type { Metadata } from "next";
import Link from "next/link";
import { RecipeCarousel } from "@/components/RecipeCarousel";
import { Card, Icon, Marquee } from "@/components/ds";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ShopBand } from "@/components/sections/ShopBand";
import { formatHuf } from "@/lib/format";
import { getRecipes } from "@/lib/recipes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bolt",
  description: `Everything Blend, Extra Fokhagyma, Chili Everything és utántöltő. ${formatHuf(site.freeShippingHuf)} felett ingyen szállítunk.`,
  alternates: { canonical: "/bolt" },
};

const facts = [
  { icon: "truck", title: "Két nap alatt nálad", text: "Két munkanapon belül feladjuk, jelenleg Magyarországra." },
  { icon: "package", title: `Ingyen ${formatHuf(site.freeShippingHuf)}-tól`, text: "Alatta egységes szállítási díj, a pénztárban látod." },
  { icon: "refresh-cw", title: "Töltsd újra", text: "Az utántöltő négy tégelynyi, és kevesebb szemetet hagy." },
];

export default function ShopPage() {
  return (
    <>
      <ShopBand page />

      <section
        aria-label="Jó tudni"
        style={{ padding: "var(--section-y) var(--gutter-inline)", maxWidth: "var(--page-max)", margin: "0 auto", width: "100%" }}
      >
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "var(--grid-gap)" }}>
          {facts.map((f) => (
            <StaggerItem key={f.title} style={{ height: "100%" }}>
              <Card tone="paper" padding={24} style={{ height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                <span
                  style={{
                    width: 44,
                    height: 44,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "var(--radius-pill)",
                    border: "var(--border-2) solid var(--border-strong)",
                    background: "var(--garlic-100)",
                  }}
                >
                  <Icon name={f.icon} size={22} />
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-headline)",
                    fontWeight: "var(--weight-black)",
                    textTransform: "uppercase",
                    letterSpacing: ".02em",
                    fontSize: 17,
                  }}
                >
                  {f.title}
                </h2>
                <p style={{ margin: 0, fontSize: "var(--type-body-md)", lineHeight: 1.5 }}>{f.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--type-body-sm)" }}>
          Részletek:{" "}
          <Link href="/szallitas" style={{ color: "var(--text-link)", textDecoration: "underline" }}>
            szállítás és visszaküldés
          </Link>
          .
        </p>
      </section>

      <Marquee items={["Szórd rá", "Töltsd újra, ne vegyél újat", "Kis tétel, nagy szórás"]} tone="onion" speed={30} />

      <section aria-label="Mire szórd" style={{ padding: "var(--section-y) 0", maxWidth: "var(--page-max)", margin: "0 auto", width: "100%" }}>
        <div data-reveal>
          <RecipeCarousel
            recipes={getRecipes().slice(0, 8)}
            label={
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-headline)",
                  fontWeight: "var(--weight-black)",
                  textTransform: "uppercase",
                  letterSpacing: ".02em",
                  fontSize: 19,
                }}
              >
                Mire szórd, ha megjött
              </p>
            }
          />
        </div>
      </section>
    </>
  );
}
