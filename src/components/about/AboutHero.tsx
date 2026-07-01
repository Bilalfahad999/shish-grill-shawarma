"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ABOUT_CONTENT } from "@/config/site-content";

export function AboutHero() {
  const { hero } = ABOUT_CONTENT;
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden" aria-label="About hero">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/80 via-[#1a0f0a]/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="max-w-3xl"
        >
          <p className="font-body text-sm font-medium tracking-[0.2em] uppercase text-[#D96C2F] mb-4">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-tight mb-5">
            {hero.headline}
          </h1>
          <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">
            {hero.intro}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
