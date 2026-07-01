import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { StorySection } from "@/components/about/StorySection";
import { KitchenSection } from "@/components/about/KitchenSection";
import { WhyCustomersLove } from "@/components/about/WhyCustomersLove";
import { ABOUT_CONTENT } from "@/config/site-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, breadcrumbSchema } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us | Shish Shawarma & Grill Melbourne",
  description:
    "Learn about Shish Shawarma & Grill — authentic charcoal-grilled Middle Eastern food made fresh every day in Melbourne. 100% Halal.",
  path: "/about",
});

export default function AboutPage() {
  const { cta } = ABOUT_CONTENT;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <Navbar />
      <main id="main-content">
        <AboutHero />
        <StorySection />
        <KitchenSection />
        <WhyCustomersLove />

        {/* CTA */}
        <section className="py-20 bg-[#FAF7F2] text-center" aria-label="Call to action">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-4xl sm:text-5xl font-light text-[#2F2F2F] mb-4">
              {cta.headline}
            </h2>
            <p className="font-body text-base text-[#6B6355] mb-8">{cta.subtext}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#D96C2F] text-white font-body font-semibold text-sm hover:bg-[#C45A20] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                View Menu
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#B54E32] text-[#B54E32] font-body font-semibold text-sm hover:bg-[#B54E32]/8 transition-all duration-200 cursor-pointer"
              >
                Order Online
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
