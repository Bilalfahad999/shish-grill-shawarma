"use client";

import { useEffect, useState } from "react";
import { getSettings } from "@/lib/actions/content";
import { getOpeningHours } from "@/lib/actions/content";
import { RESTAURANT_CONFIG } from "@/config/restaurant";
import type { RestaurantSettings, OpeningHour } from "@/types/admin";

// Static fallback shown until the live admin-managed data loads, so there's no
// layout shift or blank state on first paint.
const FALLBACK_SETTINGS: RestaurantSettings = {
  id: "main",
  name: RESTAURANT_CONFIG.name,
  phone: RESTAURANT_CONFIG.phone,
  email: RESTAURANT_CONFIG.email,
  address: RESTAURANT_CONFIG.address,
  googleMapsUrl: RESTAURANT_CONFIG.googleMapsUrl,
  whatsappNumber: RESTAURANT_CONFIG.whatsappNumber,
  instagramUrl: "https://www.instagram.com/shish_shawarma_grill/?hl=en",
  facebookUrl: "",
  tiktokUrl: "",
  logoUrl: null,
  faviconUrl: null,
  seoTitle: null,
  seoDescription: null,
  deliveryFee: RESTAURANT_CONFIG.deliveryFee,
  minDelivery: RESTAURANT_CONFIG.minDeliveryOrder,
  preparationTime: RESTAURANT_CONFIG.preparationTime,
  deliveryTime: RESTAURANT_CONFIG.deliveryTime,
};

const FALLBACK_HOURS: OpeningHour[] = [
  { id: "mon", day: "Monday", open: "11:00", close: "22:00", closed: false },
  { id: "tue", day: "Tuesday", open: "11:00", close: "22:00", closed: false },
  { id: "wed", day: "Wednesday", open: "11:00", close: "22:00", closed: false },
  { id: "thu", day: "Thursday", open: "11:00", close: "22:00", closed: false },
  { id: "fri", day: "Friday", open: "11:00", close: "23:00", closed: false },
  { id: "sat", day: "Saturday", open: "11:00", close: "23:00", closed: false },
  { id: "sun", day: "Sunday", open: "12:00", close: "21:30", closed: false },
];

/** Live restaurant settings + opening hours, sourced from the admin dashboard. */
export function useSiteSettings() {
  const [settings, setSettings] = useState<RestaurantSettings>(FALLBACK_SETTINGS);
  const [hours, setHours] = useState<OpeningHour[]>(FALLBACK_HOURS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [liveSettings, liveHours] = await Promise.all([getSettings(), getOpeningHours()]);
      if (!cancelled) {
        setSettings(liveSettings);
        setHours(liveHours);
        setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { settings, hours, loaded };
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${period}` : `${hour12}:${String(m).padStart(2, "0")}${period}`;
}

/** Formats an OpeningHour as "11:00 AM – 10:00 PM", or "Closed". */
export function formatHoursRange(hour: OpeningHour): string {
  if (hour.closed) return "Closed";
  return `${formatTime(hour.open)} – ${formatTime(hour.close)}`;
}

const DAY_ABBR: Record<string, string> = {
  Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu",
  Friday: "Fri", Saturday: "Sat", Sunday: "Sun",
};

/** Groups consecutive days sharing the same hours into a single line, e.g. "Mon – Thu: 11am – 10pm" */
export function groupHours(hours: OpeningHour[]): { label: string; time: string }[] {
  const groups: { label: string; time: string }[] = [];
  for (const h of hours) {
    const time = formatHoursRange(h);
    const last = groups[groups.length - 1];
    if (last && last.time === time) {
      const [start] = last.label.split(" – ");
      last.label = `${start} – ${DAY_ABBR[h.day] ?? h.day}`;
    } else {
      groups.push({ label: DAY_ABBR[h.day] ?? h.day, time });
    }
  }
  return groups;
}
