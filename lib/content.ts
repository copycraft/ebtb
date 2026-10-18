import type { CSSProperties } from "react";

export const tickerItems = [
  "Ingyenes szállítás 15 000 Ft-tól",
  "Újdonság: Chili Everything",
  "Csak itt, a saját webshopunkban",
];

export const claimItems = [
  "Szezám + mák + fokhagyma",
  "Bagel nélkül, mindig",
  "Kis tétel, nagy szórás",
  "Magyarország első EBTB-je",
];

export const firstItems = [
  "Elsőként a piacon",
  "Mi definiáljuk a kategóriát",
  "Kompromisszumok nélkül",
  "0 bagel",
];

/** Top bar. Each item is its own page; the home page carries a short version of each. */
export const navItems = [
  { label: "Bolt", href: "/bolt" },
  { label: "Receptek", href: "/receptek" },
  { label: "Rólunk", href: "/rolunk" },
  { label: "Követés", href: "/kovetes" },
];

export const heroSpecs = ["6 ÖSSZETEVŐ", "0 BAGEL", "2 NAP ALATT NÁLAD"];

/** The five starter ideas on the home page. Each opens the recipe that shows it off. */
export const uses = [
  { title: "A reggeli rántottádra", shot: "Rántotta tányéron, felülről", recipe: "everything-rantotta" },
  { title: "A következő salátádba", shot: "Zöld saláta, közelkép", recipe: "kecskesajtos-salata" },
  { title: "Friss túróra", shot: "Túrókrém tálban, retekkel", recipe: "turo-retekkel" },
  { title: "Sült zöldségekre", shot: "Sült zöldségek tepsiben", recipe: "sult-zoldseg-tepsi" },
  { title: "Dipekbe keverve", shot: "Krém tálban, kanállal", recipe: "joghurtos-martogatos" },
];

export const footerColumns = [
  {
    title: "Webshop",
    links: [
      { label: "Keverékek", href: "/bolt" },
      { label: "Utántöltő", href: "/termekek/utantolto" },
      { label: "Receptek", href: "/receptek" },
    ],
  },
  {
    title: "Segítség",
    links: [
      { label: "Szállítás", href: "/szallitas" },
      { label: "Visszaküldés", href: "/szallitas#visszakuldes" },
      { label: "Kapcsolat", href: "/kapcsolat" },
    ],
  },
  {
    title: "EBTB",
    links: [
      { label: "Rólunk", href: "/rolunk" },
      { label: "Nagyker", href: "/kapcsolat?tema=nagyker" },
    ],
  },
];

export const legalLinks = [
  { label: "ÁSZF", href: "/aszf" },
  { label: "Adatvédelem", href: "/adatvedelem" },
  { label: "Impresszum", href: "/impresszum" },
];

const SEED_COLORS = ["#241C33", "#FFCB61", "#FFFDF7", "#241C33", "#A8D45A", "#FFCB61", "#241C33"];

/** Falling seed specks scattered over the hero art. */
export const seeds: CSSProperties[] = SEED_COLORS.map((background, i) => ({
  position: "absolute",
  top: `${6 + i * 11}%`,
  left: `${8 + ((i * 27) % 80)}%`,
  width: 4 + (i % 3) * 2,
  height: 4 + (i % 2) * 3,
  borderRadius: 999,
  background,
  opacity: 0.55,
  animationDelay: `${(i * 0.42).toFixed(2)}s`,
}));
