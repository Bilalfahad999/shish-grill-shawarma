"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, defaultViewport } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}

/** Scroll-triggered reveal. Wraps any block of content with the app's standard fade-up. */
export function Reveal({ children, variants = fadeUp, delay = 0, className, as = "div" }: RevealProps) {
  const MotionTag = motion[as];

  // Variant-level transitions take precedence over the component `transition` prop in
  // Framer Motion, so to support a per-instance delay we merge it into the variant itself.
  const delayedVariants: Variants = delay
    ? {
        hidden: variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: { ...(variants.visible as { transition?: object })?.transition, delay },
        },
      }
    : variants;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={delayedVariants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
