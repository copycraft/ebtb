import type { Metadata } from "next";
import Link from "next/link";
import { Fill, LegalPage } from "@/components/LegalPage";
import { company } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description: "Milyen adatot kezelünk, miért, meddig, és milyen jogaid vannak.",
  alternates: { canonical: "/adatvedelem" },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Jogi információk" title="Adatkezelési tájékoztató">
      <p>
        Ez a tájékoztató az EU általános adatvédelmi rendelete (GDPR) és az Infotv. alapján írja le, hogyan kezeljük a személyes adataidat. Röviden: csak
        azt kérjük el, ami a feladathoz kell, és nem adjuk el senkinek.
      </p>

      <h2>Az adatkezelő</h2>
      <p>
        <Fill>{company.name}</Fill>, <Fill>{company.seat}</Fill>. E-mail: <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>

      <h2>Hírlevél</h2>
      <ul>
        <li>Kezelt adat: e-mail cím, a feliratkozás ideje és forrása.</li>
        <li>Cél: havi levél receptekkel és újdonságokkal.</li>
        <li>Jogalap: a hozzájárulásod (GDPR 6. cikk (1) a)).</li>
        <li>Időtartam: amíg le nem iratkozol — minden levél alján egy kattintás.</li>
      </ul>

      <h2>Kapcsolatfelvétel</h2>
      <ul>
        <li>Kezelt adat: név, e-mail cím, cégnév (ha megadod), az üzenet tartalma.</li>
        <li>Cél: a megkeresésed megválaszolása.</li>
        <li>Jogalap: a hozzájárulásod (GDPR 6. cikk (1) a)).</li>
        <li>
          Időtartam: <Fill>[a megkeresés lezárásától számított 1 év]</Fill>.
        </li>
      </ul>

      <h2>Vásárlás</h2>
      <p>
        A rendelés és a fizetés a webáruházunkban (WooCommerce) történik. Ott kezeljük a nevedet, szállítási és számlázási címedet, e-mail címedet,
        telefonszámodat és a rendelés adatait.
      </p>
      <ul>
        <li>Jogalap: szerződés teljesítése (GDPR 6. cikk (1) b)), a számlázásnál jogi kötelezettség (6. cikk (1) c)).</li>
        <li>Időtartam: a számviteli bizonylatokat a számviteli törvény szerint 8 évig őrizzük.</li>
      </ul>

      <h2>Adatfeldolgozók</h2>
      <p>Ezek a partnerek a nevünkben, a mi utasításunk szerint kezelnek adatot:</p>
      <ul>
        <li>
          Tárhely: <Fill>{company.host.name}</Fill>
        </li>
        <li>
          Hírlevélküldő: <Fill>[szolgáltató neve, pl. Brevo / Mailchimp]</Fill>
        </li>
        <li>Spamvédelem: Cloudflare, Inc. (Turnstile) — az űrlapoknál ellenőrzi, hogy ember küldi-e.</li>
        <li>
          Szállítás: <Fill>{company.carrier}</Fill>
        </li>
        <li>
          Online fizetés: <Fill>[fizetési szolgáltató neve]</Fill>
        </li>
      </ul>

      <h2 id="sutik">Sütik és helyi tárolás</h2>
      <p>Jelenleg csak a működéshez szükséges dolgokat tárolunk a böngésződben:</p>
      <ul>
        <li>
          <code>ebtb-cart-v1</code> — a kosarad tartalma, amíg a pénztárhoz nem érsz.
        </li>
        <li>
          <code>ebtb-consent-v1</code> — hogy mit választottál a sütibannerben.
        </li>
        <li>Cloudflare Turnstile — az űrlapok spamvédelméhez szükséges technikai adatok.</li>
      </ul>
      <p>
        Statisztikai vagy hirdetési sütit csak a hozzájárulásoddal használnánk. A döntésedet bármikor megváltoztathatod a lábléc „Sütibeállítások” linkjével.
      </p>

      <h2>A jogaid</h2>
      <p>
        Kérheted, hogy tájékoztassunk a rólad kezelt adatokról, javítsuk, töröljük vagy korlátozzuk a kezelésüket, illetve hogy hordozható formában
        kiadjuk őket. A hozzájárulásodat bármikor visszavonhatod. Írj a <a href={`mailto:${company.email}`}>{company.email}</a> címre, egy hónapon belül
        válaszolunk.
      </p>
      <p>
        Ha úgy érzed, megsértettük a jogaidat, panaszt tehetsz a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (
        <a href="https://naih.hu" target="_blank" rel="noopener">
          naih.hu
        </a>
        ), vagy bírósághoz fordulhatsz.
      </p>
      <p>
        Kapcsolódó: <Link href="/aszf">Általános szerződési feltételek</Link>, <Link href="/impresszum">Impresszum</Link>.
      </p>
    </LegalPage>
  );
}
