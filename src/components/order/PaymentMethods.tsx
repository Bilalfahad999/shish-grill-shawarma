"use client";

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { CreditCard, Banknote, Shield } from "lucide-react";
import type { CheckoutFormValues } from "@/app/checkout/page";
import type { PaymentMethod } from "@/types/order";

const METHODS: {
  id: PaymentMethod;
  label: string;
  sub: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    sub: "Visa, Mastercard, Amex",
    icon: <CreditCard size={20} className="text-[#B54E32]" />,
  },
  {
    id: "apple_pay",
    label: "Apple Pay",
    sub: "Pay with Face ID or Touch ID",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#2F2F2F]" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  {
    id: "google_pay",
    label: "Google Pay",
    sub: "Fast and secure checkout",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: "cash",
    label: "Cash on Pickup",
    sub: "Pay when you collect your order",
    icon: <Banknote size={20} className="text-[#6E8B5C]" />,
  },
];

export function PaymentMethods() {
  const { register, watch, formState: { errors } } = useFormContext<CheckoutFormValues>();
  const selected = watch("paymentMethod");

  return (
    <div className="space-y-4">
      <div className="space-y-2.5" role="radiogroup" aria-label="Payment method">
        {METHODS.map((method) => {
          const isActive = selected === method.id;
          return (
            <label key={method.id} className="cursor-pointer block">
              <input
                type="radio"
                value={method.id}
                {...register("paymentMethod")}
                className="sr-only peer"
              />
              <motion.div
                animate={{
                  borderColor: isActive ? "#B54E32" : "#E5DDD0",
                  backgroundColor: isActive ? "rgba(181,78,50,0.04)" : "#FFFFFF",
                }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-4 px-4 py-4 rounded-xl border-2 transition-shadow duration-150 hover:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-[#B54E32]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F2ECE3] flex items-center justify-center shrink-0">
                  {method.icon}
                </div>
                <div className="flex-1">
                  <p className="font-body font-semibold text-sm text-[#2F2F2F]">{method.label}</p>
                  <p className="font-body text-xs text-[#6B6355]">{method.sub}</p>
                </div>
                {/* Radio dot */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
                    isActive ? "border-[#B54E32] bg-[#B54E32]" : "border-[#E5DDD0]"
                  }`}
                  aria-hidden="true"
                >
                  {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </motion.div>
            </label>
          );
        })}
      </div>

      {errors.paymentMethod && (
        <p className="font-body text-xs text-red-500" role="alert">
          {errors.paymentMethod.message}
        </p>
      )}

      {/* Security badges */}
      <div className="flex items-center justify-center gap-3 pt-2 text-[#6B6355]/50">
        <Shield size={14} aria-hidden="true" />
        <span className="font-body text-xs">256-bit SSL encrypted · PCI DSS compliant</span>
      </div>
    </div>
  );
}
