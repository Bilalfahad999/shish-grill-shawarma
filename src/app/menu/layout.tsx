import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, menuSchema, breadcrumbSchema } from "@/lib/seo";
import { getPublicMenu } from "@/lib/actions/menu";

export const metadata: Metadata = buildPageMetadata({
  title: "Menu | Shish Shawarma & Grill Melbourne",
  description:
    "Browse our full menu — charcoal grill, shawarma plates, wraps, HSP, family meals, sides, dips, drinks and desserts. 100% Halal, freshly prepared every day.",
  path: "/menu",
});

export default async function MenuLayout({ children }: { children: React.ReactNode }) {
  const { categories, items } = await getPublicMenu();
  const categoryLabels = Object.fromEntries(categories.map((c) => [c.id, c.label]));
  const schemaItems = items.filter((item) => item.available).map((item) => ({
    name: item.name,
    description: item.description,
    price: item.price,
    category: categoryLabels[item.category] ?? item.category,
    image: item.image,
  }));

  return (
    <>
      <JsonLd data={menuSchema(schemaItems)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Menu", path: "/menu" }])} />
      {children}
    </>
  );
}
