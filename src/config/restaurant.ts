import type { Coupon } from "@/types/order";

export const RESTAURANT_CONFIG = {
  name: "Shish Shawarma & Grill",
  phone: "+61 416 747 235",
  whatsappNumber: "+61 416 747 235",
  email: "shishshawarmagrill@gmail.com",
  address: "184 Widford St, Broadmeadows VIC 3047, Australia",
  googleMapsUrl:
    "https://maps.google.com/maps?q=184+Widford+St,+Broadmeadows+VIC+3047,+Australia",

  // Pricing
  deliveryFee: 5.0,
  minDeliveryOrder: 30,
  serviceFee: 0,
  taxRate: 0, // GST included in prices in AU

  // Timing
  preparationTime: 20, // minutes
  deliveryTime: 40, // minutes

  // Operating hours
  hours: {
    "Mon–Wed": "10:00 AM – 9:00 PM",
    "Thu–Sun": "10:00 AM – 12:00 AM",
  },

  // Pickup time slots
  pickupSlots: [
    { value: "asap", label: "ASAP (~20 min)" },
    { value: "15", label: "In 15 minutes" },
    { value: "30", label: "In 30 minutes" },
    { value: "45", label: "In 45 minutes" },
    { value: "60", label: "In 60 minutes" },
  ] as { value: string; label: string }[],

  // Promo codes (frontend validation only — move to server in Phase 4)
  coupons: [
    {
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      description: "10% off your first order",
    },
    {
      code: "SAVE5",
      type: "fixed",
      value: 5,
      description: "$5 off orders over $30",
    },
    {
      code: "SHISH15",
      type: "percentage",
      value: 15,
      description: "15% off — loyalty reward",
    },
  ] as Coupon[],
} as const;
