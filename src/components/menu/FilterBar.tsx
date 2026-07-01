"use client";

import { motion } from "framer-motion";

export type FilterKey = "all" | "popular" | "vegetarian" | "spicy" | "grilled";

interface FilterBarProps {
  active: FilterKey;
  onChange: (f: FilterKey) => void;
}

const FILTERS: { key: FilterKey; label: string; icon: string }[] = [
  { key: "all", label: "All Items", icon: "✦" },
  { key: "popular", label: "Popular", icon: "★" },
  { key: "vegetarian", label: "Vegetarian", icon: "🌿" },
  { key: "spicy", label: "Spicy", icon: "🌶" },
  { key: "grilled", label: "Charcoal Grilled", icon: "🔥" },
];

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1"
      role="group"
      aria-label="Filter menu items"
    >
      {FILTERS.map((f) => {
        const isActive = active === f.key;
        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            role="radio"
            aria-checked={isActive}
            className={`relative flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] ${
              isActive
                ? "bg-[#B54E32] text-white shadow-sm"
                : "bg-white border border-[#E5DDD0] text-[#6B6355] hover:border-[#B54E32]/40 hover:text-[#B54E32]"
            }`}
          >
            <span aria-hidden="true" className="text-xs leading-none">
              {f.icon}
            </span>
            {f.label}
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-[#B54E32] -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
