"use client";

import { useFormContext } from "react-hook-form";
import { Clock, MapPin } from "lucide-react";
import type { CheckoutFormValues } from "@/app/checkout/page";
import { RESTAURANT_CONFIG } from "@/config/restaurant";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function PickupForm() {
  const { register, formState: { errors } } = useFormContext<CheckoutFormValues>();
  const { settings } = useSiteSettings();

  return (
    <div className="space-y-6">
      {/* Pickup location card */}
      <div className="flex items-start gap-3 bg-[#F2ECE3] rounded-xl p-4">
        <MapPin size={18} className="text-[#B54E32] shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-body font-semibold text-sm text-[#2F2F2F]">Pickup Location</p>
          <p className="font-body text-sm text-[#6B6355] mt-0.5">{settings.address}</p>
        </div>
      </div>

      {/* Time selector */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-[#B54E32]" aria-hidden="true" />
          <label className="font-body text-sm font-medium text-[#2F2F2F]">
            Preferred Pickup Time <span className="text-red-400" aria-hidden="true">*</span>
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="radiogroup" aria-label="Pickup time">
          {RESTAURANT_CONFIG.pickupSlots.map((slot) => (
            <label
              key={slot.value}
              className="relative cursor-pointer"
            >
              <input
                type="radio"
                value={slot.value}
                {...register("pickupTime")}
                className="sr-only peer"
              />
              <div className="px-3 py-3 rounded-xl border border-[#E5DDD0] text-center transition-all duration-150 peer-checked:border-[#B54E32] peer-checked:bg-[#B54E32]/8 peer-checked:text-[#B54E32] peer-focus-visible:ring-2 peer-focus-visible:ring-[#B54E32] hover:border-[#B54E32]/40">
                <span className="font-body text-sm font-medium text-[#2F2F2F] peer-checked:text-[#B54E32]">
                  {slot.label}
                </span>
              </div>
            </label>
          ))}
        </div>
        {errors.pickupTime && (
          <p className="font-body text-xs text-red-500 mt-1.5" role="alert">
            {errors.pickupTime.message}
          </p>
        )}
      </div>
    </div>
  );
}
