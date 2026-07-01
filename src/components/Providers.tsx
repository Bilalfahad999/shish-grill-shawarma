"use client";

import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { MotionConfig } from "framer-motion";
import ReactLenis from "lenis/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </ReactLenis>
    </MotionConfig>
  );
}
