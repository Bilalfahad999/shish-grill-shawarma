"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Check } from "lucide-react";
import type { CartExtra } from "@/types/order";
import type { Extra } from "@/data/menu";
import { formatPriceShort } from "@/lib/price";

interface ExtrasSelectorProps {
  extras: Extra[];
  selected: CartExtra[];
  onChange: (extras: CartExtra[]) => void;
}

export function ExtrasSelector({ extras, selected, onChange }: ExtrasSelectorProps) {
  const getSelected = (name: string) => selected.find((e) => e.name === name);

  const toggle = (extra: Extra) => {
    const price = extra.price ? parseFloat(extra.price.replace(/[^0-9.]/g, "")) : 0;
    const existing = getSelected(extra.name);
    if (existing) {
      onChange(selected.filter((e) => e.name !== extra.name));
    } else {
      onChange([...selected, { name: extra.name, price, quantity: 1 }]);
    }
  };

  const setQty = (name: string, qty: number) => {
    if (qty < 1) {
      onChange(selected.filter((e) => e.name !== name));
      return;
    }
    onChange(selected.map((e) => (e.name === name ? { ...e, quantity: qty } : e)));
  };

  if (!extras.length) return null;

  return (
    <div>
      <h3 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#B54E32] mb-3">
        Optional Extras
      </h3>
      <div className="space-y-2">
        {extras.map((extra) => {
          const sel = getSelected(extra.name);
          const price = extra.price ? parseFloat(extra.price.replace(/[^0-9.]/g, "")) : 0;

          return (
            <motion.div
              key={extra.name}
              layout
              className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                sel
                  ? "border-[#B54E32] bg-[#B54E32]/5"
                  : "border-[#E5DDD0] hover:border-[#B54E32]/40 bg-white"
              }`}
              onClick={() => toggle(extra)}
              role="checkbox"
              aria-checked={!!sel}
              tabIndex={0}
              onKeyDown={(e) => (e.key === " " || e.key === "Enter") && toggle(extra)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <motion.div
                  animate={{ backgroundColor: sel ? "#B54E32" : "#FAF7F2", borderColor: sel ? "#B54E32" : "#E5DDD0" }}
                  className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0"
                >
                  <AnimatePresence>
                    {sel && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check size={12} className="text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <span className="font-body text-sm text-[#2F2F2F] leading-snug">
                  {extra.name}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                {price > 0 && (
                  <span className="font-body text-sm font-medium text-[#D96C2F]">
                    +{formatPriceShort(price)}
                  </span>
                )}

                {/* Qty stepper (only visible when selected) */}
                <AnimatePresence>
                  {sel && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1 overflow-hidden"
                    >
                      <button
                        onClick={() => setQty(extra.name, sel.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-[#B54E32]/10 flex items-center justify-center text-[#B54E32] hover:bg-[#B54E32]/20 transition-colors cursor-pointer"
                        aria-label={`Decrease ${extra.name} quantity`}
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-body text-sm font-semibold text-[#2F2F2F] w-4 text-center">
                        {sel.quantity}
                      </span>
                      <button
                        onClick={() => setQty(extra.name, sel.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-[#B54E32] flex items-center justify-center text-white hover:bg-[#D96C2F] transition-colors cursor-pointer"
                        aria-label={`Increase ${extra.name} quantity`}
                      >
                        <Plus size={10} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
