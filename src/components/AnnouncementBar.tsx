"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { getAnnouncement } from "@/lib/actions/content";
import type { AdminAnnouncement } from "@/types/admin";

const icons = {
  info: <Info size={14} aria-hidden="true" />,
  success: <CheckCircle size={14} aria-hidden="true" />,
  warning: <AlertTriangle size={14} aria-hidden="true" />,
};

const styles = {
  info: "bg-[#B54E32] text-white",
  success: "bg-[#6E8B5C] text-white",
  warning: "bg-[#D96C2F] text-white",
};

export function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<AdminAnnouncement | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    getAnnouncement().then((data) => {
      if (!cancelled) setAnnouncement(data);
    });
    return () => { cancelled = true; };
  }, []);

  if (!announcement?.enabled || pathname?.startsWith("/admin")) return null;

  return (
    <AnimatePresence initial={false}>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div
            className={`${styles[announcement.type]} relative flex items-center justify-center gap-3 px-4 py-2.5 text-center`}
            role="banner"
            aria-label="Announcement"
          >
            <span className="shrink-0 opacity-80">
              {icons[announcement.type]}
            </span>
            <p className="font-body text-xs sm:text-sm font-medium leading-snug">
              {announcement.message}
            </p>
            {announcement.dismissible && (
              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss announcement"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full opacity-60 hover:opacity-100 hover:bg-white/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
