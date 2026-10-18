/**
 * Company details used across the legal pages, contact page and footer.
 * Every `[…]` value is a placeholder: fill these in before launch.
 */
export const company = {
  name: "[Cégnév Kft.]",
  seat: "[Székhely: irányítószám, város, utca, házszám]",
  registry: "[Cégjegyzékszám: 01-09-000000]",
  taxId: "[Adószám: 00000000-0-00]",
  email: "hello@ebtb.hu",
  phone: "[+36 00 000 0000]",
  foodRegistration: "[NÉBIH élelmiszer-vállalkozás nyilvántartási szám]",
  host: {
    name: "[Tárhelyszolgáltató neve]",
    address: "[Tárhelyszolgáltató címe]",
    email: "[tarhely@pelda.hu]",
  },
  shippingFee: "[0 000 Ft]",
  carrier: "[Futárszolgálat neve]",
  conciliationBoard: "[Illetékes békéltető testület neve, címe, elérhetősége]",
  updated: "2026-10-18",
};

/** True for values still in `[placeholder]` form, so pages can highlight them. */
export function isPlaceholder(v: string) {
  return v.startsWith("[") && v.endsWith("]");
}
