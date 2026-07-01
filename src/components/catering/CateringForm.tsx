"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Mail,
  CalendarDays,
  Users,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  Package,
  Truck,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { openCateringWhatsApp } from "@/lib/whatsapp";

// ── Schema ───────────────────────────────────────────────────────────────────

const schema = z
  .object({
    // Step 1
    name: z.string().min(2, "Please enter your full name"),
    phone: z
      .string()
      .min(8, "Please enter a valid phone number")
      .regex(/^[0-9 +()-]+$/, "Invalid phone number"),
    email: z.string().email("Invalid email address"),
    // Step 2
    eventType: z.string().min(1, "Please select an event type"),
    guestCount: z.string().min(1, "Please enter approximate guest count"),
    date: z.string().min(1, "Please select a preferred date"),
    time: z.string().min(1, "Please enter a preferred time"),
    // Step 3
    collectionType: z.enum(["pickup", "delivery"]),
    venueAddress: z.string().optional(),
    budget: z.string().optional(),
    specialRequests: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.collectionType === "delivery" && !data.venueAddress) {
      ctx.addIssue({
        code: "custom",
        path: ["venueAddress"],
        message: "Please enter the venue address for delivery",
      });
    }
  });

type CateringFormValues = z.infer<typeof schema>;

const EVENT_TYPES = [
  "Family Gathering",
  "Corporate Lunch",
  "Birthday Party",
  "School Event",
  "Community Event",
  "Private Function",
  "Other",
];

const STEPS = [
  { id: 0, label: "Contact", short: "You" },
  { id: 1, label: "Event", short: "Event" },
  { id: 2, label: "Delivery", short: "Pickup" },
  { id: 3, label: "Review", short: "Review" },
];

const STEP_FIELDS: (keyof CateringFormValues)[][] = [
  ["name", "phone", "email"],
  ["eventType", "guestCount", "date", "time"],
  ["collectionType", "venueAddress"],
  [],
];

// ── Field component ───────────────────────────────────────────────────────────

