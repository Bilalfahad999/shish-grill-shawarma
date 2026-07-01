import type { Variants, Transition } from "framer-motion";

// Centralized animation system — every scroll/hover/tap animation in the app
// should pull from here instead of redefining inline variants per component.
// Respect-for-motion is handled globally via <MotionConfig reducedMotion="user">
// in the root layout, so these variants don't need to check the media query themselves.

export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

// Stagger container — wrap a list of children with staggerItem-marked motion elements.
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem: Variants = fadeUp;

// Hover/tap presets for interactive elements
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.25, ease: EASE_OUT } },
  whileTap: { y: 0, scale: 0.98 },
};

export const hoverScale = {
  whileHover: { scale: 1.015, transition: { duration: 0.25, ease: EASE_OUT } },
  whileTap: { scale: 0.98 },
};

export const tapPress = {
  whileTap: { scale: 0.97 },
};

export const imageZoom = {
  whileHover: { scale: 1.06, transition: { duration: 0.5, ease: EASE_OUT } },
};

// Default viewport config for scroll-triggered reveals — fires once, slightly before
// the element is fully in view so animations feel anticipatory rather than late.
export const defaultViewport = { once: true, margin: "-80px" };
