"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { MenuItem } from "@/data/menu";

interface EmptyStateProps {
  query: string;
  onClear: () => void;
  onOpen: (item: MenuItem) => void;
  suggestions: MenuItem[];
}

export function EmptyState({ query, onClear, onOpen, suggestions }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-20"
      role="status"
      aria-live="polite"
    >
      <div className="w-14 h-14 rounded-full bg-[#F2ECE3] flex items-center justify-center mx-auto mb-4">
        <Search size={22} className="text-[#6B6355]" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-2xl font-light text-[#2F2F2F] mb-2">
        We couldn&apos;t find that dish.
      </h3>
      <p className="font-body text-sm text-[#6B6355] mb-6">
        No results for &ldquo;{query}&rdquo;. Try a different search or browse our popular dishes.
      </p>
      <button
        onClick={onClear}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#B54E32] text-[#B54E32] font-body text-sm font-medium hover:bg-[#B54E32]/8 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
      >
        Clear search
      </button>

      {/* Suggestions */}
      {suggestions.length > 0 && (
      <div className="mt-12 text-left max-w-md mx-auto">
        <p className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#6B6355] mb-4 text-center">
          Popular Suggestions
        </p>
        <div className="flex flex-col gap-3">
          {suggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpen(item)}
              className="flex items-center gap-4 bg-white border border-[#E5DDD0] rounded-xl p-3.5 cursor-pointer hover:border-[#B54E32]/40 hover:shadow-sm transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
              aria-label={`View ${item.name}`}
            >
              <div
                className="w-10 h-10 rounded-lg bg-[#F2ECE3] bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url('${item.image}')` }}
                aria-hidden="true"
              />
              <div>
                <p className="font-body font-semibold text-sm text-[#2F2F2F]">{item.name}</p>
                <p className="font-body text-xs text-[#D96C2F]">{item.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      )}
    </motion.div>
  );
}
