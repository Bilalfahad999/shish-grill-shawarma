import type { Order } from "@/types/order";
import { RESTAURANT_CONFIG } from "@/config/restaurant";
import { formatPriceShort } from "./price";
import { PICKUP_LABELS, formatPaymentMethod } from "./order-labels";

export function buildWhatsAppMessage(order: Order): string {
  const itemLines = order.items
    .map((item) => {
      let line = `• ${item.quantity}x ${item.name} — ${formatPriceShort(
        (item.basePrice + item.extras.reduce((s, e) => s + e.price * e.quantity, 0)) * item.quantity
      )}`;
      const extras = item.extras.filter((e) => e.quantity > 0);
      if (extras.length) {
        line += `\n  Extras: ${extras.map((e) => `${e.name}${e.quantity > 1 ? ` x${e.quantity}` : ""}`).join(", ")}`;
      }
      if (item.notes) line += `\n  Note: ${item.notes}`;
      return line;
    })
    .join("\n");

  const orderTypeSection =
    order.orderType === "pickup"
      ? `📍 *Order Type:* Pickup\n⏱ *Pickup Time:* ${PICKUP_LABELS[order.pickupTime] ?? order.pickupTime}`
      : [
          `🚚 *Order Type:* Delivery`,
          `📍 *Address:* ${order.deliveryAddress?.street}, ${order.deliveryAddress?.suburb} ${order.deliveryAddress?.postcode}`,
          order.deliveryAddress?.notes ? `📝 *Delivery Notes:* ${order.deliveryAddress.notes}` : "",
        ]
          .filter(Boolean)
          .join("\n");

  const lines = [
    `Hi ${RESTAURANT_CONFIG.name} 👋`,
    ``,
    `I'd like to place the following order:`,
    ``,
    itemLines,
    ``,
    `━━━━━━━━━━━━━━━━━`,
    orderTypeSection,
    ``,
    `👤 *Name:* ${order.customer.name}`,
    `📞 *Phone:* ${order.customer.phone}`,
    order.customer.email ? `✉️ *Email:* ${order.customer.email}` : "",
    ``,
    `💳 *Payment:* ${formatPaymentMethod(order.paymentMethod)}`,
    ``,
    `💰 *Subtotal:* ${formatPriceShort(order.subtotal)}`,
    order.discount > 0 ? `🏷️ *Discount:* -${formatPriceShort(order.discount)}` : "",
    order.deliveryFee > 0 ? `🚗 *Delivery Fee:* ${formatPriceShort(order.deliveryFee)}` : "",
    `✅ *Total: ${formatPriceShort(order.total)}*`,
    ``,
    `*Order #${order.id}*`,
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  return lines;
}

export function openWhatsApp(order: Order): void {
  const message = buildWhatsAppMessage(order);
  const encoded = encodeURIComponent(message);
  const number = RESTAURANT_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  window.open(`https://wa.me/${number}?text=${encoded}`, "_blank");
}

interface CateringEnquirySummary {
  name: string;
  eventType: string;
  guestCount: string;
  date: string;
  time: string;
  collectionType: "pickup" | "delivery";
  venueAddress?: string;
}

export function buildCateringWhatsAppMessage(e: CateringEnquirySummary): string {
  const lines = [
    `Hi ${RESTAURANT_CONFIG.name} 👋`,
    ``,
    `I just submitted a catering enquiry and wanted to follow up:`,
    ``,
    `🎉 *Event:* ${e.eventType}`,
    `👥 *Guests:* ${e.guestCount}`,
    `📅 *Date:* ${e.date} at ${e.time}`,
    `📍 *Collection:* ${e.collectionType === "pickup" ? "Pickup" : `Delivery to ${e.venueAddress ?? ""}`}`,
    ``,
    `👤 *Name:* ${e.name}`,
  ].join("\n");

  return lines;
}

export function openCateringWhatsApp(e: CateringEnquirySummary): void {
  const message = buildCateringWhatsAppMessage(e);
  const encoded = encodeURIComponent(message);
  const number = RESTAURANT_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  window.open(`https://wa.me/${number}?text=${encoded}`, "_blank");
}
