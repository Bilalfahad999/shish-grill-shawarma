"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

// ReactLenis is added once at the app root (Providers.tsx) — not here.

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  return (
    <motion.span
      className={cn("inline-block text-[#B54E32]", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV2 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);
  return (
    <motion.img
      src={char}
      alt=""
      className="h-16 w-16 shrink-0 object-contain will-change-transform"
      style={{ x, scale, y, transformOrigin: "center" }}
    />
  );
};

const CharacterV3 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 20, 0]);
  return (
    <motion.span
      className={cn("inline-block", isSpace && "w-4")}
      style={{ opacity, y }}
    >
      {char}
    </motion.span>
  );
};

// --- TEXT SCROLL (V1) — characters fan in from center ---
interface TextScrollAnimationProps {
  text: string;
  className?: string;
}

export function TextScrollAnimation({ text, className }: TextScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });
  const chars = text.split("");
  const centerIndex = Math.floor(chars.length / 2);

  return (
    <div ref={containerRef} className={cn("flex flex-wrap items-center justify-center text-4xl font-bold", className)}>
      {chars.map((char, i) => (
        <CharacterV1 key={i} char={char} index={i} centerIndex={centerIndex} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

// --- IMAGE SCROLL (V2) — images converge from scattered positions ---
interface ImageScrollAnimationProps {
  images: string[];
  className?: string;
}

export function ImageScrollAnimation({ images, className }: ImageScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });
  const centerIndex = Math.floor(images.length / 2);

  return (
    <div ref={containerRef} className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
      {images.map((src, i) => (
        <CharacterV2 key={i} char={src} index={i} centerIndex={centerIndex} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

// --- FADE SCROLL (V3) — characters fade + drift in on scroll ---
interface FadeScrollAnimationProps {
  text: string;
  className?: string;
}

export function FadeScrollAnimation({ text, className }: FadeScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });
  const chars = text.split("");
  const centerIndex = Math.floor(chars.length / 2);

  return (
    <div ref={containerRef} className={cn("flex flex-wrap items-center justify-center text-4xl font-bold", className)}>
      {chars.map((char, i) => (
        <CharacterV3 key={i} char={char} index={i} centerIndex={centerIndex} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}
