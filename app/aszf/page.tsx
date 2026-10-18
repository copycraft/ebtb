import type { Metadata } from "next";
import Link from "next/link";
import { Fill, LegalPage } from "@/components/LegalPage";
import { company } from "@/lib/legal";
import { formatHuf } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Általános szerződési feltételek", alternates: { canonical: "/aszf" } };

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Jogi információk" title="Általános szerződési feltételek">
      <p>
        <Fill>[A teljes ÁSZF szövegét jogász készítse el vagy ellenőrizze. Az alábbi vázlat a kötelező fejezeteket és a webshop működését rögzíti.]</Fill>
      </p>

      <h2>1. A szolgáltató</h2>
      <p>
        <Fill>{company.name}</Fill>, <Fill>{company.seat}</Fill>, <Fill>{company.registry}</Fill>, <Fill>{company.taxId}</Fill>. E-mail:{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>. A részletes adatok az <Link href="/impresszum">Impresszumban</Link> olvashatók.
      </p>

      <h2>2. A szerződés tárgya és létrejötte</h2>
      <p>
        Az ÁSZF az EBTB fűszerkeverékek online értékesítésére vonatkozik. A kosarat ezen az oldalon állítod össze, a rendelést és a fizetést a
        webáruházunk pénztárában véglegesíted. A szerződés a rendelés visszaigazolásával jön létre, magyar nyelven, és nem minősül írásba foglalt
        szerződésnek.
      </p>

      <h2>3. Árak</h2>
      <p>Minden ár forintban értendő, és tartalmazza az áfát. A szállítási díjat a pénztár a rendelés véglegesítése előtt külön megmutatja.</p>

      <h2>4. Fizetés</h2>
      <p>
        <Fill>[Elfogadott fizetési módok: pl. bankkártya a … szolgáltatón keresztül, utánvét.]</Fill>
      </p>

      <h2>5. Szállítás</h2>
      <p>
        Jelenleg Magyarországra szállítunk. {`${formatHuf(site.freeShippingHuf)} feletti rendelésnél a szállítás ingyenes.`} A részletek a{" "}
        <Link href="/szallitas">Szállítás</Link> oldalon vannak.
      </p>

      <h2>6. Elállási jog</h2>
      <p>
        Fogyasztóként a termék átvételétől számított 14 napon belül indoklás nélkül elállhatsz a vásárlástól (45/2014. (II. 26.) Korm. rendelet).
      </p>
      <p>
        <Fill>
          [Jogász döntse el: a zárt csomagolású, felbontás után egészségvédelmi vagy higiéniai okból vissza nem küldhető termékekre a rendelet 29. § (1)
          e) pontja szerinti kivétel alkalmazható-e, és ezt hogyan kell itt rögzíteni.]
        </Fill>
      </p>
      <p>
        Az elállás menete a <Link href="/szallitas#visszakuldes">Visszaküldés</Link> részben olvasható.
      </p>

      <h2>7. Kellék- és termékszavatosság</h2>
      <p>
        <Fill>[Szavatossági jogok a Ptk. és a 151/2003. / 19/2014. NGM rendelet szerint — jogász töltse ki.]</Fill>
      </p>

      <h2>8. Panaszkezelés</h2>
      <p>
        Panaszodat a <a href={`mailto:${company.email}`}>{company.email}</a> címen jelezheted, 30 napon belül írásban válaszolunk. Ha nem sikerül
        megegyeznünk, a lakóhelyed szerint illetékes békéltető testülethez fordulhatsz: <Fill>{company.conciliationBoard}</Fill>.
      </p>

      <h2>9. Adatkezelés</h2>
      <p>
        A személyes adatok kezeléséről az <Link href="/adatvedelem">Adatkezelési tájékoztató</Link> szól.
      </p>
    </LegalPage>
  );
}
