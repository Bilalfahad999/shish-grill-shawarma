"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, LayoutGrid } from "lucide-react";
import { useEffect } from "react";
import type { MenuCategory } from "@/data/menu";

interface MobileCategoryPanelProps {
  open: boolean;
  onClose: () => void;
  activeCategory: string | null;
  categories: MenuCategory[];
}

export function MobileCategoryPanel({
  open,
  onClose,
  activeCategory,
  categories,
}: MobileCategoryPanelProps) {
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, onClose]);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(`category-${id}`);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }, 250);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Browse menu categories"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-[70] bg-[#FAF7F2] rounded-t-3xl shadow-2xl lg:hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
              <div className="w-10 h-1 rounded-full bg-[#E5DDD0]" />
            </div>

            <div className="flex items-center justify-between px-6 py-3 border-b border-[#E5DDD0]">
              <h2 className="font-heading text-xl font-semibold text-[#2F2F2F]">
                Browse Categories
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg text-[#6B6355] hover:bg-[#F2ECE3] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[65vh] overscroll-contain px-4 py-3 pb-8">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollTo(cat.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl mb-1.5 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] ${
                      isActive
                        ? "bg-[#B54E32]/10 text-[#B54E32]"
                        : "text-[#2F2F2F] hover:bg-[#F2ECE3]"
                    }`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <span className="text-xl leading-none w-8 text-center" aria-hidden="true">
                      {cat.icon}
                    </span>
                    <div>
                      <span
                        className={`font-body font-medium text-sm ${
                          isActive ? "text-[#B54E32]" : "text-[#2F2F2F]"
                        }`}
                      >
                        {cat.label}
                      </span>
                      <p className="font-body text-xs text-[#6B6355] mt-0.5 line-clamp-1">
                        {cat.intro}
                      </p>
                    </div>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#B54E32] shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Bottom sticky trigger button (shown on mobile only)
export function MobileCategoryButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden">
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={onClick}
        className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#2F2F2F] text-white font-body font-medium text-sm shadow-xl hover:bg-[#1a1a1a] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="View menu categories"
      >
        <LayoutGrid size={16} aria-hidden="true" />
        View Categories
      </motion.button>
    </div>
  );
}
