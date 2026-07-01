"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MessageSquare, CheckCircle, Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .regex(/^[0-9 +()-]+$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(10, "Please enter a message (at least 10 characters)"),
});

type ContactFormValues = z.infer<typeof schema>;

const SUBJECTS = [
  "General Enquiry",
  "Catering Enquiry",
  "Order Issue",
  "Feedback",
  "Other",
];

function inputClass(error?: boolean) {
  return `w-full px-4 py-3 rounded-xl border font-body text-sm text-[#2F2F2F] placeholder:text-[#6B6355]/40 focus:outline-none transition-all duration-200 bg-white ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
      : "border-[#E5DDD0] focus:border-[#B54E32] focus:ring-2 focus:ring-[#B54E32]/15"
  }`;
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your message. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E5DDD0]/60 shadow-sm p-7 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="py-10 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#6E8B5C]/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-[#6E8B5C]" />
            </div>
            <h3 className="font-heading text-2xl font-light text-[#2F2F2F] mb-2">
              Message Sent!
            </h3>
            <p className="font-body text-sm text-[#6B6355]">
              Thank you for getting in touch. We'll respond as soon as possible.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-body" role="alert">
                {error}
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="cf-name" className="block font-body text-xs font-semibold text-[#2F2F2F] tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6355]" aria-hidden="true" />
                  <input
                    id="cf-name"
                    {...register("name")}
                    placeholder="Your name"
                    autoComplete="name"
                    className={`${inputClass(!!errors.name)} pl-10`}
                  />
                </div>
                {errors.name && <p className="font-body text-xs text-red-500" role="alert">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cf-phone" className="block font-body text-xs font-semibold text-[#2F2F2F] tracking-wide">
                  Phone
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6355]" aria-hidden="true" />
                  <input
                    id="cf-phone"
                    {...register("phone")}
                    placeholder="04XX XXX XXX"
                    type="tel"
                    autoComplete="tel"
                    className={`${inputClass(!!errors.phone)} pl-10`}
                  />
                </div>
                {errors.phone && <p className="font-body text-xs text-red-500" role="alert">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-email" className="block font-body text-xs font-semibold text-[#2F2F2F] tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6355]" aria-hidden="true" />
                <input
                  id="cf-email"
                  {...register("email")}
                  placeholder="your@email.com"
                  type="email"
                  autoComplete="email"
                  className={`${inputClass(!!errors.email)} pl-10`}
                />
              </div>
              {errors.email && <p className="font-body text-xs text-red-500" role="alert">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-subject" className="block font-body text-xs font-semibold text-[#2F2F2F] tracking-wide">
                Subject
              </label>
              <div className="relative">
                <MessageSquare size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6355]" aria-hidden="true" />
                <select
                  id="cf-subject"
                  {...register("subject")}
                  defaultValue=""
                  className={`${inputClass(!!errors.subject)} pl-10`}
                >
                  <option value="" disabled>Select a subject…</option>
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {errors.subject && <p className="font-body text-xs text-red-500" role="alert">{errors.subject.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-message" className="block font-body text-xs font-semibold text-[#2F2F2F] tracking-wide">
                Message
              </label>
              <textarea
                id="cf-message"
                {...register("message")}
                placeholder="How can we help you?"
                rows={4}
                className={`${inputClass(!!errors.message)} resize-none`}
              />
              {errors.message && <p className="font-body text-xs text-red-500" role="alert">{errors.message.message}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#B54E32] text-white font-body font-semibold text-sm hover:bg-[#D96C2F] transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <Send size={15} aria-hidden="true" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
