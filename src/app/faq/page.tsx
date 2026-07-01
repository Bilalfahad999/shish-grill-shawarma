import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { Container } from "@/components/ui/Container";
import { FAQ_CONTENT } from "@/config/site-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ | Shish Shawarma & Grill Melbourne",
  description:
    "Frequently asked questions about Shish Shawarma & Grill — takeaway, delivery, halal, catering, and more.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ_CONTENT.items)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])} />
      <Navbar />
      <main id="main-content" className="bg-[#FAF7F2] pt-24 pb-20">
        <Container narrow>
          {/* Header */}
          <div className="py-14 sm:py-20 text-center max-w-2xl mx-auto">
            <p className="font-body text-sm font-medium tracking-[0.2em] uppercase text-[#D96C2F] mb-4">
              Help
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl font-light text-[#2F2F2F] leading-tight mb-4">
              {FAQ_CONTENT.headline}
            </h1>
            <p className="font-body text-base sm:text-lg text-[#6B6355] leading-relaxed">
              {FAQ_CONTENT.subtext}
            </p>
          </div>

          {/* Accordion */}
          <FAQAccordion />

          {/* Still have questions */}
          <div className="mt-16 text-center bg-[#2F2F2F] rounded-3xl px-8 py-12">
            <h2 className="font-heading text-3xl font-light text-white mb-3">
              Still have questions?
            </h2>
            <p className="font-body text-sm text-white/60 mb-7">
              We're happy to help. Get in touch and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#D96C2F] text-white font-body font-semibold text-sm hover:bg-[#C45A20] transition-colors cursor-pointer"
              >
                Contact Us
              </Link>
              <Link
                href="/catering"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/30 text-white font-body font-semibold text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                Catering Enquiry
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
