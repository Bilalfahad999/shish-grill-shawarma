"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CATERING_CONTENT } from "@/config/site-content";

export function CateringHero() {
  const { hero } = CATERING_CONTENT;
  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden" aria-label="Catering hero">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/85 via-[#1a0f0a]/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
          className="max-w-2xl"
        >
          <p className="font-body text-sm font-medium tracking-[0.2em] uppercase text-[#D96C2F] mb-4">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-tight mb-5">
            {hero.headline}
          </h1>
          <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-8">
            {hero.description}
          </p>
          <Link
            href="#enquiry"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D96C2F] text-white font-body font-semibold text-sm hover:bg-[#C45A20] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96C2F]"
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
