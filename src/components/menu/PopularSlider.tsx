"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import type { MenuItem } from "@/data/menu";

interface PopularSliderProps {
  onOpen: (item: MenuItem) => void;
  items: MenuItem[];
}

export function PopularSlider({ onOpen, items: POPULAR_ITEMS }: PopularSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (POPULAR_ITEMS.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  // Prevent the horizontal scroll container from capturing vertical wheel events
  // so Lenis can handle page scroll even when the cursor is over the slider
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.style.overflowX = "hidden";
      requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.overflowX = "auto";
      });
    }
  };

  return (
    <section
      className="py-10 bg-[#F2ECE3] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
      aria-labelledby="popular-slider-heading"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-body text-xs font-medium tracking-[0.18em] uppercase text-[#D96C2F] mb-1">
            Most Ordered
          </p>
          <h2
            id="popular-slider-heading"
            className="font-heading text-2xl sm:text-3xl font-light text-[#2F2F2F]"
          >
            Customer Favourites
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-[#E5DDD0] bg-white flex items-center justify-center text-[#6B6355] hover:border-[#B54E32] hover:text-[#B54E32] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-[#E5DDD0] bg-white flex items-center justify-center text-[#6B6355] hover:border-[#B54E32] hover:text-[#B54E32] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1"
        role="list"
        aria-label="Popular dishes"
        onWheel={handleWheel}
      >
        {POPULAR_ITEMS.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            role="listitem"
            onClick={() => onOpen(item)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(item)}
            tabIndex={0}
            aria-label={`${item.name} — ${item.price}`}
            className="group shrink-0 w-52 bg-white rounded-2xl overflow-hidden border border-[#E5DDD0]/60 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
          >
            <div className="relative h-36 overflow-hidden bg-[#F2ECE3]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="208px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D96C2F] text-white text-[10px] font-body font-semibold">
                <Star size={8} fill="white" aria-hidden="true" /> Popular
              </div>
              {item.charcoalGrilled && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                  <Flame size={11} className="text-[#D96C2F]" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="p-3.5">
              <h3 className="font-heading text-base font-semibold text-[#2F2F2F] group-hover:text-[#B54E32] transition-colors duration-200 line-clamp-1">
                {item.name}
              </h3>
              <p className="font-body text-xs text-[#6B6355] mt-0.5 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              <p className="font-body font-semibold text-[#D96C2F] text-sm mt-2">{item.price}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
