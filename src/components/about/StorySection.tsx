"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ABOUT_CONTENT } from "@/config/site-content";

export function StorySection() {
  const { story } = ABOUT_CONTENT;
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2]" aria-labelledby="story-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={story.image}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#B54E32] text-white rounded-2xl px-6 py-5 shadow-xl max-w-[180px]">
              <p className="font-heading text-4xl font-light leading-none">100%</p>
              <p className="font-body text-xs font-semibold tracking-[0.12em] uppercase mt-1 text-white/80">
                Halal Certified
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6 pt-8 lg:pt-0"
          >
            <SectionTitle
              id="story-title"
              eyebrow={story.eyebrow}
              title={story.headline}
              scrollAnimate
            />
            <div className="space-y-5">
              {story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-body text-base text-[#6B6355] leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
