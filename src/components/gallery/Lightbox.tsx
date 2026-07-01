"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/config/gallery-data";

interface LightboxProps {
  images: GalleryImage[];
  current: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, current, onClose, onNavigate }: LightboxProps) {
  const isOpen = current !== null;
  const img = current !== null ? images[current] : null;

  const prev = useCallback(() => {
    if (current === null) return;
    onNavigate((current - 1 + images.length) % images.length);
  }, [current, images.length, onNavigate]);

  const next = useCallback(() => {
    if (current === null) return;
    onNavigate((current + 1) % images.length);
  }, [current, images.length, onNavigate]);

  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose, prev, next]);

  // Touch swipe support
  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  };

  return (
    <AnimatePresence>
      {isOpen && img && (
        <>
          {/* Backdrop */}
          <motion.div
            key="lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/92 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="lb-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={img.alt}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] pointer-events-auto"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Image */}
              <div className="relative w-full max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl bg-[#1a1a1a]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              <p className="mt-3 font-body text-sm text-white/60 text-center px-4">
                {img.alt}
                <span className="ml-2 text-white/30">
                  ({(current ?? 0) + 1} / {images.length})
                </span>
              </p>
            </div>
          </motion.div>

          {/* Controls */}
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="fixed top-4 right-4 z-[92] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={prev}
              aria-label="Previous image"
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[92] w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={next}
              aria-label="Next image"
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[92] w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
