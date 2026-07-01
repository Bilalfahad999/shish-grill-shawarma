"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

/** Thin reading-progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 32, mass: 0.3 });
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#B54E32] origin-left z-[100]"
      aria-hidden="true"
    />
  );
}
