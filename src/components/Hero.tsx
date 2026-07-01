"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, ShoppingBag, BookOpen } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    label: "100% Halal",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    label: "Fresh Daily",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
    label: "Charcoal Grilled",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    label: "Family Friendly",
  },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#2c1810] to-[#1a1208]">
        {/* Hero image — priority-loaded since this is the LCP element */}
        <Image
          src="https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1920&q=80"
          alt="Charcoal grilled meats and shawarma"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/80 via-[#1a0f0a]/30 to-[#1a0f0a]/40" />
      </div>

      {/* Decorative Mediterranean pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Top-right geometric ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -top-20 -right-20 w-96 h-96"
        >
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
            <circle cx="200" cy="200" r="180" stroke="#D96C2F" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="140" stroke="#B54E32" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="100" stroke="#D96C2F" strokeWidth="0.5" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 200 + 100 * Math.cos(angle);
              const y1 = 200 + 100 * Math.sin(angle);
              const x2 = 200 + 180 * Math.cos(angle);
              const y2 = 200 + 180 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D96C2F" strokeWidth="0.5" />;
            })}
          </svg>
        </motion.div>

        {/* Bottom-left leaf pattern */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute bottom-32 -left-12 w-64 h-64"
        >
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-8">
            <path d="M150 50 C150 50 80 100 80 160 C80 220 120 260 150 280 C180 260 220 220 220 160 C220 100 150 50 150 50Z" stroke="#6E8B5C" strokeWidth="0.8" fill="none" />
            <path d="M150 80 C150 80 100 120 100 160 C100 200 125 230 150 245 C175 230 200 200 200 160 C200 120 150 80 150 80Z" stroke="#6E8B5C" strokeWidth="0.8" fill="none" />
            <line x1="150" y1="50" x2="150" y2="280" stroke="#6E8B5C" strokeWidth="0.5" />
            {Array.from({ length: 8 }).map((_, i) => {
              const y = 90 + i * 24;
              const offset = 30 + Math.sin((i / 8) * Math.PI) * 20;
              return (
                <g key={i}>
                  <line x1="150" y1={y} x2={150 - offset} y2={y - 10} stroke="#6E8B5C" strokeWidth="0.5" />
                  <line x1="150" y1={y} x2={150 + offset} y2={y - 10} stroke="#6E8B5C" strokeWidth="0.5" />
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mx-auto max-w-7xl w-full">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-sm font-medium tracking-[0.22em] uppercase text-[#D96C2F] mb-6"
            >
              Melbourne&apos;s Finest — Est. in the Heart of the City
            </motion.p>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-heading font-light text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-white text-balance mb-6"
            >
              Authentic Charcoal
              <br />
              <span className="italic text-[#D96C2F]">Grill & Shawarma</span>
              <br />
              in Melbourne
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-lg mb-10"
            >
              Freshly grilled meats, handcrafted wraps, family platters, and
              authentic Middle Eastern flavours made fresh every day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <PrimaryButton as="a" href="/menu" className="gap-2 text-base px-8 py-4">
                <BookOpen size={16} />
                Explore Menu
              </PrimaryButton>
              <SecondaryButton as="a" href="/menu" light className="gap-2 text-base px-8 py-4">
                <ShoppingBag size={16} />
                Order Online
              </SecondaryButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-10">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 text-white/80"
              >
                <span className="text-[#D96C2F]">{item.icon}</span>
                <span className="font-body text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-32 right-8 hidden lg:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 rotate-90 mb-6">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-white/40"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
