"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
    title: "Authentic Charcoal Grilling",
    desc: "We cook over real charcoal the traditional way, giving every piece of meat that distinct smoky depth you can't replicate.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Fresh Ingredients Daily",
    desc: "From our spice blends to our vegetables, everything is sourced fresh and prepared in-house every single day.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: "Family-Friendly Atmosphere",
    desc: "Our restaurant welcomes everyone — from solo diners to large family gatherings. Great food is best shared.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
    title: "Generous Portions",
    desc: "Middle Eastern hospitality means you never leave hungry. Our portions are hearty, satisfying, and worth every bite.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: "100% Certified Halal",
    desc: "All our meats are 100% Halal certified, prepared with care and respect for every member of our community.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#F2ECE3]"
      aria-labelledby="why-heading"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80"
                alt="Chef grilling fresh meats over charcoal at Shish Shawarma & Grill"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#B54E32]/15 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 sm:-right-8 bg-white rounded-2xl p-5 shadow-xl border border-[#E5DDD0]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B54E32]/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#B54E32" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-2xl font-semibold text-[#2F2F2F]">500+</p>
                  <p className="font-body text-xs text-[#6B6355] mt-0.5">5-Star Reviews</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-2 border-[#B54E32]/20 -z-10" aria-hidden="true" />
            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full border border-[#B54E32]/10 -z-10" aria-hidden="true" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-8"
          >
            <SectionTitle
              eyebrow="Why Choose Us"
              title="Crafted with Tradition, Served with Pride"
              subtitle="We bring the rich culinary heritage of the Middle East to Melbourne — one flame-kissed plate at a time."
              id="why-heading"
              scrollAnimate
            />

            <div className="space-y-5">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#B54E32]/10 flex items-center justify-center text-[#B54E32] group-hover:bg-[#B54E32] group-hover:text-white transition-all duration-200 mt-0.5">
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-[#2F2F2F] text-base mb-1">
                      {reason.title}
                    </h3>
                    <p className="font-body text-sm text-[#6B6355] leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
