"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import type { MenuCategory } from "@/data/menu";

interface CategoryNavProps {
  activeCategory: string | null;
  categories: MenuCategory[];
}

export function CategoryNav({ activeCategory, categories }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll active pill into view
  useEffect(() => {
    if (!activeCategory || !scrollRef.current) return;
    const el = scrollRef.current.querySelector(`[data-cat="${activeCategory}"]`);
    el?.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center" });
  }, [activeCategory]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`category-${id}`);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -100 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top });
    }
  };

  return (
    <>
      {/* Sentinel — when this leaves viewport, nav becomes sticky */}
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      <div
        className={`z-40 transition-all duration-300 ${
          pinned
            ? "fixed top-0 left-0 right-0 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDD0] shadow-sm"
            : "sticky top-0 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E5DDD0]"
        }`}
        role="navigation"
        aria-label="Menu categories"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollRef}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  data-cat={cat.id}
                  onClick={() => scrollTo(cat.id)}
                  className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] ${
                    isActive
                      ? "text-[#B54E32]"
                      : "text-[#6B6355] hover:text-[#2F2F2F]"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    {cat.icon}
                  </span>
                  {cat.label}
                  {isActive && (
                    <motion.span
                      layoutId="cat-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#B54E32] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 38 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
