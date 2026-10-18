import type { Metadata } from "next";
import Link from "next/link";
import { Fill, LegalPage } from "@/components/LegalPage";
import { formatHuf } from "@/lib/format";
import { company } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Szállítás és visszaküldés",
  description: `Két munkanapon belül feladjuk, ${formatHuf(site.freeShippingHuf)} felett ingyen szállítunk.`,
  alternates: { canonical: "/szallitas" },
};

export default function ShippingPage() {
  return (
    <LegalPage eyebrow="Segítség" title="Szállítás és visszaküldés">
      <h2>Mikor ér oda?</h2>
      <p>A rendelést két munkanapon belül feladjuk. A futár általában a feladást követő munkanapon kézbesít.</p>

      <h2>Mennyibe kerül?</h2>
      <ul>
        <li>{`${formatHuf(site.freeShippingHuf)} felett: ingyenes.`}</li>
        <li>
          Alatta: <Fill>{company.shippingFee}</Fill> egységes díj.
        </li>
        <li>
          Futár: <Fill>{company.carrier}</Fill>.
        </li>
      </ul>
      <p>Jelenleg csak Magyarországra szállítunk. Az EU hamarosan jön.</p>

      <h2 id="visszakuldes">Visszaküldés</h2>
      <p>
        Ha meggondoltad magad, a csomag átvételétől számított 14 napon belül írj a{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a> címre a rendelésszámmal. Visszaírjuk, hova küldd a terméket.
      </p>
      <p>
        <Fill>[A felbontott tégelyekre vonatkozó szabályt az ÁSZF 6. pontjával összhangban kell megadni.]</Fill>
      </p>
      <p>
        Ha sérülten érkezett vagy hibás, fotózd le, és írj nekünk — cserélünk vagy visszautaljuk az árát. Részletek az{" "}
        <Link href="/aszf">ÁSZF-ben</Link>.
      </p>
    </LegalPage>
  );
}
