"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPriceShort } from "@/lib/price";
import { usePathname } from "next/navigation";

const HIDDEN_PATHS = ["/cart", "/checkout", "/order/success"];

export function FloatingCart() {
  const { itemCount, total, items } = useCart();
  const pathname = usePathname();

  const hidden = HIDDEN_PATHS.includes(pathname) || pathname?.startsWith("/admin") || itemCount === 0;

  return (
    <AnimatePresence>
      {!hidden && (
        <>
          {/* Desktop: bottom-right bubble */}
          <motion.div
            key="floating-desktop"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="hidden lg:flex fixed bottom-7 right-7 z-50"
          >
            <Link
              href="/cart"
              className="flex items-center gap-3 bg-[#2F2F2F] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:bg-[#1a1a1a] transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label={`View cart — ${itemCount} item${itemCount !== 1 ? "s" : ""}, ${formatPriceShort(total)}`}
            >
              <div className="relative">
                <ShoppingBag size={20} aria-hidden="true" />
                <motion.span
                  key={itemCount}
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D96C2F] text-white text-[10px] font-body font-bold flex items-center justify-center"
                  aria-hidden="true"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </motion.span>
              </div>
              <div>
                <p className="font-body font-semibold text-sm leading-tight">
                  View Cart
                </p>
                <p className="font-body text-xs text-white/60 leading-tight">
                  {itemCount} item{itemCount !== 1 ? "s" : ""} · {formatPriceShort(total)}
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-150 ml-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* Mobile: full-width sticky bottom bar */}
          <motion.div
            key="floating-mobile"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="lg:hidden fixed bottom-0 inset-x-0 z-50 p-3"
          >
            <Link
              href="/cart"
              className="flex items-center justify-between w-full bg-[#2F2F2F] text-white px-5 py-4 rounded-2xl shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label={`View cart — ${itemCount} items, ${formatPriceShort(total)}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag size={20} aria-hidden="true" />
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D96C2F] text-white text-[10px] font-body font-bold flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-sm">View Cart</p>
                  <p className="font-body text-xs text-white/55">
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-body font-bold text-base">{formatPriceShort(total)}</span>
                <ArrowRight size={16} className="text-white/60" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
