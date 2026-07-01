import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CateringHero } from "@/components/catering/CateringHero";
import { CateringTypes } from "@/components/catering/CateringTypes";
import { CateringHighlights } from "@/components/catering/CateringHighlights";
import { CateringPackages } from "@/components/catering/CateringPackages";
import { CateringForm } from "@/components/catering/CateringForm";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Catering | Shish Shawarma & Grill Melbourne",
  description:
    "Professional catering for family gatherings, corporate lunches, birthday parties, and more. Fresh, halal Middle Eastern food for any occasion in Melbourne.",
  path: "/catering",
});

export default function CateringPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Catering", path: "/catering" }])} />
      <Navbar />
      <main id="main-content">
        <CateringHero />
        <CateringTypes />
        <CateringHighlights />
        <CateringPackages />

        {/* Enquiry form section */}
        <section className="py-20 sm:py-28 bg-[#FAF7F2]">
          <Container narrow>
            <div className="grid lg:grid-cols-[1fr_440px] gap-12 items-start">
              {/* Left: intro */}
              <div className="space-y-6">
                <div>
                  <p className="font-body text-sm font-medium tracking-[0.2em] uppercase text-[#D96C2F] mb-4">
                    Get in Touch
                  </p>
                  <h2 className="font-heading text-4xl sm:text-5xl font-light text-[#2F2F2F] leading-tight">
                    Tell Us About Your Event
                  </h2>
                </div>
                <p className="font-body text-base text-[#6B6355] leading-relaxed">
                  Fill in the form and we'll get back to you within 24 hours with a tailored quote and menu options.
                </p>
                <div className="space-y-4">
                  {[
                    "We respond within 24 hours",
                    "No obligation — free enquiry",
                    "Menu can be customised",
                    "Pickup or delivery available",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#6E8B5C]/15 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#6E8B5C]" aria-hidden="true" />
                      </span>
                      <span className="font-body text-sm text-[#6B6355]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: form */}
              <div className="lg:sticky lg:top-24">
                <CateringForm />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
