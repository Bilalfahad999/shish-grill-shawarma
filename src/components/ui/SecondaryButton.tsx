"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

type ConflictingHandlers =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

interface SecondaryButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers> {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  light?: boolean;
  target?: string;
  rel?: string;
}

export const SecondaryButton = forwardRef<
  HTMLButtonElement,
  SecondaryButtonProps
>(({ children, className, as: Tag = "button", href, light, target, rel, ...props }, ref) => {
  const base = cn(
    "inline-flex items-center justify-center gap-2 cursor-pointer rounded-full px-7 py-3.5 text-sm font-body font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border",
    light
      ? "border-white/60 text-white hover:bg-white/10 focus-visible:ring-white"
      : "border-[#B54E32] text-[#B54E32] hover:bg-[#B54E32]/8 focus-visible:ring-[#B54E32]"
  );

  if (Tag === "a") {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        aria-label={props["aria-label"]}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className={cn(base, className)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={cn(base, className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

SecondaryButton.displayName = "SecondaryButton";
