"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

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
  /** Animates the title's letters in, word by word, as the section scrolls into view. */
  scrollAnimate?: boolean;
}

// Intersection-triggered stagger — reliable on mobile (Android/iOS) where
// scroll-linked progress often stalls and leaves the title stuck invisible.
const titleContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025 } },
};
const charVariant: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

function AnimatedTitle({
  text,
  className,
  centered,
}: {
  text: string;
  className: string;
  centered?: boolean;
}) {
  // Split into words so letters never break across lines — each word is a
  // single non-wrapping unit, and the line only wraps between whole words.
  const words = text.split(" ");

  return (
    <motion.span
      variants={titleContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
      className={cn(
        "flex flex-wrap gap-x-[0.25em]",
        centered && "justify-center",
        className
      )}
    >
      {words.map((word, wi) => (
        <motion.span
          key={wi}
          variants={wordContainer}
          aria-hidden="true"
          className="inline-flex whitespace-nowrap"
        >
          {Array.from(word).map((char, ci) => (
            <motion.span key={ci} variants={charVariant} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.span>
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
          <AnimatedTitle text={title} className={headingClass} centered={centered} />
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
