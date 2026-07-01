import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shish Shawarma & Grill",
    short_name: "Shish Grill",
    description: "Authentic charcoal grill and shawarma in Melbourne. 100% Halal.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#B54E32",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
