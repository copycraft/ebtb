import Link from "next/link";

/** The data-processing consent sentence, with its link. Shared by every form. */
export function ConsentLabel({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <>
      Elolvastam és elfogadom az{" "}
      <Link
        href="/adatvedelem"
        target="_blank"
        style={{ color: tone === "light" ? "var(--garlic-300)" : "var(--text-link)", textDecoration: "underline", textUnderlineOffset: 3 }}
      >
        adatkezelési tájékoztatót
      </Link>
      .
    </>
  );
}
