"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, defaultViewport } from "@/lib/motion";

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
}

/** Scroll-triggered stagger container. Direct children should be <RevealItem>. */
export function RevealGroup({ children, className, as = "div" }: RevealGroupProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}

/** A single staggered child within a <RevealGroup>. */
export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag variants={staggerItem} className={className}>
      {children}
    </MotionTag>
  );
}
