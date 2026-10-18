import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm, ContactFormFromUrl } from "@/components/ContactForm";
import { Card, SectionHeading } from "@/components/ds";
import { company } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Kérdés a rendelésről, nagyker vagy sajtó — írj nekünk, két munkanapon belül válaszolunk.",
  alternates: { canonical: "/kapcsolat" },
};

const fact = {
  margin: 0,
  fontFamily: "var(--font-mono)",
  fontSize: "var(--type-label-sm)",
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--poppy-700)",
} as const;

export default function ContactPage() {
  return (
    <section
      aria-label="Kapcsolat"
      style={{
        padding: "clamp(32px,5vw,72px) var(--gutter-inline) var(--section-y)",
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        gap: "clamp(28px,4vw,56px)",
        alignItems: "start",
      }}
    >
      <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <SectionHeading eyebrow="Kapcsolat" title="Írj nekünk" align="left">
          Rendelés, szállítás, nagyker vagy csak egy jó recept — két munkanapon belül válaszolunk.
        </SectionHeading>
        <Card tone="garlic" padding={24} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={fact}>E-mail</p>
          <a href={`mailto:${company.email}`} style={{ color: "var(--poppy-800)", fontWeight: 700, fontSize: 18, textDecoration: "underline" }}>
            {company.email}
          </a>
          <p style={{ ...fact, marginTop: 10 }}>Nagyker</p>
          <p style={{ margin: 0, fontSize: "var(--type-body-md)", lineHeight: 1.5 }}>
            Üzleteknek, kávézóknak, delikáteszeknek: válaszd a „Nagyker” témát, és küldünk árlistát.
          </p>
        </Card>
      </div>
      <div data-reveal>
        <Suspense fallback={<ContactForm />}>
          <ContactFormFromUrl />
        </Suspense>
      </div>
    </section>
  );
}
