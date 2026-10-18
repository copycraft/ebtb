# Helyi WooCommerce pénztár (DUMMY fizetés)

Fejlesztői WordPress + WooCommerce a Next.js oldal mögé. A „Tovább a pénztárhoz” gomb ide irányít,
itt fut a Fluid Checkout pénztár a csomagpont-választóval, és egy **álfizetés** zárja a rendelést. Pénz nem mozdul.

```
Next.js kosár ──?ebtb_cart=101:2,104:1──▶ localhost:8080 (ebtb-cart-handoff) ──▶ /checkout (Fluid Checkout + csomagpont)
      ▲                                                                                   │ EBTB tesztfizetés
      └──────────── /?rendeles=kesz ◀── „Vissza az EBTB-re” ◀── Köszönjük oldal ◀─────────┘
```

## Indítás

```sh
cd Paymenthandling
docker compose up -d
docker compose run --rm wpcli bash /setup/setup.sh   # első alkalommal; újrafuttatható
```

Next.js oldalon a `.env.local`: `NEXT_PUBLIC_WOO_URL=http://localhost:8080`, majd `npm run dev`.

- Bolt: http://localhost:8080 · Admin: http://localhost:8080/wp-admin (`admin` / `admin`)
- Fizetésnél: „Sikeres fizetés” → a rendelés *Feldolgozás alatt*; „Elutasított kártya” → hibaüzenet, újrapróbálható.
- Nulláról újra: `docker compose down -v`, aztán a két fenti parancs.

## Mi van benne

| Fájl | Szerep |
| --- | --- |
| `fluid-checkout/`, `hungarian-pickup-points-for-woocommerce/` | a saját javított pluginok, bind mounttal — a módosításaid azonnal élnek |
| `../docs/ebtb-cart-handoff.php` | `?ebtb_cart=` → Woo kosár → pénztár (ugyanaz a fájl, ami élesbe megy; a `mu-plugins/ebtb-cart-handoff-loader.php` tölti be) |
| `mu-plugins/ebtb-checkout-skin.php` + `mu-plugins/ebtb-skin/` | az EBTB-dizájn a pénztáron és a Köszönjük oldalon: fejléc, ticker, színes terméklapkák, csomagpont-térkép; minden más WP-oldal a Next.js oldalra irányít (a kosár → `/?kosar=nyit`, ami kinyitja a kosarat) |
| `mu-plugins/ebtb-dummy-payment.php` | **csak fejlesztéshez** — álfizetési mód |
| `mu-plugins/ebtb-return-link.php` | „Vissza az EBTB-re” gomb a Köszönjük oldalon (`EBTB_SITE_URL`, alapból `http://localhost:3000`) |
| `setup/seed.php` | HUF, Magyarország, 4 termék **fix ID-val (101–104)** = `wooId` a `lib/content.ts`-ben, szállítás (GLS 1490 Ft, 15 000 Ft felett ingyenes, csomagpont 990 Ft), klasszikus shortcode-os pénztár, Storefront téma |

A stílus a `ebtb-skin/checkout.css`-ben van, a tokenek a Next.js `styles/ds/tokens/` másolatai — ha ott változik szín vagy betű, itt is írd át.
A `mu-plugins/` mappa egyben van felcsatolva, így a szerkesztések újraindítás nélkül élnek.

A csomagpont-listákat (Foxpost, Postapont, Packeta Z-BOX) a plugin a WP cronnal tölti le az első oldalbetöltések után, addig a térkép üres lehet.
Az árakat a Woo számolja — ha a `lib/content.ts`-ben árat változtatsz, a `seed.php`-ban is írd át és futtasd újra a setupot.

Élesben a `ebtb-dummy-payment.php` **ne** kerüljön fel; oda valódi fizetési mód (pl. SimplePay, Barion) jön.
