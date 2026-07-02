import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { FloatingCart } from "@/components/order/FloatingCart";
import { FloatingActions } from "@/components/FloatingActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SITE_URL, DEFAULT_OG_IMAGE, localBusinessSchema, organizationSchema } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shish Shawarma & Grill | Authentic Charcoal Grill in Melbourne",
    template: "%s | Shish Shawarma & Grill",
  },
  description:
    "Freshly grilled meats, handcrafted wraps, family platters, and authentic Middle Eastern flavours made fresh every day in Melbourne. 100% Halal.",
  keywords: [
    "shawarma melbourne",
    "halal grill melbourne",
    "middle eastern food melbourne",
    "charcoal grill",
    "shish kebab",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shish Shawarma & Grill | Melbourne",
    description:
      "Authentic charcoal grill and shawarma in Melbourne. Freshly prepared Middle Eastern food every day.",
    url: SITE_URL,
    siteName: "Shish Shawarma & Grill",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Shish Shawarma & Grill" }],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shish Shawarma & Grill | Melbourne",
    description: "Authentic charcoal grill and shawarma in Melbourne. 100% Halal.",
    images: [DEFAULT_OG_IMAGE],
  },
  verification: {
    // TODO: add your Google Search Console verification token
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-[#B54E32] focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
          >
            Skip to main content
          </a>
          <JsonLd data={localBusinessSchema()} />
          <JsonLd data={organizationSchema()} />
          <Providers>
            <ScrollProgress />
            {children}
            <FloatingCart />
            <FloatingActions />
          </Providers>
        </body>
    </html>
  );
}
