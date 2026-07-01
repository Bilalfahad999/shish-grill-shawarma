"use client";

import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { MotionConfig } from "framer-motion";
import ReactLenis from "lenis/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // The admin portal is an app shell with its own internal scroll containers
  // (fixed sidebar + `overflow-y-auto` main). Lenis controls the root/window
  // scroll, which conflicts with those nested containers and breaks scrolling.
  // So we skip smooth scroll on admin routes and let native scrolling handle it.
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  const content = (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );

  return (
    <MotionConfig reducedMotion="user">
      {isAdmin ? (
        content
      ) : (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
          {content}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
