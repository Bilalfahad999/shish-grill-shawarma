import type { Order } from "@/types/order";
import { formatPriceShort } from "@/lib/price";
import { PICKUP_LABELS, PAYMENT_LABELS } from "@/lib/order-labels";
import { emailLayout, emailDivider, emailRow } from "./layout";

function itemsTable(order: Order): string {
  const rows = order.items
    .map((item) => {
      const extrasTotal = item.extras.reduce((s, e) => s + e.price * e.quantity, 0);
      const lineTotal = (item.basePrice + extrasTotal) * item.quantity;
      const extrasText = item.extras.filter((e) => e.quantity > 0).map((e) => `${e.name}${e.quantity > 1 ? ` ×${e.quantity}` : ""}`).join(", ");
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #F2ECE3;color:#2F2F2F;font-size:13px;">
          <strong>${item.quantity}× ${item.name}</strong>
          ${extrasText ? `<div style="color:#6B6355;font-size:12px;margin-top:2px;">+ ${extrasText}</div>` : ""}
          ${item.notes ? `<div style="color:#6B6355;font-size:12px;margin-top:2px;font-style:italic;">Note: ${item.notes}</div>` : ""}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #F2ECE3;color:#2F2F2F;font-size:13px;text-align:right;white-space:nowrap;">${formatPriceShort(lineTotal)}</td>
      </tr>`;
    })
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
    ${rows}
    <tr><td style="padding:10px 0 2px;color:#6B6355;font-size:13px;">Subtotal</td><td style="padding:10px 0 2px;text-align:right;color:#2F2F2F;font-size:13px;">${formatPriceShort(order.subtotal)}</td></tr>
    ${order.deliveryFee > 0 ? `<tr><td style="padding:2px 0;color:#6B6355;font-size:13px;">Delivery Fee</td><td style="padding:2px 0;text-align:right;color:#2F2F2F;font-size:13px;">${formatPriceShort(order.deliveryFee)}</td></tr>` : ""}
    ${order.discount > 0 ? `<tr><td style="padding:2px 0;color:#6E8B5C;font-size:13px;">Discount${order.coupon ? ` (${order.coupon.code})` : ""}</td><td style="padding:2px 0;text-align:right;color:#6E8B5C;font-size:13px;">−${formatPriceShort(order.discount)}</td></tr>` : ""}
    <tr><td style="padding:10px 0 0;color:#2F2F2F;font-size:15px;font-weight:700;border-top:1px solid #E5DDD0;">Total</td><td style="padding:10px 0 0;text-align:right;color:#B54E32;font-size:17px;font-weight:700;border-top:1px solid #E5DDD0;">${formatPriceShort(order.total)}</td></tr>
  </table>`;
}

export function customerOrderConfirmationEmail(order: Order): { subject: string; html: string } {
  const fulfilment =
    order.orderType === "pickup"
      ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${emailRow("Pickup Time", PICKUP_LABELS[order.pickupTime] ?? order.pickupTime)}</table>`
      : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${emailRow("Delivery Address", `${order.deliveryAddress?.street}, ${order.deliveryAddress?.suburb} ${order.deliveryAddress?.postcode}`)}
          ${order.deliveryAddress?.notes ? emailRow("Delivery Notes", order.deliveryAddress.notes) : ""}
        </table>`;

  const body = `
    <p style="margin:0 0 8px;color:#2F2F2F;font-size:14px;line-height:1.6;">Hi ${order.customer.name},</p>
    <p style="margin:0 0 4px;color:#2F2F2F;font-size:14px;line-height:1.6;">Thanks for your order! We've started preparing it fresh.</p>

    <div style="background-color:#F2ECE3;border-radius:12px;padding:14px 16px;margin:18px 0;">
      <p style="margin:0;color:#6B6355;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Order Reference</p>
      <p style="margin:2px 0 0;color:#B54E32;font-size:16px;font-weight:700;font-family:monospace;">${order.id}</p>
    </div>

    ${fulfilment}
    ${emailDivider()}
    ${itemsTable(order)}
    ${emailDivider()}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${emailRow("Order Type", order.orderType === "pickup" ? "Pickup" : "Delivery")}
      ${emailRow("Payment", PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod)}
    </table>
  `;

  return {
    subject: `Order Confirmed — ${order.id}`,
    html: emailLayout({
      heading: "Your order is confirmed!",
      subheading: `We're preparing it now. ${order.orderType === "pickup" ? "We'll have it ready for pickup soon." : "It'll be on its way shortly."}`,
      bodyHtml: body,
      preheader: `Order ${order.id} confirmed — total ${formatPriceShort(order.total)}`,
    }),
  };
}

export function restaurantOrderNotificationEmail(order: Order): { subject: string; html: string } {
  const fulfilment =
    order.orderType === "pickup"
      ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${emailRow("Pickup Time", PICKUP_LABELS[order.pickupTime] ?? order.pickupTime)}</table>`
      : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${emailRow("Delivery Address", `${order.deliveryAddress?.street}, ${order.deliveryAddress?.suburb} ${order.deliveryAddress?.postcode}`)}
          ${order.deliveryAddress?.notes ? emailRow("Delivery Notes", order.deliveryAddress.notes) : ""}
        </table>`;

  const body = `
    <div style="background-color:#B54E32;border-radius:12px;padding:14px 16px;margin:0 0 18px;">
      <p style="margin:0;color:rgba(255,255,255,0.85);font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">New Order</p>
      <p style="margin:2px 0 0;color:#ffffff;font-size:16px;font-weight:700;font-family:monospace;">${order.id}</p>
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${emailRow("Customer", order.customer.name)}
      ${emailRow("Phone", order.customer.phone)}
      ${order.customer.email ? emailRow("Email", order.customer.email) : ""}
      ${emailRow("Order Type", order.orderType === "pickup" ? "Pickup" : "Delivery")}
    </table>
    ${fulfilment}
    ${emailDivider()}
    ${itemsTable(order)}
    ${emailDivider()}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${emailRow("Payment Method", PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod)}
    </table>
  `;

  return {
    subject: `🔔 New Order — ${order.id} (${formatPriceShort(order.total)})`,
    html: emailLayout({
      heading: "New order received",
      subheading: "Please confirm and begin preparation.",
      bodyHtml: body,
      preheader: `New order from ${order.customer.name} — ${formatPriceShort(order.total)}`,
    }),
  };
}
