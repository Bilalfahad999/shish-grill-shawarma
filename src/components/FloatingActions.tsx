"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Navigation, ShoppingBag, ArrowUp, X, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const pathname = usePathname();
  const { settings } = useSiteSettings();

  const actions = [
    {
      id: "call",
      label: "Call Us",
      icon: <Phone size={16} />,
      href: `tel:${settings.phone}`,
      external: false,
      color: "bg-[#6E8B5C] hover:bg-[#4C6B3C]",
    },
    {
      id: "directions",
      label: "Directions",
      icon: <Navigation size={16} />,
      href: settings.googleMapsUrl ?? "https://maps.google.com",
      external: true,
      color: "bg-[#4C6B3C] hover:bg-[#3a5530]",
    },
    {
      id: "order",
      label: "Order Online",
      icon: <ShoppingBag size={16} />,
      href: "/menu",
      external: false,
      color: "bg-[#B54E32] hover:bg-[#D96C2F]",
    },
  ];

  // Hide on cart/checkout/success/admin
  const hidden =
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname?.startsWith("/order/success") ||
    pathname?.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (hidden) return null;

  return (
    <div
      className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3"
      aria-label="Quick actions"
    >
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={scrollTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] shadow-md text-[#6B6355] hover:text-[#B54E32] hover:border-[#B54E32] flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Action items */}
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ delay: i * 0.06, duration: 0.2 }}
              className="flex items-center gap-2.5"
            >
              <span className="font-body text-xs font-medium text-[#2F2F2F] bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md border border-[#E5DDD0] whitespace-nowrap">
                {action.label}
              </span>
              {action.external ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={action.label}
                  className={`w-11 h-11 rounded-full ${action.color} text-white flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
                >
                  {action.icon}
                </a>
              ) : (
                <Link
                  href={action.href}
                  aria-label={action.label}
                  onClick={() => setOpen(false)}
                  className={`w-11 h-11 rounded-full ${action.color} text-white flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
                >
                  {action.icon}
                </Link>
              )}
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        aria-expanded={open}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full bg-[#B54E32] text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:bg-[#D96C2F] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-offset-2"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22 }}
        >
          {open ? <X size={22} /> : <Plus size={22} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
