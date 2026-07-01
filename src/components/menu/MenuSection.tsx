"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MenuItem, MenuCategory } from "@/data/menu";
import { FoodCard } from "./FoodCard";

interface MenuSectionProps {
  category: MenuCategory;
  items: MenuItem[];
  onOpen: (item: MenuItem) => void;
  alternateLayout?: boolean;
}

function AnimatedSectionTitle({ text, id }: { text: string; id: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 60%"],
  });
  const chars = text.split("");
  const center = Math.floor(chars.length / 2);

  return (
    <h2 id={id} ref={ref} className="font-heading text-3xl sm:text-4xl font-light text-[#2F2F2F] flex flex-wrap">
      {chars.map((char, i) => {
        const dist = i - center;
        return (
          <AnimChar key={i} char={char} dist={dist} scrollYProgress={scrollYProgress} />
        );
      })}
    </h2>
  );
}

function AnimChar({
  char,
  dist,
  scrollYProgress,
}: {
  char: string;
  dist: number;
  scrollYProgress: any;
}) {
  const x = useTransform(scrollYProgress, [0, 0.65], [dist * 30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  if (char === " ") {
    return <span className="w-[0.28em]">{" "}</span>;
  }

  return (
    <motion.span className="inline-block" style={{ x, opacity }}>
      {char}
    </motion.span>
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
