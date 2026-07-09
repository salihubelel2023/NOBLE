/**
 * Central price formatter. Every price in the app should be rendered through
 * this function rather than hand-built strings, so currency/locale is a
 * one-file change if NOBLE's market changes.
 */
export function formatPrice(amount: number, currency: string = "USD", locale: string = "en-US") {
  const hasFraction = amount % 1 !== 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }).format(amount);
}
