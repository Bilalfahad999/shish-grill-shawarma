"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Flame, Leaf, Star, ShoppingBag, Check, Plus, Minus, X, Info } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { parsePrice } from "@/lib/price";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

interface FoodCardProps {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  index?: number;
  featured?: boolean;
}

export function FoodCard({ item, onOpen, index = 0, featured = false }: FoodCardProps) {
  const { addItem } = useCart();
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const [showQty, setShowQty] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    el.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateZ(4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s ease";
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.1s ease";
  }, []);

  const handleAddClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!item.available) return;
      if (!isLoggedIn) {
        setShowLoginPrompt(true);
        setTimeout(() => setShowLoginPrompt(false), 4000);
        return;
      }
      setShowQty(true);
      setQty(1);
    },
    [item.available, isLoggedIn]
  );

  const handleConfirm = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addItem({
        cartId: crypto.randomUUID(),
        menuItemId: item.id,
        name: item.name,
        basePrice: parsePrice(item.price),
        quantity: qty,
        extras: [],
        notes: "",
        image: item.image,
        category: item.category,
      });
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        setShowQty(false);
        setQty(1);
      }, 1200);
    },
    [addItem, item, qty]
  );

  const handleCancel = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQty(false);
    setQty(1);
  }, []);

  const isUnavailable = !item.available;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: "transform" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ transition: "transform 0.1s ease", transformStyle: "preserve-3d" }}
        className={`group relative bg-white rounded-2xl overflow-hidden border border-[#E5DDD0]/60 shadow-sm hover:shadow-xl select-none ${
          featured ? "rounded-3xl" : ""
        }`}
      >
        {/* Image — click opens modal */}
        <div
          onClick={() => onOpen(item)}
          className={`relative overflow-hidden bg-[#F2ECE3] cursor-pointer ${
            featured ? "h-72" : "h-52"
          }`}
          role="button"
          tabIndex={0}
          aria-label={`View ${item.name} details`}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(item)}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes={
              featured
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {item.badge && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-body font-semibold bg-[#B54E32] text-white shadow-sm">
                {item.badge}
              </span>
            )}
            {item.popular && !item.badge && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-body font-semibold bg-[#D96C2F] text-white shadow-sm">
                <Star size={9} fill="white" aria-hidden="true" />
                Popular
              </span>
            )}
          </div>

          {/* Diet icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {item.charcoalGrilled && (
              <span
                className="w-7 h-7 rounded-full bg-[#2F2F2F]/70 flex items-center justify-center"
                title="Charcoal Grilled"
                aria-label="Charcoal Grilled"
              >
                <Flame size={13} className="text-[#D96C2F]" aria-hidden="true" />
              </span>
            )}
            {item.vegetarian && (
              <span
                className="w-7 h-7 rounded-full bg-[#6E8B5C]/80 flex items-center justify-center"
                title="Vegetarian"
                aria-label="Vegetarian"
              >
                <Leaf size={13} className="text-white" aria-hidden="true" />
              </span>
            )}
          </div>

          {/* Sold out */}
          {isUnavailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="font-heading text-lg text-white italic">Sold Out Today</span>
            </div>
          )}

          {/* Hover hint */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm font-body text-xs font-semibold text-[#2F2F2F] shadow">
              <Info size={11} />
              View details & customise
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className={`${featured ? "p-5 sm:p-6" : "p-4"}`}>
          <div
            className="flex items-start justify-between gap-3 mb-1.5 cursor-pointer"
            onClick={() => onOpen(item)}
          >
            <h3
              className={`font-heading font-semibold text-[#2F2F2F] group-hover:text-[#B54E32] transition-colors duration-200 leading-snug ${
                featured ? "text-xl" : "text-[1.05rem]"
              }`}
            >
              {item.name}
            </h3>
            <span className="font-body font-semibold text-[#D96C2F] text-sm whitespace-nowrap shrink-0 mt-0.5">
              {item.price}
            </span>
          </div>

          <p
            className="font-body text-sm text-[#6B6355] leading-relaxed line-clamp-2 mb-4 cursor-pointer"
            onClick={() => onOpen(item)}
          >
            {item.description}
          </p>

          {/* Action row */}
          <div className="relative h-9">
            <AnimatePresence mode="wait">
              {showLoginPrompt ? (
                <motion.div
                  key="login-prompt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0 flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="flex-1 font-body text-xs text-[#6B6355] leading-tight">
                    Sign in to add items
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push(`/login?next=/menu`); }}
                    className="shrink-0 px-3 h-9 rounded-full bg-[#B54E32] text-white font-body font-semibold text-xs hover:bg-[#D96C2F] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
                  >
                    Sign In
                  </button>
                </motion.div>
              ) : !showQty ? (
                <motion.button
                  key="add-btn"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  onClick={handleAddClick}
                  disabled={isUnavailable}
                  className={`absolute inset-0 flex items-center justify-center gap-2 rounded-full font-body font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-offset-1 ${
                    isUnavailable
                      ? "bg-[#E5DDD0] text-[#6B6355] cursor-not-allowed"
                      : "bg-[#B54E32]/10 text-[#B54E32] hover:bg-[#B54E32] hover:text-white cursor-pointer"
                  }`}
                  aria-label={isUnavailable ? "Sold out" : `Add ${item.name} to cart`}
                >
                  <ShoppingBag size={14} aria-hidden="true" />
                  {isUnavailable ? "Sold Out" : "Add to Cart"}
                </motion.button>
              ) : (
                <motion.div
                  key="qty-picker"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0 flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Cancel */}
                  <button
                    onClick={handleCancel}
                    className="w-9 h-9 rounded-full border border-[#E5DDD0] flex items-center justify-center text-[#6B6355] hover:border-[#B54E32] hover:text-[#B54E32] transition-all duration-150 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
                    aria-label="Cancel"
                  >
                    <X size={13} />
                  </button>

                  {/* qty controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); setQty((q) => Math.max(1, q - 1)); }}
                      disabled={qty <= 1}
                      className="w-7 h-7 rounded-full border border-[#E5DDD0] flex items-center justify-center text-[#6B6355] hover:border-[#B54E32] hover:text-[#B54E32] transition-all duration-150 cursor-pointer disabled:opacity-30 focus-visible:outline-none"
                      aria-label="Decrease"
                    >
                      <Minus size={11} />
                    </button>
                    <motion.span
                      key={qty}
                      initial={{ scale: 1.3, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.12 }}
                      className="w-6 text-center font-body font-bold text-[#2F2F2F] text-sm tabular-nums select-none"
                      aria-live="polite"
                    >
                      {qty}
                    </motion.span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setQty((q) => Math.min(20, q + 1)); }}
                      disabled={qty >= 20}
                      className="w-7 h-7 rounded-full bg-[#B54E32] flex items-center justify-center text-white hover:bg-[#D96C2F] transition-all duration-150 cursor-pointer disabled:opacity-30 shadow-sm focus-visible:outline-none"
                      aria-label="Increase"
                    >
                      <Plus size={11} />
                    </button>
                  </div>

                  {/* Confirm */}
                  <motion.button
                    onClick={handleConfirm}
                    whileTap={{ scale: 0.96 }}
                    className={`flex-1 h-9 rounded-full font-body font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-offset-1 ${
                      added
                        ? "bg-[#6E8B5C] text-white"
                        : "bg-[#D96C2F] text-white hover:bg-[#C45A20] shadow-sm"
                    }`}
                    aria-label="Confirm add to cart"
                  >
                    <AnimatePresence mode="wait">
                      {added ? (
                        <motion.span
                          key="done"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1"
                        >
                          <Check size={12} />
                          Added!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="confirm"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          Add{qty > 1 ? ` x${qty}` : ""}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}




