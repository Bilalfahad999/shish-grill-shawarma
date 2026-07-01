import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { RestaurantInfo } from "@/components/contact/RestaurantInfo";
import { GoogleMap } from "@/components/contact/GoogleMap";
import { Container } from "@/components/ui/Container";
import { CONTACT_CONTENT } from "@/config/site-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us | Shish Shawarma & Grill Melbourne",
  description:
    "Get in touch with Shish Shawarma & Grill. Call us, visit us, or send a message. Located in Melbourne.",
  path: "/contact",
});

export default function ContactPage() {
  const { hero } = CONTACT_CONTENT;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <Navbar />
      <main id="main-content" className="bg-[#FAF7F2] pt-24">
        {/* Header */}
        <section className="py-14 sm:py-20">
          <Container>
            <div className="max-w-2xl">
              <p className="font-body text-sm font-medium tracking-[0.2em] uppercase text-[#D96C2F] mb-4">
                {hero.eyebrow}
              </p>
              <h1 className="font-heading text-5xl sm:text-6xl font-light text-[#2F2F2F] leading-tight mb-4">
                {hero.headline}
              </h1>
              <p className="font-body text-base sm:text-lg text-[#6B6355] leading-relaxed">
                {hero.description}
              </p>
            </div>
          </Container>
        </section>

        {/* Split layout: info + map */}
        <section className="pb-16">
          <Container>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <RestaurantInfo />
              <GoogleMap />
            </div>
          </Container>
        </section>

        {/* Contact form */}
        <section className="py-16 sm:py-20 bg-[#F2ECE3]">
          <Container narrow>
            <div className="grid lg:grid-cols-[1fr_520px] gap-12 items-start">
              <div>
                <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#D96C2F] mb-4">
                  Message Us
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl font-light text-[#2F2F2F] leading-tight mb-4">
                  Send Us a Message
                </h2>
                <p className="font-body text-base text-[#6B6355] leading-relaxed">
                  Whether it's a catering enquiry, feedback, or a general question — we'd love to hear from you. We respond to all messages as quickly as possible.
                </p>
              </div>
              <ContactForm />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
