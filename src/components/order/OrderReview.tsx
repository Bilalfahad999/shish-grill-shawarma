"use client";

import Image from "next/image";
import { MapPin, Clock, CreditCard, User, Phone, Mail, Pencil } from "lucide-react";
import { useCart, calcItemTotal } from "@/context/CartContext";
import { formatPriceShort } from "@/lib/price";
import { PICKUP_LABELS, PAYMENT_LABELS } from "@/lib/order-labels";
import type { CheckoutFormValues } from "@/app/checkout/page";
import { RESTAURANT_CONFIG } from "@/config/restaurant";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface OrderReviewProps {
  values: CheckoutFormValues;
  onEdit: (step: number) => void;
}

function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: number;
  onEdit: (s: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5DDD0]/60 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5DDD0]">
        <h3 className="font-body font-semibold text-sm text-[#2F2F2F]">{title}</h3>
        <button
          onClick={() => onEdit(step)}
          className="flex items-center gap-1.5 font-body text-xs text-[#B54E32] hover:text-[#D96C2F] transition-colors cursor-pointer"
          aria-label={`Edit ${title}`}
        >
          <Pencil size={12} />
          Edit
        </button>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

export function OrderReview({ values, onEdit }: OrderReviewProps) {
  const { items, subtotal, discount, deliveryFee, total, coupon } = useCart();
  const { settings } = useSiteSettings();

  return (
    <div className="space-y-4">
      {/* Items */}
      <ReviewSection title="Order Items" step={0} onEdit={onEdit}>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.cartId} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#F2ECE3] shrink-0">
                <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-[#2F2F2F] truncate">
                  {item.quantity}× {item.name}
                </p>
                {item.extras.length > 0 && (
                  <p className="font-body text-xs text-[#6B6355] truncate">
                    + {item.extras.map((e) => e.name).join(", ")}
                  </p>
                )}
                {item.notes && (
                  <p className="font-body text-xs text-[#6B6355] italic truncate">
                    &ldquo;{item.notes}&rdquo;
                  </p>
                )}
              </div>
              <span className="font-body text-sm font-semibold text-[#D96C2F] shrink-0">
                {formatPriceShort(calcItemTotal(item))}
              </span>
            </div>
          ))}
        </div>
      </ReviewSection>

      {/* Customer */}
      <ReviewSection title="Your Details" step={0} onEdit={onEdit}>
        <div className="space-y-2">
          {[
            { icon: <User size={14} />, value: values.name },
            { icon: <Phone size={14} />, value: values.phone },
            { icon: <Mail size={14} />, value: values.email || "—" },
          ].map(({ icon, value }) => (
            <div key={value} className="flex items-center gap-2.5 font-body text-sm text-[#2F2F2F]">
              <span className="text-[#6B6355]">{icon}</span>
              {value}
            </div>
          ))}
        </div>
      </ReviewSection>

      {/* Order type */}
      <ReviewSection title="Collection" step={1} onEdit={onEdit}>
        {values.orderType === "pickup" ? (
          <div className="space-y-2">
            <div className="flex items-start gap-2.5 font-body text-sm text-[#2F2F2F]">
              <MapPin size={14} className="text-[#6B6355] shrink-0 mt-0.5" />
              <span>Pickup from {settings.address}</span>
            </div>
            <div className="flex items-center gap-2.5 font-body text-sm text-[#2F2F2F]">
              <Clock size={14} className="text-[#6B6355]" />
              <span>{PICKUP_LABELS[values.pickupTime ?? "asap"]}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 font-body text-sm text-[#2F2F2F]">
            <p>🚚 Delivery to:</p>
            <p className="font-medium">
              {values.deliveryStreet}, {values.deliverySuburb} {values.deliveryPostcode}
            </p>
            {values.deliveryNotes && (
              <p className="text-[#6B6355] italic">&ldquo;{values.deliveryNotes}&rdquo;</p>
            )}
          </div>
        )}
      </ReviewSection>

      {/* Payment */}
      <ReviewSection title="Payment" step={2} onEdit={onEdit}>
        <div className="flex items-center gap-2.5 font-body text-sm text-[#2F2F2F]">
          <CreditCard size={14} className="text-[#6B6355]" />
          {PAYMENT_LABELS[values.paymentMethod ?? "card"]}
        </div>
      </ReviewSection>

      {/* Totals */}
      <div className="bg-[#F2ECE3] rounded-2xl px-5 py-4 space-y-2.5">
        <div className="flex justify-between font-body text-sm text-[#6B6355]">
          <span>Subtotal</span>
          <span>{formatPriceShort(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between font-body text-sm text-[#6E8B5C]">
            <span>Discount ({coupon?.code})</span>
            <span>−{formatPriceShort(discount)}</span>
          </div>
        )}
        {deliveryFee > 0 && (
          <div className="flex justify-between font-body text-sm text-[#6B6355]">
            <span>Delivery fee</span>
            <span>{formatPriceShort(deliveryFee)}</span>
          </div>
        )}
        <div className="border-t border-[#E5DDD0] pt-2 flex justify-between">
          <span className="font-body font-semibold text-[#2F2F2F]">Total</span>
          <span className="font-heading text-xl font-semibold text-[#B54E32]">
            {formatPriceShort(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
