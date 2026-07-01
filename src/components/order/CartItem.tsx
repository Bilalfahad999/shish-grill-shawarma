"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trash2, ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { useState } from "react";
import type { CartItem as CartItemType } from "@/types/order";
import { useCart, calcItemTotal } from "@/context/CartContext";
import { QuantitySelector } from "./QuantitySelector";
import { formatPriceShort } from "@/lib/price";

interface CartItemProps {
  item: CartItemType;
  onEdit?: (item: CartItemType) => void;
}

export function CartItemRow({ item, onEdit }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();
  const [expanded, setExpanded] = useState(false);

  const hasExtras = item.extras.length > 0;
  const hasNotes = !!item.notes;
  const hasDetails = hasExtras || hasNotes;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-[#E5DDD0]/60 overflow-hidden"
      aria-label={`${item.name} — ${formatPriceShort(calcItemTotal(item))}`}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Image */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#F2ECE3] shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="96px"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-semibold text-[#2F2F2F] leading-snug">
              {item.name}
            </h3>
            <span className="font-body font-bold text-[#D96C2F] text-base shrink-0">
              {formatPriceShort(calcItemTotal(item))}
            </span>
          </div>

          <p className="font-body text-xs text-[#6B6355] mt-0.5">
            {formatPriceShort(item.basePrice)} each
          </p>

          {/* Extras summary (collapsed) */}
          {hasDetails && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1 mt-2 font-body text-xs text-[#B54E32] hover:text-[#D96C2F] transition-colors cursor-pointer"
              aria-expanded="false"
            >
              <ChevronDown size={13} />
              {hasExtras ? `${item.extras.length} extra${item.extras.length > 1 ? "s" : ""}` : ""}
              {hasExtras && hasNotes ? " · " : ""}
              {hasNotes ? "Note" : ""}
            </button>
          )}

          {/* Expanded details */}
          {expanded && (
            <div className="mt-2 space-y-1.5">
              {item.extras.map((e) => (
                <div key={e.name} className="flex items-center justify-between font-body text-xs text-[#6B6355]">
                  <span>+ {e.name}{e.quantity > 1 ? ` ×${e.quantity}` : ""}</span>
                  <span>+{formatPriceShort(e.price * e.quantity)}</span>
                </div>
              ))}
              {item.notes && (
                <div className="rounded-lg bg-[#F2ECE3] px-3 py-2 font-body text-xs text-[#6B6355] italic">
                  &ldquo;{item.notes}&rdquo;
                </div>
              )}
              <button
                onClick={() => setExpanded(false)}
                className="flex items-center gap-1 font-body text-xs text-[#B54E32] hover:text-[#D96C2F] transition-colors cursor-pointer"
                aria-expanded="true"
              >
                <ChevronUp size={13} />
                Collapse
              </button>
            </div>
          )}

          {/* Actions row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F2ECE3]">
            <QuantitySelector
              value={item.quantity}
              onChange={(q) => updateQuantity(item.cartId, q)}
              size="sm"
            />
            <div className="flex items-center gap-1">
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-lg text-[#6B6355] hover:text-[#B54E32] hover:bg-[#B54E32]/8 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
                  aria-label={`Edit ${item.name}`}
                >
                  <Pencil size={14} />
                </button>
              )}
              <button
                onClick={() => removeItem(item.cartId)}
                className="p-2 rounded-lg text-[#6B6355] hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                aria-label={`Remove ${item.name} from cart`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
