"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X, Check, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { validateCoupon } from "@/lib/coupons";

export function CouponInput() {
  const { coupon, subtotal, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    // Simulate async (server validation in Phase 4)
    await new Promise((r) => setTimeout(r, 500));
    const result = validateCoupon(code, subtotal);
    setLoading(false);
    if (result.valid) {
      applyCoupon(result.coupon);
      setCode("");
    } else {
      setError(result.error);
    }
  };

  if (coupon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-[#6E8B5C]/10 border border-[#6E8B5C]/30 rounded-xl px-4 py-3"
      >
        <div className="flex items-center gap-2.5">
          <Check size={15} className="text-[#6E8B5C]" aria-hidden="true" />
          <div>
            <p className="font-body text-sm font-semibold text-[#2F2F2F]">{coupon.code}</p>
            <p className="font-body text-xs text-[#6B6355]">{coupon.description}</p>
          </div>
        </div>
        <button
          onClick={removeCoupon}
          className="p-1.5 rounded-lg text-[#6B6355] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          aria-label="Remove promo code"
        >
          <X size={15} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6355]/50" aria-hidden="true" />
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Promo code"
            aria-label="Enter promo code"
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-[#E5DDD0] bg-white font-body text-sm text-[#2F2F2F] placeholder:text-[#6B6355]/40 focus:outline-none focus:border-[#B54E32] focus:ring-2 focus:ring-[#B54E32]/15 transition-all duration-200 uppercase tracking-wide"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={!code.trim() || loading}
          className="px-4 h-11 rounded-xl bg-[#B54E32] text-white font-body text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
          aria-label="Apply promo code"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : "Apply"}
        </button>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-body text-xs text-red-500"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
