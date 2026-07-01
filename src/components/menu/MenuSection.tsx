"use client";

import { motion, type Variants } from "framer-motion";
import type { MenuItem, MenuCategory } from "@/data/menu";
import { FoodCard } from "./FoodCard";
import { EASE_OUT } from "@/lib/motion";

interface MenuSectionProps {
  category: MenuCategory;
  items: MenuItem[];
  onOpen: (item: MenuItem) => void;
  alternateLayout?: boolean;
}

// Intersection-triggered stagger — reliable on mobile, and words never break
// mid-letter because each word is a single non-wrapping unit.
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

function AnimatedSectionTitle({ text, id }: { text: string; id: string }) {
  const words = text.split(" ");

  return (
    <motion.h2
      id={id}
      variants={titleContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
      className="font-heading text-3xl sm:text-4xl font-light text-[#2F2F2F] flex flex-wrap gap-x-[0.25em]"
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
    </motion.h2>
  );
}

export function MenuSection({ category, items, onOpen, alternateLayout }: MenuSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      id={`category-${category.id}`}
      className="scroll-mt-[120px] py-10 sm:py-14 border-t border-[#E5DDD0] first:border-t-0"
      aria-labelledby={`section-${category.id}`}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl leading-none" aria-hidden="true">
            {category.icon}
          </span>
          <AnimatedSectionTitle text={category.label} id={`section-${category.id}`} />
        </div>
        <p className="font-body text-sm text-[#6B6355] leading-relaxed max-w-xl ml-10">
          {category.intro}
        </p>
      </motion.div>

      {/* Layouts */}
      {alternateLayout && items.length >= 3 ? (
        <div className="space-y-5">
          <FoodCard item={items[0]} onOpen={onOpen} index={0} featured />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.slice(1).map((item, i) => (
              <FoodCard key={item.id} item={item} onOpen={onOpen} index={i + 1} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <FoodCard key={item.id} item={item} onOpen={onOpen} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
