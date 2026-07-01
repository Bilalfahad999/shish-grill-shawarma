"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
  id?: string;
  /** Use "h1" when this is the page's primary heading. Defaults to "h2". */
  headingLevel?: "h1" | "h2";
  /** Animates title characters fanning in from center as section scrolls into view. */
  scrollAnimate?: boolean;
}

function AnimChar({
  char,
  index,
  center,
  scrollYProgress,
}: {
  char: string;
  index: number;
  center: number;
  scrollYProgress: any;
}) {
  const dist = index - center;
  const x = useTransform(scrollYProgress, [0, 0.65], [dist * 38, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  return (
    <motion.span
      className={cn("inline-block", char === " " && "w-[0.28em]")}
      style={{ x, opacity }}
    >
      {char === " " ? " " : char}
    </motion.span>
  );
}

function AnimatedTitle({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "center 55%"],
  });
  const chars = text.split("");
  const center = Math.floor(chars.length / 2);

  return (
    <span ref={ref} className={cn("flex flex-wrap", className)}>
      {chars.map((char, i) => (
        <AnimChar key={i} char={char} index={i} center={center} scrollYProgress={scrollYProgress} />
      ))}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className,
  id,
  headingLevel = "h2",
  scrollAnimate = false,
}: SectionTitleProps) {
  const Heading = headingLevel;
  const headingClass = cn(
    "font-heading font-light leading-tight text-balance",
    "text-4xl sm:text-5xl lg:text-6xl",
    light ? "text-[#FAF7F2]" : "text-[#2F2F2F]"
  );

  return (
    <div className={cn("space-y-3", centered && "text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-sm font-body font-medium tracking-[0.2em] uppercase",
            light ? "text-[#D96C2F]/80" : "text-[#D96C2F]"
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading id={id} className={scrollAnimate ? undefined : headingClass}>
        {scrollAnimate ? (
          <AnimatedTitle text={title} className={headingClass} />
        ) : (
          title
        )}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "font-body text-base sm:text-lg leading-relaxed max-w-2xl",
            centered && "mx-auto",
            light ? "text-[#FAF7F2]/70" : "text-[#6B6355]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
