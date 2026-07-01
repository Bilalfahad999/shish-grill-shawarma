"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, LogIn } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { formatPriceShort } from "@/lib/price";
import { CouponInput } from "./CouponInput";

interface OrderSummaryProps {
  cta?: React.ReactNode;
  showCoupon?: boolean;
  compact?: boolean;
}

export function OrderSummary({ cta, showCoupon = true, compact = false }: OrderSummaryProps) {
  const { subtotal, discount, deliveryFee, total, coupon, itemCount } = useCart();
  const { isLoggedIn } = useUser();

  return (
    <div className={`bg-white rounded-2xl border border-[#E5DDD0]/60 overflow-hidden ${compact ? "" : "shadow-sm"}`}>
      <div className="px-5 py-4 border-b border-[#E5DDD0]">
        <h2 className="font-heading text-xl font-semibold text-[#2F2F2F]">Order Summary</h2>
        <p className="font-body text-xs text-[#6B6355] mt-0.5">
          {itemCount} item{itemCount !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="p-5 space-y-4">
        {/* Line items */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between font-body text-sm">
            <span className="text-[#6B6355]">Subtotal</span>
            <span className="text-[#2F2F2F] font-medium">{formatPriceShort(subtotal)}</span>
          </div>

          {discount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center justify-between font-body text-sm"
            >
              <span className="text-[#6E8B5C] flex items-center gap-1.5">
                <span className="text-xs bg-[#6E8B5C]/10 px-2 py-0.5 rounded-full font-medium">
                  {coupon?.code}
                </span>
                Discount
              </span>
              <span className="text-[#6E8B5C] font-semibold">−{formatPriceShort(discount)}</span>
            </motion.div>
          )}

          <div className="flex items-center justify-between font-body text-sm">
            <span className="text-[#6B6355]">Delivery</span>
            <span className="text-[#2F2F2F] font-medium">
              {deliveryFee > 0 ? formatPriceShort(deliveryFee) : "Free (Pickup)"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E5DDD0]" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-body font-semibold text-[#2F2F2F]">Total</span>
          <motion.span
            key={total}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="font-heading text-2xl font-semibold text-[#B54E32]"
          >
            {formatPriceShort(total)}
          </motion.span>
        </div>

        {/* Coupon */}
        {showCoupon && <CouponInput />}

        {/* CTA */}
        {cta ?? (
          isLoggedIn ? (
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#D96C2F] text-white font-body font-semibold text-sm hover:bg-[#C45A20] transition-colors shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96C2F] focus-visible:ring-offset-1"
            >
              Continue to Checkout
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login?next=/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#B54E32] text-white font-body font-semibold text-sm hover:bg-[#D96C2F] transition-colors shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-offset-1"
              >
                <LogIn size={16} aria-hidden="true" />
                Sign In to Checkout
              </Link>
              <Link
                href="/signup?next=/checkout"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-[#B54E32] text-[#B54E32] font-body font-semibold text-sm hover:bg-[#B54E32]/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-offset-1"
              >
                Create Account
              </Link>
              <p className="text-center font-body text-xs text-[#6B6355]">Free account · Takes 30 seconds</p>
            </div>
          )
        )}

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-2 text-[#6B6355]/60">
          <Shield size={13} aria-hidden="true" />
          <span className="font-body text-xs">Secure checkout · 100% Halal</span>
        </div>
      </div>
    </div>
  );
}
