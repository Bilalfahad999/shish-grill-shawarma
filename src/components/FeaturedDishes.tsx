"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { InteractiveProductCard } from "@/components/ui/card-7";
import { getPublicMenu } from "@/lib/actions/menu";
import type { MenuItem } from "@/data/menu";

// Brand mark for the InteractiveProductCard corner logo — the card expects an
// image URL, so we point it at the shared logo-mark asset in /public.
const BRAND_LOGO_URI = "/logo-mark.svg";

// The card's glass header is compact — long menu descriptions get truncated to a short phrase.
function shortDescription(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= 42) return trimmed;
  return trimmed.slice(0, 42).replace(/\s+\S*$/, "") + "…";
}

export function FeaturedDishes() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Live menu data, sourced from the admin dashboard — same source as the /menu page,
  // filtered to items the admin has marked "Popular".
  useEffect(() => {
    let cancelled = false;
    getPublicMenu().then(({ items }) => {
      if (!cancelled) {
        setItems(items.filter((i) => i.popular && i.available));
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector("a")?.getBoundingClientRect().width ?? 320;
    track.scrollBy({ left: dir === "left" ? -(cardWidth + 24) : cardWidth + 24, behavior: "smooth" });
  };

  return (
    <section
      id="menu"
      className="py-20 sm:py-28 bg-[#FAF7F2]"
      aria-labelledby="menu-heading"
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionTitle
            eyebrow="What We Serve"
            title="From Our Grill to Your Table"
            subtitle="Every dish is crafted with care, using fresh ingredients and traditional methods passed down through generations."
            id="menu-heading"
            scrollAnimate
          />
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            {/* Slider controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-[#E5DDD0] bg-white flex items-center justify-center text-[#6B6355] hover:border-[#B54E32] hover:text-[#B54E32] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
                aria-label="Scroll to previous dishes"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-[#E5DDD0] bg-white flex items-center justify-center text-[#6B6355] hover:border-[#B54E32] hover:text-[#B54E32] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
                aria-label="Scroll to next dishes"
              >
                <ChevronRight size={17} />
              </button>
            </div>
            <PrimaryButton as="a" href="/menu">
              View Full Menu
              <ArrowRight size={15} />
            </PrimaryButton>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={26} className="animate-spin text-[#B54E32]" />
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
            role="list"
            aria-label="Featured dishes"
          >
            {items.map((dish, i) => (
              <Link
                key={dish.id}
                href="/menu"
                role="listitem"
                aria-label={`View ${dish.name} on the full menu — ${dish.price}`}
                className="block shrink-0 w-[270px] snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-offset-2 rounded-3xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                >
                  <InteractiveProductCard
                    title={dish.name}
                    description={shortDescription(dish.description)}
                    price={dish.price}
                    imageUrl={dish.image}
                    logoUrl={BRAND_LOGO_URI}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
