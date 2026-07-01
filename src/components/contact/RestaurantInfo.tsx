"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { useSiteSettings, formatHoursRange } from "@/hooks/useSiteSettings";

export function RestaurantInfo() {
  const { settings, hours } = useSiteSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-8"
    >
      <div>
        <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#D96C2F] mb-6">
          Find Us
        </p>

        <div className="space-y-5">
          <InfoRow icon={<MapPin size={18} />} label="Address">
            <p className="font-body text-sm text-[#2F2F2F] leading-relaxed">
              {settings.address}
            </p>
          </InfoRow>

          <InfoRow icon={<Phone size={18} />} label="Phone">
            <a
              href={`tel:${settings.phone}`}
              className="font-body text-sm text-[#2F2F2F] hover:text-[#B54E32] transition-colors"
            >
              {settings.phone}
            </a>
          </InfoRow>

          <InfoRow icon={<Mail size={18} />} label="Email">
            <a
              href={`mailto:${settings.email}`}
              className="font-body text-sm text-[#2F2F2F] hover:text-[#B54E32] transition-colors break-all"
            >
              {settings.email}
            </a>
          </InfoRow>

          <InfoRow icon={<Clock size={18} />} label="Opening Hours">
            <div className="space-y-1.5">
              {hours.map((h) => (
                <div key={h.id} className="flex justify-between gap-4">
                  <span className="font-body text-sm text-[#6B6355]">{h.day}</span>
                  <span className="font-body text-sm text-[#2F2F2F] font-medium">{formatHoursRange(h)}</span>
                </div>
              ))}
            </div>
          </InfoRow>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`tel:${settings.phone}`}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#B54E32] text-white font-body font-semibold text-sm hover:bg-[#D96C2F] transition-all duration-200 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
        >
          <Phone size={15} aria-hidden="true" />
          Call Now
        </a>
        <a
          href={settings.googleMapsUrl ?? "https://maps.google.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#B54E32] text-[#B54E32] font-body font-semibold text-sm hover:bg-[#B54E32]/8 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
        >
          <Navigation size={15} aria-hidden="true" />
          Get Directions
        </a>
      </div>
    </motion.div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-9 h-9 rounded-xl bg-[#B54E32]/10 flex items-center justify-center text-[#B54E32] shrink-0">
        {icon}
      </div>
      <div className="pt-1 flex-1">
        <p className="font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-[#6B6355] mb-1">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}
