/** Parse "$28" or "From $28" → 28 */
export function parsePrice(priceStr: string): number {
  const match = priceStr.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatPriceShort(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}
