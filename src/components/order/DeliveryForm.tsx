"use client";

import { useFormContext } from "react-hook-form";
import { Home, MapPin, Hash, FileText, Info } from "lucide-react";
import type { CheckoutFormValues } from "@/app/checkout/page";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

const baseInput =
  "w-full px-4 py-3.5 rounded-xl border font-body text-sm text-[#2F2F2F] placeholder:text-[#6B6355]/40 focus:outline-none transition-all duration-200";
const inputValid = `${baseInput} border-[#E5DDD0] bg-white focus:border-[#B54E32] focus:ring-2 focus:ring-[#B54E32]/15`;
const inputError = `${baseInput} border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-2 focus:ring-red-200`;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="font-body text-xs text-red-500 mt-1.5" role="alert">{message}</p>;
}

export function DeliveryForm() {
  const { register, formState: { errors } } = useFormContext<CheckoutFormValues>();

  return (
    <div className="space-y-4">
      {/* Delivery fee notice */}
      <div className="flex items-start gap-3 bg-[#F2ECE3] rounded-xl p-4">
        <Info size={16} className="text-[#B54E32] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="font-body text-sm text-[#6B6355]">
          Delivery fee: <strong className="text-[#2F2F2F]">${RESTAURANT_CONFIG.deliveryFee.toFixed(2)}</strong>.
          Estimated delivery time: <strong className="text-[#2F2F2F]">~{RESTAURANT_CONFIG.deliveryTime} minutes</strong>.
          Minimum order: <strong className="text-[#2F2F2F]">${RESTAURANT_CONFIG.minDeliveryOrder}</strong>.
        </p>
      </div>

      {/* Street address */}
      <div>
        <label htmlFor="street" className="block font-body text-sm font-medium text-[#2F2F2F] mb-1.5">
          Street Address <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <Home size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6355]/50" aria-hidden="true" />
          <input
            id="street"
            type="text"
            autoComplete="street-address"
            placeholder="123 Collins Street"
            {...register("deliveryStreet")}
            className={`pl-11 ${errors.deliveryStreet ? inputError : inputValid}`}
            aria-invalid={!!errors.deliveryStreet}
          />
        </div>
        <FieldError message={errors.deliveryStreet?.message} />
      </div>

      {/* Suburb + Postcode */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="suburb" className="block font-body text-sm font-medium text-[#2F2F2F] mb-1.5">
            Suburb <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6355]/50" aria-hidden="true" />
            <input
              id="suburb"
              type="text"
              autoComplete="address-level2"
              placeholder="Melbourne"
              {...register("deliverySuburb")}
              className={`pl-10 ${errors.deliverySuburb ? inputError : inputValid}`}
              aria-invalid={!!errors.deliverySuburb}
            />
          </div>
          <FieldError message={errors.deliverySuburb?.message} />
        </div>
        <div>
          <label htmlFor="postcode" className="block font-body text-sm font-medium text-[#2F2F2F] mb-1.5">
            Postcode <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <Hash size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6355]/50" aria-hidden="true" />
            <input
              id="postcode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="3000"
              {...register("deliveryPostcode")}
              className={`pl-10 ${errors.deliveryPostcode ? inputError : inputValid}`}
              aria-invalid={!!errors.deliveryPostcode}
            />
          </div>
          <FieldError message={errors.deliveryPostcode?.message} />
        </div>
      </div>

      {/* Delivery notes */}
      <div>
        <label htmlFor="deliveryNotes" className="block font-body text-sm font-medium text-[#2F2F2F] mb-1.5">
          Delivery Notes{" "}
          <span className="font-normal text-[#6B6355] text-xs">(optional)</span>
        </label>
        <div className="relative">
          <FileText size={15} className="absolute left-4 top-4 text-[#6B6355]/50" aria-hidden="true" />
          <textarea
            id="deliveryNotes"
            rows={2}
            placeholder='e.g. "Leave at door", "Apartment 4B", "Gate code: 1234"'
            {...register("deliveryNotes")}
            className={`pl-10 resize-none ${inputValid}`}
          />
        </div>
      </div>
    </div>
  );
}
