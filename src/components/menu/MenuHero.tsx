"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function MenuHero() {
  return (
    <section
      className="relative h-[52vh] min-h-[340px] flex flex-col justify-end overflow-hidden"
      aria-label="Menu hero"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80"
          alt="Shish Shawarma & Grill menu spread"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/90 via-[#1a0f0a]/50 to-[#1a0f0a]/30" />
      </div>

      {/* Decorative top fade to match page bg */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF7F2] to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 mb-4"
        >
          <Link
            href="/"
            className="font-body text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={12} className="text-white/30" aria-hidden="true" />
          <span className="font-body text-xs text-[#D96C2F]">Menu</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-white mb-3"
        >
          Our Menu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="font-body text-base sm:text-lg text-white/65 max-w-xl leading-relaxed"
        >
          Freshly prepared charcoal grills, shawarma, wraps, family favourites and
          authentic Middle Eastern flavours.
        </motion.p>
      </div>
    </section>
  );
}
