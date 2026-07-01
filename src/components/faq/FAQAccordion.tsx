"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_CONTENT } from "@/config/site-content";

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <div className="space-y-3" role="list">
      {FAQ_CONTENT.items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
              isOpen
                ? "border-[#B54E32]/40 shadow-md bg-white"
                : "border-[#E5DDD0] bg-white hover:border-[#B54E32]/30"
            }`}
            role="listitem"
          >
            <button
              id={`faq-btn-${i}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-inset"
            >
              <span className={`font-body font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${isOpen ? "text-[#B54E32]" : "text-[#2F2F2F]"}`}>
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22 }}
                className={`shrink-0 transition-colors duration-200 ${isOpen ? "text-[#B54E32]" : "text-[#6B6355]"}`}
                aria-hidden="true"
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-0">
                    <div className="w-full h-px bg-[#E5DDD0] mb-4" aria-hidden="true" />
                    <p className="font-body text-sm text-[#6B6355] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
