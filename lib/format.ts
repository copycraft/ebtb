/** "3 490 Ft" — space-grouped on every thousand, unlike hu-HU Intl which skips 4-digit numbers. */
export function formatHuf(n: number) {
  return `${Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`;
}
