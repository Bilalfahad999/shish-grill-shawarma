"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { scaleIn } from "@/lib/motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const PLACEHOLDER_ADDRESS = "[Street Address], Melbourne VIC 3000";

/**
 * Converts whatever Google Maps URL the admin provides into an embeddable
 * iframe src using the ?output=embed trick — no API key required.
 *
 * Supports:
 *  - Regular place URLs:  https://www.google.com/maps/place/...
 *  - Search URLs:         https://maps.google.com/?q=...
 *  - Already-embed URLs:  https://www.google.com/maps/embed?...
 *  - Short links:         https://maps.app.goo.gl/... (falls back to address)
 */
function buildEmbedUrl(mapsUrl: string, address: string): string {
  // Already an embed URL — use as-is
  if (mapsUrl.includes("/maps/embed")) return mapsUrl;

  // Extract coordinates from a standard place URL
  // e.g. /@-37.8136,144.9631,17z
  const coordsMatch = mapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordsMatch) {
    const [, lat, lng] = coordsMatch;
    return `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
  }

  // Extract ?q= search query from the URL
  try {
    const url = new URL(mapsUrl);
    const q = url.searchParams.get("q");
    if (q) return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
  } catch {}

  // Fall back: use the address field from admin settings
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

export function GoogleMap() {
  const { settings } = useSiteSettings();

  const mapsUrl = settings.googleMapsUrl ?? "https://maps.google.com";
  const address = settings.address ?? PLACEHOLDER_ADDRESS;

  // Show the live map whenever admin has set a real address or maps link
  const hasRealLocation =
    address !== PLACEHOLDER_ADDRESS ||
    (mapsUrl !== "https://maps.google.com" && !mapsUrl.includes("maps.google.com") === false);

  const embedSrc = buildEmbedUrl(mapsUrl, address);

  return (
    <Reveal
      variants={scaleIn}
      className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden bg-[#E5DDD0] shadow-xl"
    >
      {hasRealLocation ? (
        <>
          <iframe
            key={embedSrc}
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${settings.name ?? "Shish Shawarma & Grill"} on Google Maps`}
            className="absolute inset-0 w-full h-full"
          />
          {/* "Open in Maps" overlay button */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#2F2F2F] font-body text-xs font-semibold shadow hover:bg-white transition-colors cursor-pointer"
            aria-label="Open location in Google Maps"
          >
            <ExternalLink size={11} />
            Open in Maps
          </a>
        </>
      ) : (
        // Placeholder shown until admin sets a real address in Settings
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#F2ECE3]">
          <div className="w-16 h-16 rounded-full bg-[#B54E32]/15 flex items-center justify-center">
            <MapPin size={32} className="text-[#B54E32]" aria-hidden="true" />
          </div>
          <div className="text-center px-6">
            <p className="font-heading text-xl font-semibold text-[#2F2F2F] mb-1">
              {settings.name}
            </p>
            <p className="font-body text-sm text-[#6B6355]">{address}</p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-2.5 rounded-full bg-[#B54E32] text-white font-body text-sm font-semibold hover:bg-[#D96C2F] transition-colors shadow-sm cursor-pointer"
          >
            Open in Google Maps
          </a>
        </div>
      )}
    </Reveal>
  );
}