function Field({
  label,
  name,
  icon,
  children,
}: {
  label: string;
  name: keyof CateringFormValues;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const {
    formState: { errors },
  } = useFormContext<CateringFormValues>();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block font-body text-xs font-semibold text-[#2F2F2F] tracking-wide">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6355]" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className={icon ? "pl-10" : ""}>{children}</div>
      </div>
      {error && (
        <p className="font-body text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(error?: boolean) {
  return `w-full px-4 py-3 rounded-xl border font-body text-sm text-[#2F2F2F] placeholder:text-[#6B6355]/40 focus:outline-none transition-all duration-200 ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
      : "border-[#E5DDD0] bg-white focus:border-[#B54E32] focus:ring-2 focus:ring-[#B54E32]/15"
  }`;
}

// ── Step components ───────────────────────────────────────────────────────────

function Step1() {
  const { register, formState: { errors } } = useFormContext<CateringFormValues>();
  return (
    <div className="space-y-5">
      <Field label="Full Name" name="name" icon={<User size={16} />}>
        <input
          id="name"
          {...register("name")}
          placeholder="Your full name"
          className={inputClass(!!errors.name)}
          autoComplete="name"
        />
      </Field>
      <Field label="Phone Number" name="phone" icon={<Phone size={16} />}>
        <input
          id="phone"
          {...register("phone")}
          placeholder="04XX XXX XXX"
          type="tel"
          className={inputClass(!!errors.phone)}
          autoComplete="tel"
        />
      </Field>
      <Field label="Email Address" name="email" icon={<Mail size={16} />}>
        <input
          id="email"
          {...register("email")}
          placeholder="your@email.com"
          type="email"
          className={inputClass(!!errors.email)}
          autoComplete="email"
        />
      </Field>
    </div>
  );
}

function Step2() {
  const { register, formState: { errors } } = useFormContext<CateringFormValues>();
  return (
    <div className="space-y-5">
      <Field label="Event Type" name="eventType">
        <select
          id="eventType"
          {...register("eventType")}
          className={inputClass(!!errors.eventType)}
          defaultValue=""
        >
          <option value="" disabled>Select event type…</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Approximate Number of Guests" name="guestCount" icon={<Users size={16} />}>
        <input
          id="guestCount"
          {...register("guestCount")}
          placeholder="e.g. 30–50 guests"
          className={inputClass(!!errors.guestCount)}
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Preferred Date" name="date" icon={<CalendarDays size={16} />}>
          <input
            id="date"
            {...register("date")}
            type="date"
            className={inputClass(!!errors.date)}
            min={new Date().toISOString().split("T")[0]}
          />
        </Field>
        <Field label="Preferred Time" name="time" icon={<Clock size={16} />}>
          <input
            id="time"
            {...register("time")}
            type="time"
            className={inputClass(!!errors.time)}
          />
        </Field>
      </div>
    </div>
  );
}

function Step3() {
  const { register, watch, formState: { errors } } = useFormContext<CateringFormValues>();
  const collectionType = watch("collectionType");
  return (
    <div className="space-y-5">
      {/* Collection type */}
      <div>
        <p className="font-body text-xs font-semibold text-[#2F2F2F] tracking-wide mb-3">
          Pickup or Delivery?
        </p>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Collection type">
          {(["pickup", "delivery"] as const).map((type) => (
            <label
              key={type}
              htmlFor={`col-${type}`}
              className={`flex flex-col items-center gap-2.5 py-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                collectionType === type
                  ? "border-[#B54E32] bg-[#B54E32]/6"
                  : "border-[#E5DDD0] hover:border-[#B54E32]/40"
              }`}
            >
              <input
                id={`col-${type}`}
                type="radio"
                {...register("collectionType")}
                value={type}
                className="sr-only"
              />
              {type === "pickup" ? (
                <Package size={22} className={collectionType === type ? "text-[#B54E32]" : "text-[#6B6355]"} />
              ) : (
                <Truck size={22} className={collectionType === type ? "text-[#B54E32]" : "text-[#6B6355]"} />
              )}
              <span className={`font-body font-semibold text-sm ${collectionType === type ? "text-[#B54E32]" : "text-[#2F2F2F]"}`}>
                {type === "pickup" ? "Pickup" : "Delivery"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Venue address (delivery only) */}
      <AnimatePresence>
        {collectionType === "delivery" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Field label="Venue / Delivery Address" name="venueAddress" icon={<MapPin size={16} />}>
              <input
                id="venueAddress"
                {...register("venueAddress")}
                placeholder="Full delivery address"
                className={inputClass(!!errors.venueAddress)}
              />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      <Field label="Approximate Budget (optional)" name="budget" icon={<DollarSign size={16} />}>
        <input
          id="budget"
          {...register("budget")}
          placeholder="e.g. $500–$800"
          className={inputClass()}
        />
      </Field>

      <Field label="Special Requests (optional)" name="specialRequests">
        <textarea
          id="specialRequests"
          {...register("specialRequests")}
          placeholder="Dietary requirements, menu preferences, extra details…"
          rows={3}
          className={`${inputClass()} resize-none`}
        />
      </Field>
    </div>
  );
}

function ReviewStep({ values }: { values: CateringFormValues }) {
  const rows = [
    { label: "Name", value: values.name },
    { label: "Phone", value: values.phone },
    { label: "Email", value: values.email },
    { label: "Event Type", value: values.eventType },
    { label: "Guests", value: values.guestCount },
    { label: "Date", value: values.date },
    { label: "Time", value: values.time },
    { label: "Collection", value: values.collectionType === "pickup" ? "Pickup" : `Delivery to ${values.venueAddress}` },
    ...(values.budget ? [{ label: "Budget", value: values.budget }] : []),
    ...(values.specialRequests ? [{ label: "Requests", value: values.specialRequests }] : []),
  ];

  return (
    <div className="space-y-4">
      <p className="font-body text-sm text-[#6B6355]">
        Please review your enquiry before submitting. We'll be in touch within 24 hours.
      </p>
      <div className="bg-[#F2ECE3] rounded-2xl divide-y divide-[#E5DDD0] overflow-hidden">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-4 px-5 py-3">
            <span className="font-body text-xs font-semibold text-[#6B6355] uppercase tracking-[0.1em] w-24 shrink-0 pt-0.5">
              {row.label}
            </span>
            <span className="font-body text-sm text-[#2F2F2F] break-words">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function CateringForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<CateringFormValues | null>(null);

  const methods = useForm<CateringFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      collectionType: "pickup",
      budget: "",
      specialRequests: "",
      venueAddress: "",
    },
    mode: "onTouched",
  });

  const { trigger, handleSubmit, getValues } = methods;

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step] as (keyof CateringFormValues)[]);
    if (!valid) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (data: CateringFormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/catering-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit enquiry");
      setSubmittedData(data);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong submitting your enquiry. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-[#E5DDD0]/60 shadow-sm p-10 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-[#6E8B5C]/15 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={40} className="text-[#6E8B5C]" />
        </div>
        <h3 className="font-heading text-3xl font-light text-[#2F2F2F] mb-3">
          Enquiry Received!
        </h3>
        <p className="font-body text-base text-[#6B6355] max-w-md mx-auto mb-6">
          Thank you for reaching out. Our team will review your enquiry and get back to you within 24 hours to confirm details and pricing.
        </p>
        <p className="font-body text-sm text-[#B54E32] font-medium mb-6">
          In the meantime, feel free to call us directly if you have any urgent questions.
        </p>
        {submittedData && (
          <button
            type="button"
            onClick={() => openCateringWhatsApp(submittedData)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6E8B5C] text-white font-body font-semibold text-sm hover:bg-[#5C7849] transition-colors cursor-pointer"
          >
            Message Us on WhatsApp
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div id="enquiry" className="bg-white rounded-3xl border border-[#E5DDD0]/60 shadow-sm overflow-hidden">
      {/* Progress */}
      <div className="px-7 py-5 border-b border-[#E5DDD0] flex items-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-semibold transition-all duration-300 ${
                  step > s.id
                    ? "bg-[#6E8B5C] text-white"
                    : step === s.id
                    ? "bg-[#B54E32] text-white shadow-md"
                    : "bg-[#E5DDD0] text-[#6B6355]"
                }`}
                aria-current={step === s.id ? "step" : undefined}
              >
                {step > s.id ? "✓" : s.id + 1}
              </div>
              <span
                className={`mt-1 font-body text-[10px] font-medium whitespace-nowrap ${
                  step >= s.id ? "text-[#2F2F2F]" : "text-[#6B6355]/50"
                }`}
              >
                {s.short}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 transition-colors duration-300 ${
                  step > i ? "bg-[#6E8B5C]" : "bg-[#E5DDD0]"
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Header */}
          <div className="px-7 pt-6 pb-2">
            <h3 className="font-heading text-2xl font-semibold text-[#2F2F2F]">
              {STEPS[step].label}
            </h3>
            <p className="font-body text-xs text-[#6B6355] mt-0.5">
              Step {step + 1} of {STEPS.length}
            </p>
          </div>

          {/* Step content */}
          <div className="px-7 py-6 min-h-[280px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                {step === 0 && <Step1 />}
                {step === 1 && <Step2 />}
                {step === 2 && <Step3 />}
                {step === 3 && <ReviewStep values={getValues()} />}
              </motion.div>
            </AnimatePresence>
            {submitError && (
              <div className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-body" role="alert">
                {submitError}
              </div>
            )}
          </div>

          {/* Footer nav */}
          <div className="px-7 py-5 border-t border-[#E5DDD0] flex items-center justify-between gap-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-2 font-body text-sm text-[#6B6355] hover:text-[#2F2F2F] transition-colors cursor-pointer"
              >
                <ArrowLeft size={15} /> Back
              </button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D96C2F] text-white font-body font-semibold text-sm hover:bg-[#C45A20] transition-all duration-200 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96C2F]"
              >
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <motion.button
                type="submit"
                disabled={submitting}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#B54E32] text-white font-body font-bold text-sm hover:bg-[#D96C2F] transition-all duration-200 shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </motion.button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
