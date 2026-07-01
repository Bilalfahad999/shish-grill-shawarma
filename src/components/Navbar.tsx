"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ShoppingBag, Lock, UserCircle } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Logo } from "@/components/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Catering", href: "/catering" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { settings } = useSiteSettings();
  const { isLoggedIn, profile } = useUser();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E5DDD0]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Shish Shawarma & Grill - Home"
            >
              <Logo
                variant="mark"
                size={44}
                priority
                className="w-11 h-11 rounded-xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <span
                  className={`block font-heading text-xl font-semibold leading-tight transition-colors duration-300 ${
                    scrolled ? "text-[#2F2F2F]" : "text-white"
                  }`}
                >
                  Shish
                </span>
                <span
                  className={`block font-body text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                    scrolled ? "text-[#B54E32]" : "text-white/80"
                  }`}
                >
                  Shawarma & Grill
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#D96C2F] relative group ${
                    scrolled ? "text-[#2F2F2F]" : "text-white/90"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D96C2F] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${settings.phone}`}
                className={`inline-flex items-center gap-2 font-body text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                  scrolled
                    ? "border-[#B54E32] text-[#B54E32] hover:bg-[#B54E32]/8"
                    : "border-white/60 text-white hover:bg-white/10"
                }`}
                aria-label="Call us"
              >
                <Phone size={14} />
                Call Now
              </a>
              {/* Customer account / sign in */}
              {isLoggedIn && profile ? (
                <Link
                  href="/account"
                  className={`inline-flex items-center gap-2 font-body text-sm font-medium px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                    scrolled
                      ? "border-[#E5DDD0] text-[#2F2F2F] hover:border-[#B54E32] hover:text-[#B54E32]"
                      : "border-white/40 text-white hover:bg-white/10"
                  }`}
                  aria-label="My account"
                >
                  <span className="w-6 h-6 rounded-full bg-[#B54E32] flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
                    {profile.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                  <span className="hidden xl:inline max-w-[80px] truncate">
                    {profile.name?.split(" ")[0] ?? "Account"}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className={`inline-flex items-center gap-1.5 font-body text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                    scrolled
                      ? "border-[#E5DDD0] text-[#2F2F2F] hover:border-[#B54E32] hover:text-[#B54E32]"
                      : "border-white/40 text-white hover:bg-white/10"
                  }`}
                  aria-label="Sign in to your account"
                >
                  <UserCircle size={15} />
                  Sign In
                </Link>
              )}
              {/* Staff/admin login */}
              <Link
                href="/admin/login"
                className={`hidden xl:inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 cursor-pointer ${
                  scrolled
                    ? "border-[#E5DDD0] text-[#2F2F2F] hover:border-[#B54E32] hover:text-[#B54E32]"
                    : "border-white/40 text-white hover:bg-white/10"
                }`}
                aria-label="Staff login"
                title="Staff login"
              >
                <Lock size={15} />
              </Link>
              {/* Cart icon with badge */}
              <Link
                href="/cart"
                className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 cursor-pointer ${
                  scrolled
                    ? "border-[#E5DDD0] text-[#2F2F2F] hover:border-[#B54E32] hover:text-[#B54E32]"
                    : "border-white/40 text-white hover:bg-white/10"
                }`}
                aria-label={`Cart${itemCount > 0 ? ` — ${itemCount} item${itemCount !== 1 ? "s" : ""}` : ""}`}
              >
                <ShoppingBag size={16} />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 1.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full bg-[#D96C2F] text-white text-[9px] font-body font-bold flex items-center justify-center px-1"
                    aria-hidden="true"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </motion.span>
                )}
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 font-body text-sm font-medium px-5 py-2.5 rounded-full bg-[#D96C2F] text-white hover:bg-[#C45A20] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                aria-label="Order online"
              >
                Order Online
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors duration-200 cursor-pointer ${
                scrolled
                  ? "text-[#2F2F2F] hover:bg-[#F2ECE3]"
                  : "text-white bg-black/25 hover:bg-black/40 backdrop-blur-sm shadow-sm"
              }`}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[60] bg-[#FAF7F2] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5DDD0]">
              <div className="flex items-center gap-3">
                <Logo variant="mark" size={40} className="w-10 h-10 rounded-lg" />
                <div>
                  <span className="block font-heading text-lg font-semibold text-[#2F2F2F]">Shish</span>
                  <span className="block font-body text-[9px] tracking-[0.18em] uppercase text-[#B54E32]">Shawarma & Grill</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-[#2F2F2F] hover:bg-[#F2ECE3] transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-heading text-4xl font-light text-[#2F2F2F] py-3 border-b border-[#E5DDD0] hover:text-[#B54E32] hover:pl-2 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA buttons */}
            <div className="px-8 pb-10 flex flex-col gap-3">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-2 font-body font-medium py-3.5 rounded-full border border-[#B54E32] text-[#B54E32] hover:bg-[#B54E32]/8 transition-colors cursor-pointer"
              >
                <Phone size={16} />
                Call Now
              </a>
              <Link
                href="/menu"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 font-body font-medium py-3.5 rounded-full bg-[#D96C2F] text-white hover:bg-[#C45A20] transition-colors shadow-sm cursor-pointer"
              >
                <ShoppingBag size={16} />
                Order Online
              </Link>
              {isLoggedIn && profile ? (
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 font-body text-sm font-medium py-3.5 rounded-full border border-[#B54E32] text-[#B54E32] hover:bg-[#B54E32]/8 transition-colors cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#B54E32] flex items-center justify-center text-white text-xs font-semibold">
                    {profile.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                  My Account
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 font-body text-sm font-medium py-3.5 rounded-full border border-[#E5DDD0] text-[#2F2F2F] hover:border-[#B54E32] hover:text-[#B54E32] transition-colors cursor-pointer"
                >
                  <UserCircle size={15} />
                  Sign In
                </Link>
              )}
              <Link
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 font-body text-sm text-[#6B6355] hover:text-[#B54E32] transition-colors cursor-pointer pt-1"
              >
                <Lock size={13} />
                Staff Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
