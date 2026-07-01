"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Flame, Leaf, Star, ShoppingBag, Check } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { MenuItem } from "@/data/menu";
import type { CartExtra } from "@/types/order";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { parsePrice, formatPriceShort } from "@/lib/price";
import { QuantitySelector } from "@/components/order/QuantitySelector";
import { ExtrasSelector } from "@/components/order/ExtrasSelector";

interface FoodModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const MAX_NOTES = 160;

export function FoodModal({ item, onClose }: FoodModalProps) {
  const { addItem } = useCart();
  const { isLoggedIn } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<CartExtra[]>([]);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);

  // Reset state when item changes
  useEffect(() => {
    setQuantity(1);
    setSelectedExtras([]);
    setNotes("");
    setAdded(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  const lineTotal = item
    ? (parsePrice(item.price) +
        selectedExtras.reduce((s, e) => s + e.price * e.quantity, 0)) *
      quantity
    : 0;

  const handleAddToCart = useCallback(() => {
    if (!item || added) return;

    addItem({
      cartId: crypto.randomUUID(),
      menuItemId: item.id,
      name: item.name,
      basePrice: parsePrice(item.price),
      quantity,
      extras: selectedExtras.filter((e) => e.quantity > 0),
      notes: notes.trim(),
      image: item.image,
      category: item.category,
    });

    setAdded(true);
    setTimeout(() => {
      onClose();
      setAdded(false);
    }, 900);
  }, [item, added, quantity, selectedExtras, notes, addItem, onClose]);

  const isUnavailable = item && !item.available;

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="fm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="fm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fm-title"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-3 bottom-3 top-16 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg sm:max-h-[90vh] z-[80] bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Hero image */}
            <div className="relative h-60 sm:h-72 shrink-0 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/65 to-transparent" />

              {/* Diet / badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {item.badge && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-body font-semibold bg-[#B54E32] text-white">
                    {item.badge}
                  </span>
                )}
                {item.popular && !item.badge && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-body font-semibold bg-[#D96C2F] text-white">
                    <Star size={9} fill="white" aria-hidden="true" /> Popular
                  </span>
                )}
                {item.charcoalGrilled && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-body bg-black/40 text-white">
                    <Flame size={10} aria-hidden="true" /> Charcoal Grilled
                  </span>
                )}
                {item.vegetarian && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-body bg-[#6E8B5C]/80 text-white">
                    <Leaf size={10} aria-hidden="true" /> Vegetarian
                  </span>
                )}
              </div>

              {/* Sold out overlay */}
              {isUnavailable && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="font-heading text-2xl text-white italic">Sold Out Today</span>
                </div>
              )}

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-5 sm:p-6 space-y-6">
                {/* Name + description */}
                <div>
                  <h2
                    id="fm-title"
                    className="font-heading text-2xl sm:text-3xl font-semibold text-[#2F2F2F] mb-2 leading-tight"
                  >
                    {item.name}
                  </h2>
                  <p className="font-body text-sm text-[#6B6355] leading-relaxed">
                    {item.longDescription ?? item.description}
                  </p>
                </div>

                {/* Includes */}
                {item.includes && item.includes.length > 0 && (
                  <div>
                    <h3 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#B54E32] mb-3">
                      What&apos;s Included
                    </h3>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2" role="list">
                      {item.includes.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-center gap-2 font-body text-sm text-[#2F2F2F]"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[#6E8B5C] shrink-0"
                            aria-hidden="true"
                          />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Extras selector */}
                {item.extras && item.extras.length > 0 && (
                  <ExtrasSelector
                    extras={item.extras}
                    selected={selectedExtras}
                    onChange={setSelectedExtras}
                  />
                )}

                {/* Special instructions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#B54E32]">
                      Special Instructions
                    </h3>
                    <span className="font-body text-xs text-[#6B6355]">
                      {notes.length}/{MAX_NOTES}
                    </span>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, MAX_NOTES))}
                    placeholder='e.g. "No onions", "Extra crispy chips", "Less garlic sauce"'
                    rows={3}
                    aria-label="Special instructions"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-white font-body text-sm text-[#2F2F2F] placeholder:text-[#6B6355]/40 focus:outline-none focus:border-[#B54E32] focus:ring-2 focus:ring-[#B54E32]/15 transition-all duration-200 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Sticky footer */}
            <div className="shrink-0 px-5 sm:px-6 py-4 border-t border-[#E5DDD0] bg-[#FAF7F2]">
              {!isLoggedIn ? (
                /* Login gate */
                <div className="flex items-center gap-3 bg-[#F2ECE3] rounded-2xl px-4 py-3">
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-[#2F2F2F]">Sign in to order</p>
                    <p className="font-body text-xs text-[#6B6355] mt-0.5">Create a free account to add items and track your orders.</p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <Link
                      href={`/login?next=/menu`}
                      onClick={onClose}
                      className="px-4 py-2 rounded-full bg-[#B54E32] text-white font-body font-semibold text-xs hover:bg-[#D96C2F] transition-colors text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={`/signup?next=/menu`}
                      onClick={onClose}
                      className="px-4 py-2 rounded-full border border-[#B54E32] text-[#B54E32] font-body font-semibold text-xs hover:bg-[#B54E32]/8 transition-colors text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              ) : (
                /* Normal add to cart */
                <div className="flex items-center gap-4">
                  <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    size="md"
                  />
                  <motion.button
                    disabled={isUnavailable || added}
                    onClick={handleAddToCart}
                    whileTap={isUnavailable ? undefined : { scale: 0.97 }}
                    className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-full font-body font-semibold text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-offset-1 ${
                      isUnavailable
                        ? "bg-[#E5DDD0] text-[#6B6355] cursor-not-allowed"
                        : added
                        ? "bg-[#6E8B5C] text-white"
                        : "bg-[#D96C2F] text-white hover:bg-[#C45A20] shadow-sm hover:shadow-md"
                    }`}
                    aria-disabled={isUnavailable ? true : undefined}
                  >
                    <AnimatePresence mode="wait">
                      {added ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-center gap-2"
                        >
                          <Check size={16} />
                          Added to Cart!
                        </motion.span>
                      ) : isUnavailable ? (
                        <motion.span key="unavail">Sold Out Today</motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag size={16} />
                          Add to Cart — {formatPriceShort(lineTotal)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
