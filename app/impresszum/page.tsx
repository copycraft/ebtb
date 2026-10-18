import type { Metadata } from "next";
import { Fill, LegalPage } from "@/components/LegalPage";
import { company } from "@/lib/legal";

export const metadata: Metadata = { title: "Impresszum", alternates: { canonical: "/impresszum" } };

export default function ImprintPage() {
  return (
    <LegalPage eyebrow="Jogi információk" title="Impresszum">
      <h2>Üzemeltető</h2>
      <p>
        <Fill>{company.name}</Fill>
        <br />
        <Fill>{company.seat}</Fill>
        <br />
        <Fill>{company.registry}</Fill>
        <br />
        <Fill>{company.taxId}</Fill>
        <br />
        <Fill>{company.foodRegistration}</Fill>
      </p>
      <h2>Elérhetőség</h2>
      <p>
        E-mail: <a href={`mailto:${company.email}`}>{company.email}</a>
        <br />
        Telefon: <Fill>{company.phone}</Fill>
      </p>
      <h2>Tárhelyszolgáltató</h2>
      <p>
        <Fill>{company.host.name}</Fill>
        <br />
        <Fill>{company.host.address}</Fill>
        <br />
        <Fill>{company.host.email}</Fill>
      </p>
      <h2>Szerzői jog</h2>
      <p>Az oldal szövegei, fotói és grafikai elemei az üzemeltető tulajdonában állnak. Engedély nélkül nem másolhatók.</p>
    </LegalPage>
  );
}
