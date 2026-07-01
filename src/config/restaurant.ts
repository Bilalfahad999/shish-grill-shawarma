import type { Coupon } from "@/types/order";

export const RESTAURANT_CONFIG = {
  name: "Shish Shawarma & Grill",
  phone: "+61XXXXXXXXX",
  whatsappNumber: "+61XXXXXXXXX", // Replace with real WhatsApp number
  email: "orders@sisshawarma.com.au",
  address: "[Street Address], Melbourne VIC 3000",
  googleMapsUrl: "https://maps.google.com",

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
    "Mon–Thu": "11:00 AM – 10:00 PM",
    "Fri–Sat": "11:00 AM – 11:00 PM",
    Sunday: "12:00 PM – 9:30 PM",
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
