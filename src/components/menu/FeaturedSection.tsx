"use client";

import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menu";
import { FoodCard } from "./FoodCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface FeaturedSectionProps {
  onOpen: (item: MenuItem) => void;
  items: MenuItem[];
}

export function FeaturedSection({ onOpen, items: FEATURED_ITEMS }: FeaturedSectionProps) {
  if (FEATURED_ITEMS.length === 0) return null;

  return (
    <section className="py-10 sm:py-14" aria-labelledby="featured-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="mb-8"
      >
        <SectionTitle
          eyebrow="Chef's Recommendations"
          title="House Favourites"
          subtitle="The dishes our regulars order every time — start here."
          id="featured-heading"
          scrollAnimate
        />
      </motion.div>

      {/* Large featured card + 2-up grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Hero card */}
        <FoodCard
          item={FEATURED_ITEMS[0]}
          onOpen={onOpen}
          index={0}
          featured
        />
        {/* Stack of 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          {FEATURED_ITEMS.slice(1, 3).map((item, i) => (
            <FoodCard key={item.id} item={item} onOpen={onOpen} index={i + 1} />
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FEATURED_ITEMS.slice(3).map((item, i) => (
          <FoodCard key={item.id} item={item} onOpen={onOpen} index={i + 3} />
        ))}
      </div>
    </section>
  );
}
