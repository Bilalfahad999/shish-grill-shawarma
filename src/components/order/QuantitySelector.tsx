"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 20,
  size = "md",
}: QuantitySelectorProps) {
  const sizes = {
    sm: { btn: "w-7 h-7", text: "w-8 text-base", icon: 13 },
    md: { btn: "w-10 h-10", text: "w-12 text-lg", icon: 16 },
    lg: { btn: "w-12 h-12", text: "w-14 text-xl", icon: 18 },
  };
  const s = sizes[size];

  return (
    <div
      className="inline-flex items-center gap-2"
      role="group"
      aria-label="Quantity selector"
    >
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${s.btn} rounded-full border border-[#E5DDD0] flex items-center justify-center text-[#6B6355] hover:border-[#B54E32] hover:text-[#B54E32] hover:bg-[#B54E32]/5 transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#E5DDD0] disabled:hover:text-[#6B6355] disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]`}
        aria-label="Decrease quantity"
      >
        <Minus size={s.icon} />
      </motion.button>

      <motion.span
        key={value}
        initial={{ scale: 1.2, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
        className={`${s.text} text-center font-body font-semibold text-[#2F2F2F] tabular-nums select-none`}
        aria-live="polite"
        aria-label={`Quantity: ${value}`}
      >
        {value}
      </motion.span>

      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${s.btn} rounded-full bg-[#B54E32] flex items-center justify-center text-white hover:bg-[#D96C2F] transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-offset-1`}
        aria-label="Increase quantity"
      >
        <Plus size={s.icon} />
      </motion.button>
    </div>
  );
}
