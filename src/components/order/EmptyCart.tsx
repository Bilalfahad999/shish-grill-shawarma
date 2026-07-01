"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 text-center"
      role="status"
    >
      {/* Illustration */}
      <div className="relative w-40 h-40 mb-8" aria-hidden="true">
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Plate */}
          <circle cx="80" cy="90" r="50" fill="#F2ECE3" />
          <circle cx="80" cy="90" r="42" fill="#E5DDD0" />
          <circle cx="80" cy="90" r="34" fill="#FAF7F2" />
          {/* Fork */}
          <rect x="70" y="55" width="3" height="35" rx="1.5" fill="#E5DDD0" />
          <rect x="70" y="52" width="1.5" height="12" rx="0.75" fill="#E5DDD0" />
          <rect x="73" y="52" width="1.5" height="12" rx="0.75" fill="#E5DDD0" />
          <rect x="76" y="52" width="1.5" height="12" rx="0.75" fill="#E5DDD0" />
          {/* Knife */}
          <rect x="87" y="52" width="3" height="38" rx="1.5" fill="#E5DDD0" />
          <path d="M87 52 Q90 56 90 62 L87 62 Z" fill="#D5CEC4" />
          {/* Sparkle dots */}
          <circle cx="50" cy="40" r="3" fill="#D96C2F" fillOpacity="0.25" />
          <circle cx="115" cy="35" r="2" fill="#B54E32" fillOpacity="0.2" />
          <circle cx="120" cy="65" r="2.5" fill="#6E8B5C" fillOpacity="0.2" />
          <circle cx="38" cy="75" r="2" fill="#D96C2F" fillOpacity="0.2" />
        </svg>
      </div>

      <h2 className="font-heading text-3xl font-light text-[#2F2F2F] mb-2">
        Your cart is waiting.
      </h2>
      <p className="font-body text-sm text-[#6B6355] max-w-xs leading-relaxed mb-8">
        Browse our menu and add your favourite charcoal grills, shawarma, and wraps.
      </p>
      <Link
        href="/menu"
        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#D96C2F] text-white font-body font-medium text-sm hover:bg-[#C45A20] transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96C2F] focus-visible:ring-offset-1"
      >
        <BookOpen size={15} aria-hidden="true" />
        Explore Menu
      </Link>
    </motion.div>
  );
}
