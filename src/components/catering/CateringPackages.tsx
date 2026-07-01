"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CATERING_CONTENT } from "@/config/site-content";

export function CateringPackages() {
  return (
    <section className="py-20 sm:py-28 bg-[#F2ECE3]" aria-labelledby="packages-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <SectionTitle
            id="packages-title"
            eyebrow="Packages"
            title="Catering Packages"
            subtitle="Starting points to help plan your event. All packages can be customised — contact us to discuss your specific needs."
            centered
            scrollAnimate
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATERING_CONTENT.packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-3xl p-7 border-2 flex flex-col ${
                pkg.badge
                  ? "border-[#B54E32] shadow-xl"
                  : "border-[#E5DDD0] shadow-sm"
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-[#B54E32] text-white font-body text-xs font-semibold tracking-wide whitespace-nowrap">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#D96C2F] mb-2">
                  {pkg.name}
                </p>
                <h3 className="font-heading text-2xl font-semibold text-[#2F2F2F] mb-1">
                  {pkg.tagline}
                </h3>
                <p className="font-body text-sm text-[#B54E32] font-medium">{pkg.serves}</p>
              </div>

              <p className="font-body text-sm text-[#6B6355] leading-relaxed mb-6">
                {pkg.description}
              </p>

              <ul className="space-y-2.5 mb-8 flex-1" role="list">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check size={15} className="text-[#6E8B5C] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-body text-sm text-[#2F2F2F]">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#enquiry"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] ${
                  pkg.badge
                    ? "bg-[#B54E32] text-white hover:bg-[#D96C2F] shadow-sm"
                    : "border-2 border-[#B54E32] text-[#B54E32] hover:bg-[#B54E32]/8"
                }`}
              >
                {pkg.note} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
