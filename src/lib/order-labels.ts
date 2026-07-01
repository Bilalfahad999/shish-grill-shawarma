// Canonical display labels for order pickup times and payment methods.
// Single source of truth — previously duplicated across email templates, the PDF
// receipt, WhatsApp messages, OrderReview, and the order success page.

export const PICKUP_LABELS: Record<string, string> = {
  asap: "ASAP (~20 min)",
  "15": "In 15 minutes",
  "30": "In 30 minutes",
  "45": "In 45 minutes",
  "60": "In 60 minutes",
};

export const PAYMENT_LABELS: Record<string, string> = {
  card: "Credit / Debit Card",
  apple_pay: "Apple Pay",
  google_pay: "Google Pay",
  cash: "Cash on Pickup",
};

export function formatPaymentMethod(method: string): string {
  return PAYMENT_LABELS[method] ?? method;
}
