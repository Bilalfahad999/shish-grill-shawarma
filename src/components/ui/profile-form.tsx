"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Phone, MapPin, Home, Hash, ArrowRight, CheckCircle2, AlertCircle, User, Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import type { UserProfile, DeliveryAddress } from "@/types/user";

// ── Re-used glass input ──────────────────────────────────────────────────────

function GlassInput({
  icon: Icon,
  label,
  focused,
  onFocus,
  onBlur,
  className,
  ...props
}: {
  icon: React.ElementType;
  label: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  className?: string;
} & React.ComponentProps<"input">) {
  return (
    <div className={cn("space-y-1", className)}>
      <label className="text-white/50 text-[10px] uppercase tracking-widest font-medium">
        {label}
      </label>
      <div className="relative flex items-center overflow-hidden rounded-lg">
        <Icon
          className={cn(
            "absolute left-3 w-4 h-4 transition-colors duration-300 shrink-0",
            focused ? "text-white" : "text-white/35"
          )}
        />
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full bg-white/5 border border-transparent focus:border-white/20 text-white placeholder:text-white/25 h-10 text-sm pl-10 pr-3 rounded-lg outline-none focus:bg-white/10 transition-all duration-300"
          {...props}
        />
      </div>
    </div>
  );
}

// ── Travelling light border ──────────────────────────────────────────────────

function TravellingLights() {
  const base = { duration: 2.5, ease: "easeInOut" as const, repeat: Infinity, repeatDelay: 1 };
  const beam = "bg-gradient-to-r from-transparent via-white to-transparent opacity-60";
  const beamV = "bg-gradient-to-b from-transparent via-white to-transparent opacity-60";
  return (
    <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
      <motion.div className={`absolute top-0 left-0 h-[2px] w-1/2 ${beam}`} animate={{ left: ["-50%", "100%"] }} transition={base} />
      <motion.div className={`absolute top-0 right-0 w-[2px] h-1/2 ${beamV}`} animate={{ top: ["-50%", "100%"] }} transition={{ ...base, delay: 0.6 }} />
      <motion.div className={`absolute bottom-0 right-0 h-[2px] w-1/2 ${beam}`} animate={{ right: ["-50%", "100%"] }} transition={{ ...base, delay: 1.2 }} />
      <motion.div className={`absolute bottom-0 left-0 w-[2px] h-1/2 ${beamV}`} animate={{ bottom: ["-50%", "100%"] }} transition={{ ...base, delay: 1.8 }} />
      {["top-0 left-0", "top-0 right-0", "bottom-0 right-0", "bottom-0 left-0"].map((p, i) => (
        <motion.div key={i} className={`absolute ${p} h-2 w-2 rounded-full bg-white/40 blur-[1px]`} animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: i * 0.4 }} />
      ))}
    </div>
  );
}

// ── Main exported component ──────────────────────────────────────────────────

interface ProfileFormProps {
  /** Pre-fill fields from existing profile */
  initialValues?: Partial<UserProfile>;
  /** "setup" = first-time onboarding after signup, "edit" = account settings */
  mode?: "setup" | "edit";
  onSave: (phone: string, address: DeliveryAddress) => Promise<void>;
  /** Called when user skips (setup mode only) */
  onSkip?: () => void;
}

