import type { CateringEnquiry } from "@/lib/catering-email";
import { emailLayout, emailDivider, emailRow } from "./layout";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

export function customerCateringConfirmationEmail(e: CateringEnquiry): { subject: string; html: string } {
  const body = `
    <p style="margin:0 0 8px;color:#2F2F2F;font-size:14px;line-height:1.6;">Hi ${e.name},</p>
    <p style="margin:0 0 18px;color:#2F2F2F;font-size:14px;line-height:1.6;">Thank you for your catering enquiry! Our team will be in touch within 24 hours to confirm details and pricing.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${emailRow("Event Type", e.eventType)}
      ${emailRow("Guest Count", e.guestCount)}
      ${emailRow("Date", e.date)}
      ${emailRow("Time", e.time)}
      ${emailRow("Collection", e.collectionType === "pickup" ? "Pickup" : `Delivery to ${e.venueAddress ?? "—"}`)}
      ${e.budget ? emailRow("Budget", e.budget) : ""}
    </table>
    ${e.specialRequests ? `${emailDivider()}<p style="margin:0 0 4px;color:#6B6355;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Special Requests</p><p style="margin:0;color:#2F2F2F;font-size:13px;line-height:1.6;">${e.specialRequests}</p>` : ""}

    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #F2ECE3;">
      <p style="margin:0;color:#6B6355;font-size:13px;line-height:1.6;">Need to talk sooner? Call us directly at <strong style="color:#2F2F2F;">${RESTAURANT_CONFIG.phone}</strong>.</p>
    </div>
  `;

  return {
    subject: "Catering Enquiry Received — We'll Be in Touch Soon",
    html: emailLayout({
      heading: "Enquiry received!",
      subheading: "We're excited to be part of your event.",
      bodyHtml: body,
      preheader: `Catering enquiry for ${e.eventType} on ${e.date} received`,
    }),
  };
}

export function restaurantCateringNotificationEmail(e: CateringEnquiry): { subject: string; html: string } {
  const body = `
    <div style="background-color:#B54E32;border-radius:12px;padding:14px 16px;margin:0 0 18px;">
      <p style="margin:0;color:rgba(255,255,255,0.85);font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">New Catering Enquiry</p>
      <p style="margin:2px 0 0;color:#ffffff;font-size:16px;font-weight:700;">${e.eventType}</p>
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${emailRow("Name", e.name)}
      ${emailRow("Phone", e.phone)}
      ${emailRow("Email", e.email)}
    </table>
    ${emailDivider()}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${emailRow("Event Type", e.eventType)}
      ${emailRow("Guest Count", e.guestCount)}
      ${emailRow("Date", e.date)}
      ${emailRow("Time", e.time)}
      ${emailRow("Collection", e.collectionType === "pickup" ? "Pickup" : "Delivery")}
      ${e.collectionType === "delivery" && e.venueAddress ? emailRow("Venue Address", e.venueAddress) : ""}
      ${e.budget ? emailRow("Budget", e.budget) : ""}
    </table>
    ${e.specialRequests ? `${emailDivider()}<p style="margin:0 0 4px;color:#6B6355;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Special Requests</p><p style="margin:0;color:#2F2F2F;font-size:13px;line-height:1.6;">${e.specialRequests}</p>` : ""}

    <p style="margin:20px 0 0;color:#6B6355;font-size:13px;">Please respond to the customer within 24 hours.</p>
  `;

  return {
    subject: `🍽️ New Catering Enquiry — ${e.eventType} (${e.guestCount} guests)`,
    html: emailLayout({
      heading: "New catering enquiry",
      subheading: `From ${e.name}, for ${e.date}`,
      bodyHtml: body,
      preheader: `New catering enquiry from ${e.name} for ${e.eventType}`,
    }),
  };
}
