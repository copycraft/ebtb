import { Button, SectionHeading } from "@/components/ds";

export default function NotFound() {
  return (
    <section
      aria-label="Nincs ilyen oldal"
      style={{ padding: "var(--section-y) var(--gutter-inline)", display: "flex", flexDirection: "column", alignItems: "center", gap: 28, textAlign: "center" }}
    >
      <SectionHeading eyebrow="404" title="Ez az oldal nincs itt">
        Mint a bagel a tégelyben. Nézz körül inkább ezeken:
      </SectionHeading>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Button as="a" href="/bolt" size="lg">
          A bolt
        </Button>
        <Button as="a" href="/receptek" size="lg" variant="outline">
          Receptek
        </Button>
      </div>
    </section>
  );
}
