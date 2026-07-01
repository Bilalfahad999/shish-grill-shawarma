"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { useSiteSettings, groupHours } from "@/hooks/useSiteSettings";

export function Location() {
  const { settings, hours } = useSiteSettings();
  const hourGroups = groupHours(hours);

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-[#2F2F2F]"
      aria-labelledby="location-heading"
    >
      <Container>
        <div className="mb-12">
          <SectionTitle
            eyebrow="Find Us"
            title="Come Visit Us"
            subtitle="We're located right in the heart of Melbourne. Walk-ins always welcome."
            light
            id="location-heading"
            scrollAnimate
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#B54E32]/20 flex items-center justify-center text-[#D96C2F] shrink-0 mt-0.5">
                <MapPin size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-white mb-1">Address</h3>
                <p className="font-body text-white/65 leading-relaxed">
                  {settings.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#B54E32]/20 flex items-center justify-center text-[#D96C2F] shrink-0 mt-0.5">
                <Phone size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-white mb-1">Phone</h3>
                <a
                  href={`tel:${settings.phone}`}
                  className="font-body text-white/65 hover:text-[#D96C2F] transition-colors duration-200"
                >
                  {settings.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#B54E32]/20 flex items-center justify-center text-[#D96C2F] shrink-0 mt-0.5">
                <Clock size={20} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="font-body font-semibold text-white mb-3">Opening Hours</h3>
                <div className="space-y-2">
                  {hourGroups.map((h) => (
                    <div
                      key={h.label}
                      className="flex items-center justify-between gap-4 text-sm font-body"
                    >
                      <span className="text-white/55">{h.label}</span>
                      <span className="text-white/85 whitespace-nowrap">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <PrimaryButton
                as="a"
                href={settings.googleMapsUrl ?? "https://maps.google.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
                aria-label="Get directions on Google Maps"
              >
                <Navigation size={15} />
                Get Directions
              </PrimaryButton>
              <SecondaryButton
                as="a"
                href={`tel:${settings.phone}`}
                light
                className="gap-2"
              >
                <Phone size={15} />
                Call Us
              </SecondaryButton>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden h-80 lg:h-auto min-h-[320px] border border-white/10"
          >
            {/* Map placeholder — replace iframe src with actual Google Maps embed */}
            <iframe
              title="Shish Shawarma & Grill location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100156.45160897499!2d144.86705854101557!3d-37.81361080148487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6e39f9f0f47!2sMelbourne%20VIC!5e0!3m2!1sen!2sau!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%) contrast(105%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
            {/* Overlay pin label */}
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#B54E32] animate-pulse" aria-hidden="true" />
              <span className="font-body text-sm font-semibold text-[#2F2F2F]">
                Shish Shawarma & Grill
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
