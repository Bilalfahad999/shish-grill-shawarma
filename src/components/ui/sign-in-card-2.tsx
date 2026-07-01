"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Travelling-light border effect ──────────────────────────────────────────

function TravellingLights() {
  const beam =
    "bg-gradient-to-r from-transparent via-white to-transparent opacity-70";
  const beamV =
    "bg-gradient-to-b from-transparent via-white to-transparent opacity-70";
  const base = { duration: 2.5, ease: "easeInOut" as const, repeat: Infinity, repeatDelay: 1 };
  const opBase = { duration: 1.2, repeat: Infinity, repeatType: "mirror" as const };

  return (
    <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
      {/* top */}
      <motion.div
        className={`absolute top-0 left-0 h-[2px] w-1/2 ${beam}`}
        animate={{ left: ["-50%", "100%"] }}
        transition={{ ...base }}
      />
      {/* right */}
      <motion.div
        className={`absolute top-0 right-0 w-[2px] h-1/2 ${beamV}`}
        animate={{ top: ["-50%", "100%"] }}
        transition={{ ...base, delay: 0.6 }}
      />
      {/* bottom */}
      <motion.div
        className={`absolute bottom-0 right-0 h-[2px] w-1/2 ${beam}`}
        animate={{ right: ["-50%", "100%"] }}
        transition={{ ...base, delay: 1.2 }}
      />
      {/* left */}
      <motion.div
        className={`absolute bottom-0 left-0 w-[2px] h-1/2 ${beamV}`}
        animate={{ bottom: ["-50%", "100%"] }}
        transition={{ ...base, delay: 1.8 }}
      />
      {/* corner dots */}
      {[
        "top-0 left-0",
        "top-0 right-0",
        "bottom-0 right-0",
        "bottom-0 left-0",
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} h-2 w-2 rounded-full bg-white/50 blur-[1px]`}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ ...opBase, delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

// ── Background glow blobs ────────────────────────────────────────────────────

function GlowBackground({ accent }: { accent: string }) {
  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-b ${accent} to-black`} />
      {/* top radial */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-white/5 blur-[80px]" />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-white/5 blur-[60px]"
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-white/5 blur-[60px]"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", delay: 1 }}
      />
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse opacity-40" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse opacity-40 [animation-delay:1000ms]" />
    </>
  );
}

// ── Styled input ──────────────────────────────────────────────────────────────

function GlassInput({
  icon: Icon,
  focused,
  onFocus,
  onBlur,
  right,
  ...props
}: {
  icon: React.ElementType;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  right?: React.ReactNode;
} & React.ComponentProps<"input">) {
  return (
    <div className="relative flex items-center overflow-hidden rounded-lg">
      <Icon
        className={cn(
          "absolute left-3 w-4 h-4 transition-colors duration-300",
          focused ? "text-white" : "text-white/40"
        )}
      />
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full bg-white/5 border border-transparent focus:border-white/20 text-white placeholder:text-white/30 h-10 text-sm pl-10 pr-10 rounded-lg outline-none focus:bg-white/10 transition-all duration-300"
        {...props}
      />
      {right && <div className="absolute right-3">{right}</div>}
    </div>
  );
}

// ── Card shell with 3D tilt ──────────────────────────────────────────────────

