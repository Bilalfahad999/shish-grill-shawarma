"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open, title, description, confirmLabel = "Confirm",
  danger = false, loading = false, onConfirm, onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Escape to close, autofocus Cancel on open, return focus to trigger on close
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    cancelRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onCancel}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-description"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[61] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6"
          >
            {danger && (
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle size={22} className="text-red-600" />
              </div>
            )}
            <h2 id="confirm-title" className="font-semibold text-[#111] text-base text-center mb-2" style={{ fontFamily: "var(--font-inter)" }}>
              {title}
            </h2>
            <p id="confirm-description" className="text-sm text-neutral-500 text-center leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>
              {description}
            </p>
            <div className="flex gap-3">
              <button
                ref={cancelRef}
                onClick={onCancel}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 ${
                  danger ? "bg-red-600 hover:bg-red-700" : "bg-[#B54E32] hover:bg-[#D96C2F]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : null}
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
