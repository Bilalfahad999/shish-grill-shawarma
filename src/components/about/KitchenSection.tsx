"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ABOUT_CONTENT } from "@/config/site-content";

export function KitchenSection() {
  const { kitchen } = ABOUT_CONTENT;
  return (
    <section className="py-20 sm:py-28 bg-[#2F2F2F] overflow-hidden" aria-labelledby="kitchen-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <SectionTitle
              id="kitchen-title"
              eyebrow={kitchen.eyebrow}
              title={kitchen.headline}
              subtitle={kitchen.description}
              light
              scrollAnimate
            />
            <ul className="space-y-3" role="list">
              {kitchen.highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#6E8B5C]/20 flex items-center justify-center shrink-0">
                    <Check size={13} className="text-[#6E8B5C]" aria-hidden="true" />
                  </span>
                  <span className="font-body text-sm text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={kitchen.image}
                alt={kitchen.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
