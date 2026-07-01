"use client";

import { Search, X } from "lucide-react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search
          size={17}
          className={`transition-colors duration-200 ${value ? "text-[#B54E32]" : "text-[#6B6355]/50"}`}
          aria-hidden="true"
        />
      </div>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search dishes, ingredients…"
        aria-label="Search menu"
        className="w-full h-12 pl-11 pr-11 rounded-full border border-[#E5DDD0] bg-white font-body text-sm text-[#2F2F2F] placeholder:text-[#6B6355]/40 focus:outline-none focus:border-[#B54E32] focus:ring-2 focus:ring-[#B54E32]/15 transition-all duration-200 shadow-sm"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-4 flex items-center text-[#6B6355]/50 hover:text-[#B54E32] transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
