"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GALLERY_VIDEOS } from "@/config/gallery-data";

export function VideoGallery() {
  const [playing, setPlaying] = useState<string | null>(null);

  if (GALLERY_VIDEOS.length === 0) return null;

  return (
    <section className="py-20 bg-[#2F2F2F]" aria-labelledby="video-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <SectionTitle
            id="video-title"
            eyebrow="Watch"
            title="See It In Action"
            subtitle="A taste of what happens behind the pass."
            light
            scrollAnimate
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {GALLERY_VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl cursor-pointer"
              onClick={() => {
                if (video.videoUrl) setPlaying(video.id);
              }}
              role="button"
              aria-label={`Play video: ${video.title}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (video.videoUrl) setPlaying(video.id);
                }
              }}
            >
              {playing === video.id && video.videoUrl ? (
                <video
                  src={video.videoUrl}
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#B54E32] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Play size={24} className="text-white ml-1" fill="currentColor" />
                    </div>
                    <div className="text-center px-4">
                      <p className="font-heading text-xl font-semibold text-white mb-1">
                        {video.title}
                      </p>
                      <p className="font-body text-sm text-white/70">
                        {video.description}
                      </p>
                    </div>
                  </div>
                  {!video.videoUrl && (
                    <div className="absolute bottom-4 right-4">
                      <span className="font-body text-xs text-white/40 bg-black/40 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
