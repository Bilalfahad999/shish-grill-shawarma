import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery | Shish Shawarma & Grill Melbourne",
  description:
    "See our charcoal-grilled dishes, restaurant interior, kitchen, and catering events. Fresh, authentic Middle Eastern food in Melbourne.",
  path: "/gallery",
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />
      {children}
    </>
  );
}
