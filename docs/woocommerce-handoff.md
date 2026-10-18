# Kosár → WooCommerce pénztár

A Next.js oldal csak a kosarat kezeli (böngészőben, `localStorage`-ban). A fizetés, a rendelés és a számlázás a WooCommerce-ben történik.
A „Tovább a pénztárhoz” gomb egyetlen linkkel adja át a kosarat:

```
https://bolt.ebtb.hu/?ebtb_cart=12:2,15:1
                              └─ WooCommerce termék ID : darab, vesszővel elválasztva
```

## Beállítás

1. **WordPress oldal:** másold a `docs/ebtb-cart-handoff.php` fájlt ide: `wp-content/mu-plugins/ebtb-cart-handoff.php`.
   A must-use pluginokat nem kell aktiválni. A plugin kiüríti a Woo kosarat, beteszi a termékeket, és a pénztárra irányít.
2. **Termék ID-k:** hozd létre a 4 terméket a WooCommerce-ben, és írd be az ID-jukat a `lib/content.ts`-ben a `wooId` mezőbe.
   Amíg bármelyik kosárban lévő termék ID-ja `null`, a pénztár gomb tiltva van („A pénztár hamarosan nyílik”).
3. **Next.js oldal:** állítsd be a `NEXT_PUBLIC_WOO_URL` környezeti változót (pl. `https://bolt.ebtb.hu`, perjel nélkül).

## Tudnivalók

- **Az ár a WooCommerce-ben dől el.** A Next.js oldal árai (`lib/content.ts`) csak megjelenítésre szolgálnak, tartsd őket szinkronban.
  Ha a Woo-ban kerül fel termék, később a Store API-ból (`/wp-json/wc/store/v1/products`) is olvashatók.
- **Ugyanaz a domain-család ajánlott** (`ebtb.hu` + `bolt.ebtb.hu`), hogy a látogató ne érezze „idegen oldalnak” a pénztárt.
- A WooCommerce pénztárban is kell az ÁSZF-elfogadás és az adatkezelési tájékoztató linkje: ezek a Woo beállításainál (Speciális → Oldalbeállítások) adhatók meg, mutathatnak a Next.js oldal `/aszf` és `/adatvedelem` oldalára.
- Sikeres rendelés után a Woo „Köszönjük” oldala fut. Tegyél oda egy „Vissza az EBTB-re” gombot erre a címre:
  `https://ebtb.hu/?rendeles=kesz`. Ez kiüríti a Next.js-es kosarat, és megköszöni a rendelést.

## Helyi fejlesztés

A teljes folyamat kipróbálható élő bolt nélkül: a `Paymenthandling/` mappában Docker Compose-os WordPress + WooCommerce fut
a Fluid Checkouttal, a csomagpont-pluginnal és álfizetéssel. Lásd: `Paymenthandling/README.md`.
