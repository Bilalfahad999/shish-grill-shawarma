"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MenuHero } from "@/components/menu/MenuHero";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { SearchBar } from "@/components/menu/SearchBar";
import { FilterBar, type FilterKey } from "@/components/menu/FilterBar";
import { FeaturedSection } from "@/components/menu/FeaturedSection";
import { MenuSection } from "@/components/menu/MenuSection";
import { FoodModal } from "@/components/menu/FoodModal";
import { PopularSlider } from "@/components/menu/PopularSlider";
import { MenuStory } from "@/components/menu/MenuStory";
import { EmptyState } from "@/components/menu/EmptyState";
import {
  MobileCategoryPanel,
  MobileCategoryButton,
} from "@/components/menu/MobileCategoryPanel";
import { getPublicMenu } from "@/lib/actions/menu";
import type { MenuItem, MenuCategory } from "@/data/menu";
import { Container } from "@/components/ui/Container";
import { FoodCard } from "@/components/menu/FoodCard";

// Alternate layout indices
const ALTERNATE_LAYOUT_CATEGORIES = new Set(["charcoal-grill", "shawarma-plates", "family-meals"]);

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Live menu data, sourced from the admin dashboard
  useEffect(() => {
    let cancelled = false;
    getPublicMenu().then(({ categories, items }) => {
      if (!cancelled) {
        setCategories(categories);
        setItems(items);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  // Determine active category via IntersectionObserver
  useEffect(() => {
    if (categories.length === 0) return;
    const observers: IntersectionObserver[] = [];
    const threshold = 0.3;

    categories.forEach((cat) => {
      const el = document.getElementById(`category-${cat.id}`);
      if (!el) return;
      sectionRefs.current.set(cat.id, el);
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategory(cat.id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  const popularItems = useMemo(() => items.filter((i) => i.popular), [items]);

  const filteredItems = useMemo(() => {
    let result = items;

    // Apply filter
    switch (filter) {
      case "popular":
        result = result.filter((i) => i.popular);
        break;
      case "vegetarian":
        result = result.filter((i) => i.vegetarian);
        break;
      case "spicy":
        result = result.filter((i) => i.spicy);
        break;
      case "grilled":
        result = result.filter((i) => i.charcoalGrilled);
        break;
    }

    // Apply search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.includes?.some((inc) => inc.toLowerCase().includes(q))
      );
    }

    return result;
  }, [items, search, filter]);

  const isFiltering = search.trim() !== "" || filter !== "all";
  const hasResults = filteredItems.length > 0;

  const handleClear = useCallback(() => {
    setSearch("");
    setFilter("all");
  }, []);

  return (
    <>
      <Navbar />

      <main id="main-content" className="bg-[#FAF7F2]">
        <MenuHero />

        {/* Category nav (sticky) */}
        <CategoryNav activeCategory={activeCategory} categories={categories} />

        <Container className="py-6 sm:py-10 pb-32 lg:pb-20">
          {/* Search & filter toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10 sticky top-[52px] z-30 bg-[#FAF7F2] py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-[#E5DDD0]/60">
            <div className="flex-1">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <FilterBar active={filter} onChange={setFilter} />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={28} className="animate-spin text-[#B54E32]" />
            </div>
          ) : isFiltering ? (
            hasResults ? (
              <div>
                <p className="font-body text-sm text-[#6B6355] mb-6" role="status" aria-live="polite">
                  {filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"} found
                  {search ? ` for "${search}"` : ""}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredItems.map((item, i) => (
                    <div key={item.id}>
                      <MenuItemCard item={item} onOpen={setSelectedItem} index={i} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                query={search}
                onClear={handleClear}
                onOpen={setSelectedItem}
                suggestions={popularItems.slice(0, 3)}
              />
            )
          ) : (
            <>
              {/* Featured / Chef's Picks */}
              <FeaturedSection onOpen={setSelectedItem} items={popularItems} />

              {/* Popular slider */}
              <PopularSlider onOpen={setSelectedItem} items={popularItems} />

              {/* Menu Story break */}
              <MenuStory />

              {/* All category sections */}
              {categories.map((cat) => {
                const sectionItems = items.filter((item) => item.category === cat.id);
                return (
                  <MenuSection
                    key={cat.id}
                    category={cat}
                    items={sectionItems}
                    onOpen={setSelectedItem}
                    alternateLayout={ALTERNATE_LAYOUT_CATEGORIES.has(cat.id)}
                  />
                );
              })}
            </>
          )}
        </Container>
      </main>

      <Footer />

      {/* Food detail modal */}
      <FoodModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Mobile category panel */}
      <MobileCategoryPanel
        open={mobilePanelOpen}
        onClose={() => setMobilePanelOpen(false)}
        activeCategory={activeCategory}
        categories={categories}
      />

      {/* Mobile sticky "View Categories" button */}
      <MobileCategoryButton onClick={() => setMobilePanelOpen(true)} />
    </>
  );
}

function MenuItemCard({
  item,
  onOpen,
  index,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  index: number;
}) {
  return <FoodCard item={item} onOpen={onOpen} index={index} />;
}
