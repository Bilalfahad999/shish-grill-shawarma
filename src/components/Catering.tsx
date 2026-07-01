"use client";

import { motion } from "framer-motion";
import { Users, CheckCircle, Phone } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const features = [
  "Corporate events & office lunches",
  "Weddings & private celebrations",
  "Community & cultural events",
  "Customisable menus for any group size",
  "Full setup and serving options available",
  "100% Halal — suitable for all guests",
];

export function Catering() {
  const { settings } = useSiteSettings();

  return (
    <section
      id="catering"
      className="py-20 sm:py-28 bg-[#F2ECE3]"
      aria-labelledby="catering-heading"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="space-y-8"
          >
            <SectionTitle
              eyebrow="Catering Services"
              title="We Bring the Feast to You"
              subtitle="From intimate family dinners to large corporate events, our catering service delivers the full Shish experience directly to your venue."
              id="catering-heading"
              scrollAnimate
            />

            <ul className="space-y-3" role="list" aria-label="Catering features">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="text-[#6E8B5C] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="font-body text-sm text-[#6B6355] leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <PrimaryButton as="a" href="/catering" className="gap-2">
                <Users size={15} />
                Enquire Now
              </PrimaryButton>
              <SecondaryButton as="a" href={`tel:${settings.phone}`} className="gap-2">
                <Phone size={15} />
                Call Us Directly
              </SecondaryButton>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative"
          >
            <div className="relative h-[420px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
                alt="Catering spread with Middle Eastern dishes for an event"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-[#B54E32]/20 to-transparent" />
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -top-5 -left-4 sm:-left-6 bg-[#B54E32] text-white rounded-2xl px-5 py-4 shadow-xl"
            >
              <p className="font-heading text-3xl font-semibold">50+</p>
              <p className="font-body text-xs text-white/80 mt-0.5">Events catered</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
