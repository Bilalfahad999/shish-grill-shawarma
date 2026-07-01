"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Lightbox } from "@/components/gallery/Lightbox";
import { VideoGallery } from "@/components/gallery/VideoGallery";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GALLERY_IMAGES, type GalleryImage } from "@/config/gallery-data";

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>(GALLERY_IMAGES);

  const handleSelect = (img: GalleryImage, index: number, images: GalleryImage[]) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#FAF7F2] pt-24">
        {/* Page header */}
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <SectionTitle
                eyebrow="Gallery"
                title="Food, Kitchen & Atmosphere"
                subtitle="A visual taste of Shish Shawarma & Grill — from the charcoal grill to the dining table."
                headingLevel="h1"
                scrollAnimate
              />
            </motion.div>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GalleryGridWrapper onSelect={handleSelect} />
          </div>
        </section>

        {/* Video section */}
        <VideoGallery />
      </main>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        current={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <Footer />
    </>
  );
}

// Wrapper to thread the filtered images into the lightbox
function GalleryGridWrapper({
  onSelect,
}: {
  onSelect: (img: GalleryImage, idx: number, images: GalleryImage[]) => void;
}) {
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(GALLERY_IMAGES);

  return (
    <GalleryGridWithState
      onFilterChange={setFilteredImages}
      onSelect={(img, idx) => onSelect(img, idx, filteredImages)}
    />
  );
}

// Re-export GalleryGrid but also expose filtered images
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/config/gallery-data";
import Image from "next/image";
import { ZoomIn, ImageOff } from "lucide-react";
import { AnimatePresence } from "framer-motion";

function GalleryGridWithState({
  onFilterChange,
  onSelect,
}: {
  onFilterChange: (images: GalleryImage[]) => void;
  onSelect: (img: GalleryImage, idx: number) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");

  const filtered = useMemo(() => {
    const f =
      activeCategory === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory);
    return f;
  }, [activeCategory]);

  // Notify parent when filter changes
  const handleCategoryChange = (cat: GalleryCategory | "all") => {
    setActiveCategory(cat);
    const f = cat === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === cat);
    onFilterChange(f);
  };

  const columns = useMemo(() => {
    const cols: GalleryImage[][] = [[], [], []];
    filtered.forEach((img, i) => cols[i % 3].push(img));
    return cols;
  }, [filtered]);

  return (
    <div>
      {/* Category filter */}
      <div
        className="flex flex-wrap items-center gap-2 mb-8"
        role="group"
        aria-label="Filter by category"
      >
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            aria-pressed={activeCategory === cat.value}
            className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] ${
              activeCategory === cat.value
                ? "bg-[#B54E32] text-white shadow-sm"
                : "bg-white border border-[#E5DDD0] text-[#6B6355] hover:border-[#B54E32] hover:text-[#B54E32]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center py-20"
            role="status"
          >
            <div className="w-14 h-14 rounded-full bg-[#F2ECE3] flex items-center justify-center mx-auto mb-4">
              <ImageOff size={22} className="text-[#6B6355]" aria-hidden="true" />
            </div>
            <h3 className="font-heading text-2xl font-light text-[#2F2F2F] mb-2">
              No photos in this category yet.
            </h3>
            <p className="font-body text-sm text-[#6B6355] mb-6">
              Check back soon, or browse another category.
            </p>
            <button
              onClick={() => handleCategoryChange("all")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#B54E32] text-[#B54E32] font-body text-sm font-medium hover:bg-[#B54E32]/8 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
            >
              View all photos
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {/* Desktop masonry */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {columns.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-4">
                  {col.map((img) => {
                    const height =
                      img.aspect === "portrait"
                        ? "aspect-[3/4]"
                        : img.aspect === "landscape"
                        ? "aspect-[4/3]"
                        : "aspect-square";
                    const idx = filtered.findIndex((x) => x.id === img.id);
                    return (
                      <GalleryItem key={img.id} img={img} height={height} onSelect={() => onSelect(img, idx)} />
                    );
                  })}
                </div>
              ))}
            </div>
            {/* Mobile single column */}
            <div className="sm:hidden flex flex-col gap-4">
              {filtered.map((img, idx) => (
                <GalleryItem key={img.id} img={img} height="aspect-[4/3]" onSelect={() => onSelect(img, idx)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryItem({
  img,
  height,
  onSelect,
}: {
  img: GalleryImage;
  height: string;
  onSelect: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      onClick={onSelect}
      aria-label={`View photo: ${img.alt}`}
      className={`group relative ${height} rounded-2xl overflow-hidden bg-[#E5DDD0] w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] focus-visible:ring-offset-2`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <ZoomIn size={22} className="text-white" />
        </div>
      </div>
      {img.featured && (
        <span className="absolute top-3 left-3 font-body text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-1 rounded-full bg-[#B54E32] text-white">
          Featured
        </span>
      )}
    </motion.button>
  );
}
