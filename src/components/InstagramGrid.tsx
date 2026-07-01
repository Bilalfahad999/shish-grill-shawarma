"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    alt: "Mixed grill platter with rice",
    likes: "1.2k",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80",
    alt: "Shish kebab skewers on charcoal grill",
    likes: "987",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&q=80",
    alt: "Chicken shawarma wrap close up",
    likes: "2.1k",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    alt: "Fresh shawarma ingredients",
    likes: "743",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    alt: "Family platter spread",
    likes: "1.8k",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1607116667981-ff148a113ae4?w=600&q=80",
    alt: "Lamb shawarma with garlic sauce",
    likes: "1.4k",
  },
];

export function InstagramGrid() {
  const { settings } = useSiteSettings();

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 bg-[#FAF7F2]"
      aria-labelledby="gallery-heading"
    >
      <Container>
        <div className="text-center mb-12">
          <SectionTitle
            eyebrow="Follow Along"
            title="@shish_shawarma_grill"
            subtitle="Fresh photos, behind-the-scenes and daily specials. Follow us for your daily dose of delicious."
            centered
            id="gallery-heading"
            scrollAnimate
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer bg-[#F2ECE3]"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#B54E32]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <Camera size={24} className="text-white" aria-hidden="true" />
                <span className="font-body text-white text-sm font-medium">
                  ❤ {post.likes}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <PrimaryButton
            as="a"
            href={settings.instagramUrl || "https://instagram.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
            aria-label="Follow us on Instagram"
          >
            <Camera size={16} />
            Follow Us on Instagram
          </PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