export function ProfileForm({
  initialValues,
  mode = "setup",
  onSave,
  onSkip,
}: ProfileFormProps) {
  const [phone, setPhone] = useState(initialValues?.phone ?? "");
  const [street, setStreet] = useState(initialValues?.address?.street ?? "");
  const [suburb, setSuburb] = useState(initialValues?.address?.suburb ?? "");
  const [state, setState] = useState(initialValues?.address?.state ?? "");
  const [postcode, setPostcode] = useState(initialValues?.address?.postcode ?? "");
  const [focused, setFocused] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // 3D card tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);
  const handleMouseMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) { setError("Phone number is required."); return; }
    if (!street.trim() || !suburb.trim() || !postcode.trim()) {
      setError("Please fill in your full delivery address.");
      return;
    }
    setError("");
    setIsPending(true);
    try {
      await onSave(phone.trim(), {
        street: street.trim(),
        suburb: suburb.trim(),
        state: state.trim(),
        postcode: postcode.trim(),
      });
      if (mode === "edit") setSaved(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const accentFrom = mode === "setup" ? "from-[#D96C2F]/25 via-[#B54E32]/15" : "from-[#6E8B5C]/25 via-[#4C6B3C]/15";
  const accentBtn = mode === "setup"
    ? "bg-[#D96C2F] hover:bg-[#B54E32]"
    : "bg-[#6E8B5C] hover:bg-[#4C6B3C]";
  const accentGlow = mode === "setup" ? "bg-[#D96C2F]/40" : "bg-[#6E8B5C]/40";

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${accentFrom} to-black`} />
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-white/5 blur-[80px]"
        animate={{ opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }} />
      <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-white/5 rounded-full blur-[80px] animate-pulse opacity-30" />
      <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-white/5 rounded-full blur-[80px] animate-pulse opacity-30 [animation-delay:1000ms]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="w-full max-w-sm relative z-10"
        style={{ perspective: 1500 }}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative group"
        >
          <TravellingLights />

          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.05] shadow-2xl overflow-hidden">
            {/* Grid texture */}
            <div className="absolute inset-0 opacity-[0.025]"
              style={{ backgroundImage: "linear-gradient(135deg,white 0.5px,transparent 0.5px),linear-gradient(45deg,white 0.5px,transparent 0.5px)", backgroundSize: "30px 30px" }} />

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-6">
                {/* Brand mark */}
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="mx-auto mb-3">
                  <Logo variant="mark" size={48} className="w-12 h-12 rounded-xl" />
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {mode === "setup" ? "Almost There!" : "Delivery Details"}
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                  className="text-white/45 text-xs mt-1">
                  {mode === "setup"
                    ? "Add your phone & address for fast delivery"
                    : "Update your contact and delivery information"}
                </motion.p>

                {/* Step indicator (setup only) */}
                {mode === "setup" && (
                  <div className="flex items-center justify-center gap-2 mt-3" aria-label="Step 2 of 2">
                    <div className="w-6 h-1 rounded-full bg-white/20" />
                    <div className="w-6 h-1 rounded-full bg-white" />
                  </div>
                )}
              </div>

              {/* Read-only user info (setup mode) */}
              {mode === "setup" && initialValues?.name && (
                <div className="flex items-center gap-3 mb-4 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User size={14} className="text-white/60" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{initialValues.name}</p>
                    <p className="text-white/40 text-[11px] truncate">{initialValues.email}</p>
                  </div>
                </div>
              )}

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mb-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertCircle size={13} className="text-red-400 shrink-0" />
                    <p className="text-red-400 text-xs">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success */}
              <AnimatePresence>
                {saved && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mb-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
                    <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                    <p className="text-green-400 text-xs">Details saved successfully!</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Phone */}
                <GlassInput
                  icon={Phone}
                  label="Mobile number"
                  type="tel"
                  placeholder="04XX XXX XXX"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  focused={focused === "phone"}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                />

                {/* Address divider */}
                <div className="flex items-center gap-2 pt-1">
                  <MapPin size={12} className="text-white/30 shrink-0" />
                  <span className="text-white/30 text-[10px] uppercase tracking-widest">Delivery Address</span>
                  <div className="flex-1 border-t border-white/10" />
                </div>

                {/* Street */}
                <GlassInput
                  icon={Home}
                  label="Street address"
                  type="text"
                  placeholder="123 Collins Street"
                  autoComplete="street-address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  focused={focused === "street"}
                  onFocus={() => setFocused("street")}
                  onBlur={() => setFocused(null)}
                />

                {/* Suburb + Postcode on same row */}
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <GlassInput
                    icon={MapPin}
                    label="Suburb"
                    type="text"
                    placeholder="Melbourne"
                    autoComplete="address-level2"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    focused={focused === "suburb"}
                    onFocus={() => setFocused("suburb")}
                    onBlur={() => setFocused(null)}
                  />
                  <GlassInput
                    icon={Hash}
                    label="Postcode"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="3000"
                    autoComplete="postal-code"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    focused={focused === "postcode"}
                    onFocus={() => setFocused("postcode")}
                    onBlur={() => setFocused(null)}
                    className="w-28"
                  />
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label className="text-white/50 text-[10px] uppercase tracking-widest font-medium">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-white/5 border border-transparent focus:border-white/20 text-white h-10 text-sm px-3 rounded-lg outline-none focus:bg-white/10 transition-all duration-300 appearance-none"
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select state…</option>
                    {["VIC", "NSW", "QLD", "SA", "WA", "TAS", "NT", "ACT"].map((s) => (
                      <option key={s} value={s} className="bg-[#1a1a1a]">{s}</option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isPending}
                  className="w-full relative group/btn mt-1"
                >
                  <div className={`absolute inset-0 ${accentGlow} rounded-lg blur-lg opacity-0 group-hover/btn:opacity-80 transition-opacity duration-300`} />
                  <div className={`relative overflow-hidden ${accentBtn} text-white font-semibold h-10 rounded-lg transition-colors duration-300 flex items-center justify-center gap-1.5 text-sm disabled:opacity-60`}>
                    <AnimatePresence mode="wait">
                      {isPending ? (
                        <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.span key="txt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                          {mode === "setup" ? "Save & Continue" : "Save Changes"}
                          <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                {/* Skip (setup only) */}
                {mode === "setup" && onSkip && (
                  <button
                    type="button"
                    onClick={onSkip}
                    className="w-full text-center text-white/35 hover:text-white/60 text-xs transition-colors py-1"
                  >
                    Skip for now — I'll add this later
                  </button>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
