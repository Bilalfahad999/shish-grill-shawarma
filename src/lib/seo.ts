import type { Metadata } from "next";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shishshawarma.com.au";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}

export function buildPageMetadata({ title, description, path, image, keywords }: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: RESTAURANT_CONFIG.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ── JSON-LD structured data builders ────────────────────────────────────────

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT_CONFIG.name,
    image: DEFAULT_OG_IMAGE,
    url: SITE_URL,
    telephone: RESTAURANT_CONFIG.phone,
    email: RESTAURANT_CONFIG.email,
    servesCuisine: ["Middle Eastern", "Halal", "Mediterranean"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "184 Widford St",
      addressLocality: "Broadmeadows",
      addressRegion: "VIC",
      postalCode: "3047",
      addressCountry: "AU",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday"], opens: "10:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Thursday", "Friday", "Saturday", "Sunday"], opens: "10:00", closes: "00:00" },
    ],
    menu: `${SITE_URL}/menu`,
    acceptsReservations: "False",
    hasMenu: `${SITE_URL}/menu`,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: RESTAURANT_CONFIG.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: RESTAURANT_CONFIG.phone,
      contactType: "customer service",
      areaServed: "AU",
      availableLanguage: "English",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

interface MenuSchemaItem {
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
}

export function menuSchema(items: MenuSchemaItem[]) {
  const sectionsMap = new Map<string, MenuSchemaItem[]>();
  for (const item of items) {
    const list = sectionsMap.get(item.category) ?? [];
    list.push(item);
    sectionsMap.set(item.category, list);
  }

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${RESTAURANT_CONFIG.name} Menu`,
    hasMenuSection: Array.from(sectionsMap.entries()).map(([category, sectionItems]) => ({
      "@type": "MenuSection",
      name: category,
      hasMenuItem: sectionItems.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: item.price.replace(/[^0-9.]/g, ""),
          priceCurrency: "AUD",
        },
        ...(item.image ? { image: item.image } : {}),
      })),
    })),
  };
}
