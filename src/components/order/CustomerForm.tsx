"use client";

import { useFormContext } from "react-hook-form";
import { User, Phone, Mail } from "lucide-react";
import type { CheckoutFormValues } from "@/app/checkout/page";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="font-body text-xs text-red-500 mt-1.5" role="alert">
      {message}
    </p>
  );
}

function InputWrapper({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6355]/50">
        {icon}
      </div>
      {children}
    </div>
  );
}

const baseInput =
  "w-full h-13 pl-11 pr-4 rounded-xl border font-body text-sm text-[#2F2F2F] placeholder:text-[#6B6355]/40 focus:outline-none transition-all duration-200";
const inputValid = `${baseInput} border-[#E5DDD0] bg-white focus:border-[#B54E32] focus:ring-2 focus:ring-[#B54E32]/15`;
const inputError = `${baseInput} border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-2 focus:ring-red-200`;

export function CustomerForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-body text-sm font-medium text-[#2F2F2F] mb-1.5">
          Full Name <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <InputWrapper icon={<User size={16} />}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            {...register("name")}
            className={errors.name ? inputError : inputValid}
            style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem" }}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </InputWrapper>
        <FieldError message={errors.name?.message} />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block font-body text-sm font-medium text-[#2F2F2F] mb-1.5">
          Phone Number <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <InputWrapper icon={<Phone size={16} />}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="04XX XXX XXX"
            {...register("phone")}
            className={errors.phone ? inputError : inputValid}
            style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem" }}
            aria-invalid={!!errors.phone}
          />
        </InputWrapper>
        <FieldError message={errors.phone?.message} />
      </div>

      {/* Email (optional) */}
      <div>
        <label htmlFor="email" className="block font-body text-sm font-medium text-[#2F2F2F] mb-1.5">
          Email Address{" "}
          <span className="font-normal text-[#6B6355] text-xs">(optional — for receipt)</span>
        </label>
        <InputWrapper icon={<Mail size={16} />}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
            className={errors.email ? inputError : inputValid}
            style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem" }}
            aria-invalid={!!errors.email}
          />
        </InputWrapper>
        <FieldError message={errors.email?.message} />
      </div>
    </div>
  );
}