function TiltCard({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div style={{ perspective: 1500 }}>
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group"
      >
        <TravellingLights />
        {/* glass card */}
        <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.05] shadow-2xl overflow-hidden">
          {/* subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(135deg,white 0.5px,transparent 0.5px),linear-gradient(45deg,white 0.5px,transparent 0.5px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Logo mark ────────────────────────────────────────────────────────────────

function BrandLogo() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
      className="mx-auto w-12 h-12 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden"
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
        <path
          d="M20 8 C20 8 14 14 14 20 C14 26 17 30 20 32 C23 30 26 26 26 20 C26 14 20 8 20 8Z"
          fill="white"
          fillOpacity="0.9"
        />
        <path d="M12 18 L28 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 22 L30 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
    </motion.div>
  );
}

// ── ADMIN SIGN-IN CARD ────────────────────────────────────────────────────────

interface AdminSignInCardProps {
  action: (formData: FormData) => void;
  isPending: boolean;
  error?: string;
  callbackUrl: string;
}

export function AdminSignInCard({
  action,
  isPending,
  error,
  callbackUrl,
}: AdminSignInCardProps) {
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center p-4">
      <GlowBackground accent="from-[#B54E32]/30 via-[#7a1f0f]/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm relative z-10"
      >
        <TiltCard>
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <BrandLogo />
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-white mt-3"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Admin Sign In
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/50 text-xs"
            >
              Shish Shawarma & Grill — Dashboard
            </motion.p>
          </div>

          {/* Dev hint */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-4 px-3 py-2.5 rounded-xl bg-[#B54E32]/10 border border-[#B54E32]/20">
              <p className="text-[#D96C2F] text-xs">
                Dev: <code className="bg-white/10 px-1 py-0.5 rounded">admin@shishgrill.com.au</code>{" "}
                /{" "}
                <code className="bg-white/10 px-1 py-0.5 rounded">admin123</code>
              </p>
            </div>
          )}

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <p className="text-red-400 text-xs">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form action={action} className="space-y-3">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />

            <GlassInput
              icon={Mail}
              type="email"
              name="email"
              placeholder="admin@shishgrill.com.au"
              autoComplete="email"
              required
              focused={focused === "email"}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
            />

            <GlassInput
              icon={Lock}
              type={showPw ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              focused={focused === "password"}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              right={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
            />

            {/* Remember me */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="admin-remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 rounded border border-white/20 bg-white/5 accent-[#B54E32] cursor-pointer"
              />
              <label htmlFor="admin-remember" className="text-white/50 text-xs cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className="w-full relative group/btn mt-1"
            >
              <div className="absolute inset-0 bg-[#B54E32]/40 rounded-lg blur-lg opacity-0 group-hover/btn:opacity-80 transition-opacity duration-300" />
              <div className="relative overflow-hidden bg-[#B54E32] hover:bg-[#D96C2F] text-white font-semibold h-10 rounded-lg transition-colors duration-300 flex items-center justify-center gap-1.5 text-sm disabled:opacity-60">
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                      Sign In
                      <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </form>

          <p className="text-center text-white/25 text-[10px] mt-5">
            Authorised personnel only
          </p>
        </TiltCard>
      </motion.div>
    </div>
  );
}

// ── USER SIGN-IN CARD ─────────────────────────────────────────────────────────

interface UserSignInCardProps {
  onSubmit: (email: string, password: string) => void;
  isPending: boolean;
  error?: string;
}

export function UserSignInCard({ onSubmit, isPending, error }: UserSignInCardProps) {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center p-4">
      <GlowBackground accent="from-[#6E8B5C]/30 via-[#3a5c2a]/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm relative z-10"
      >
        <TiltCard>
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <BrandLogo />
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-white mt-3"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/50 text-xs"
            >
              Sign in to your Shish account
            </motion.p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <p className="text-red-400 text-xs">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(email, password);
            }}
            className="space-y-3"
          >
            <GlassInput
              icon={Mail}
              type="email"
              placeholder="Email address"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              focused={focused === "email"}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
            />

            <GlassInput
              icon={Lock}
              type={showPw ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
              focused={focused === "password"}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              right={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
            />

            {/* Remember + forgot */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2">
                <input
                  id="user-remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border border-white/20 bg-white/5 accent-[#6E8B5C] cursor-pointer"
                />
                <label htmlFor="user-remember" className="text-white/50 text-xs cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-white/50 hover:text-white text-xs transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className="w-full relative group/btn mt-1"
            >
              <div className="absolute inset-0 bg-[#6E8B5C]/40 rounded-lg blur-lg opacity-0 group-hover/btn:opacity-80 transition-opacity duration-300" />
              <div className="relative overflow-hidden bg-[#6E8B5C] hover:bg-[#82a86e] text-white font-semibold h-10 rounded-lg transition-colors duration-300 flex items-center justify-center gap-1.5 text-sm disabled:opacity-60">
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                      Sign In
                      <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 border-t border-white/10" />
              <motion.span
                className="text-white/30 text-xs"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                or
              </motion.span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            {/* Google */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full relative group/google"
            >
              <div className="relative overflow-hidden bg-white/5 text-white h-10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-xs">
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-white/70 group-hover/google:text-white transition-colors">
                  Continue with Google
                </span>
              </div>
            </motion.button>

            {/* Sign up link */}
            <motion.p
              className="text-center text-xs text-white/50 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-white font-medium hover:text-white/70 transition-colors underline-offset-2 hover:underline">
                Create one
              </Link>
            </motion.p>
          </form>
        </TiltCard>
      </motion.div>
    </div>
  );
}

// ── USER SIGN-UP CARD ─────────────────────────────────────────────────────────

interface UserSignUpCardProps {
  onSubmit: (name: string, email: string, password: string) => void;
  isPending: boolean;
  error?: string;
}

export function UserSignUpCard({ onSubmit, isPending, error }: UserSignUpCardProps) {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setValidationError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }
    setValidationError("");
    onSubmit(name, email, password);
  };

  const displayError = validationError || error;

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center p-4">
      <GlowBackground accent="from-[#D96C2F]/25 via-[#B54E32]/15" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm relative z-10"
      >
        <TiltCard>
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <BrandLogo />
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-white mt-3"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Create Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/50 text-xs"
            >
              Join Shish — track orders & save favourites
            </motion.p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {displayError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <p className="text-red-400 text-xs">{displayError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3">
            <GlassInput
              icon={User}
              type="text"
              placeholder="Full name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName((e.target as HTMLInputElement).value)}
              focused={focused === "name"}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
            />

            <GlassInput
              icon={Mail}
              type="email"
              placeholder="Email address"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              focused={focused === "email"}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
            />

            <GlassInput
              icon={Lock}
              type={showPw ? "text" : "password"}
              placeholder="Password (min. 8 characters)"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
              focused={focused === "password"}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              right={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
            />

            <GlassInput
              icon={Lock}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm((e.target as HTMLInputElement).value)}
              focused={focused === "confirm"}
              onFocus={() => setFocused("confirm")}
              onBlur={() => setFocused(null)}
              right={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
            />

            {/* Terms */}
            <div className="flex items-start gap-2 pt-0.5">
              <input
                id="terms"
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 rounded border border-white/20 bg-white/5 accent-[#D96C2F] cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-white/50 text-xs leading-relaxed cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-white hover:text-white/70 transition-colors underline-offset-2 underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-white hover:text-white/70 transition-colors underline-offset-2 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className="w-full relative group/btn"
            >
              <div className="absolute inset-0 bg-[#D96C2F]/40 rounded-lg blur-lg opacity-0 group-hover/btn:opacity-80 transition-opacity duration-300" />
              <div className="relative overflow-hidden bg-[#D96C2F] hover:bg-[#B54E32] text-white font-semibold h-10 rounded-lg transition-colors duration-300 flex items-center justify-center gap-1.5 text-sm disabled:opacity-60">
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                      Create Account
                      <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>

            {/* Sign in link */}
            <motion.p
              className="text-center text-xs text-white/50 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Already have an account?{" "}
              <Link href="/login" className="text-white font-medium hover:text-white/70 transition-colors underline-offset-2 hover:underline">
                Sign in
              </Link>
            </motion.p>
          </form>
        </TiltCard>
      </motion.div>
    </div>
  );
}
