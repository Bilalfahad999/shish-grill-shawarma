import { RESTAURANT_CONFIG } from "@/config/restaurant";

export interface CateringEnquiry {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  guestCount: string;
  date: string;
  time: string;
  collectionType: "pickup" | "delivery";
  venueAddress?: string;
  budget?: string;
  specialRequests?: string;
}

// Template sent to the customer
export function buildCustomerEmailText(e: CateringEnquiry): string {
  return `Hi ${e.name},

Thank you for your catering enquiry with ${RESTAURANT_CONFIG.name}!

We've received your request and our team will be in touch within 24 hours to confirm details and pricing.

─── Your Enquiry Details ───────────────────────────────

Event Type:     ${e.eventType}
Guest Count:    ${e.guestCount}
Date:           ${e.date}
Time:           ${e.time}
Collection:     ${e.collectionType === "pickup" ? "Pickup" : `Delivery to ${e.venueAddress}`}
${e.budget ? `Budget:         ${e.budget}` : ""}
${e.specialRequests ? `\nSpecial Requests:\n${e.specialRequests}` : ""}

────────────────────────────────────────────────────────

If you have any urgent questions, feel free to call us directly:
${RESTAURANT_CONFIG.phone}

We look forward to catering your event!

Warm regards,
The Shish Team
${RESTAURANT_CONFIG.address}
`;
}

// Template sent to the restaurant
export function buildRestaurantEmailText(e: CateringEnquiry): string {
  return `New Catering Enquiry

─── Customer Details ────────────────────────────────────

Name:    ${e.name}
Phone:   ${e.phone}
Email:   ${e.email}

─── Event Details ───────────────────────────────────────

Event Type:     ${e.eventType}
Guest Count:    ${e.guestCount}
Date:           ${e.date}
Time:           ${e.time}
Collection:     ${e.collectionType === "pickup" ? "Pickup" : "Delivery"}
${e.collectionType === "delivery" && e.venueAddress ? `Venue Address:  ${e.venueAddress}` : ""}
${e.budget ? `Budget:         ${e.budget}` : ""}
${e.specialRequests ? `\nSpecial Requests:\n${e.specialRequests}` : ""}

────────────────────────────────────────────────────────

Please respond to the customer within 24 hours.
`;
}
