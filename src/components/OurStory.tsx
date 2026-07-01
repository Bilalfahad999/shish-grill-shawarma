"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

export function OurStory() {
  return (
    <section
      id="story"
      className="py-20 sm:py-28 bg-[#FAF7F2] overflow-hidden"
      aria-labelledby="story-heading"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Illustration / visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            {/* Decorative circular frame */}
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#B54E32]/15" aria-hidden="true" />
              <div className="absolute inset-4 rounded-full border border-[#B54E32]/10" aria-hidden="true" />

              {/* Main circle */}
              <div className="absolute inset-8 rounded-full bg-[#F2ECE3] flex items-center justify-center">
                {/* Olive branch SVG illustration */}
                <svg
                  viewBox="0 0 300 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3/4 h-3/4"
                  aria-label="Olive branch illustration"
                  role="img"
                >
                  {/* Main stem */}
                  <path
                    d="M150 240 C140 200 120 160 100 120 C85 90 75 65 90 45"
                    stroke="#4C6B3C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Branch left */}
                  <path
                    d="M120 160 C100 145 82 140 70 145"
                    stroke="#6E8B5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Branch right */}
                  <path
                    d="M107 130 C125 112 135 95 130 78"
                    stroke="#6E8B5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Leaves */}
                  {[
                    { cx: 72, cy: 143, rx: 14, ry: 7, rotate: -30 },
                    { cx: 84, cy: 150, rx: 12, ry: 6, rotate: -15 },
                    { cx: 95, cy: 145, rx: 11, ry: 5.5, rotate: 5 },
                    { cx: 125, cy: 108, rx: 13, ry: 6, rotate: 45 },
                    { cx: 132, cy: 88, rx: 12, ry: 5.5, rotate: 55 },
                    { cx: 125, cy: 70, rx: 11, ry: 5, rotate: 70 },
                    { cx: 105, cy: 118, rx: 10, ry: 5, rotate: 20 },
                  ].map((leaf, i) => (
                    <ellipse
                      key={i}
                      cx={leaf.cx}
                      cy={leaf.cy}
                      rx={leaf.rx}
                      ry={leaf.ry}
                      fill="#6E8B5C"
                      fillOpacity="0.7"
                      transform={`rotate(${leaf.rotate} ${leaf.cx} ${leaf.cy})`}
                    />
                  ))}
                  {/* Olives */}
                  {[
                    { cx: 68, cy: 148 },
                    { cx: 130, cy: 96 },
                    { cx: 122, cy: 74 },
                  ].map((olive, i) => (
                    <circle key={i} cx={olive.cx} cy={olive.cy} r="5" fill="#4C6B3C" fillOpacity="0.85" />
                  ))}

                  {/* Flame / grill element */}
                  <path
                    d="M160 220 C155 205 148 195 155 182 C158 190 163 192 165 185 C168 195 162 210 168 218 C162 222 160 220 160 220Z"
                    fill="#D96C2F"
                    fillOpacity="0.8"
                  />
                  <path
                    d="M175 215 C170 200 162 188 168 175 C172 184 178 186 180 178 C183 190 177 205 183 213 C177 218 175 215 175 215Z"
                    fill="#B54E32"
                    fillOpacity="0.7"
                  />

                  {/* Decorative dots */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i * 45 * Math.PI) / 180;
                    const r = 125;
                    return (
                      <circle
                        key={i}
                        cx={150 + r * Math.cos(angle)}
                        cy={150 + r * Math.sin(angle)}
                        r="3"
                        fill="#B54E32"
                        fillOpacity="0.3"
                      />
                    );
                  })}

                  {/* Brand text in circle */}
                  <text
                    x="205"
                    y="148"
                    fontFamily="serif"
                    fontSize="11"
                    fill="#B54E32"
                    fillOpacity="0.5"
                    textAnchor="middle"
                  >
                    Shish
                  </text>
                  <text
                    x="205"
                    y="163"
                    fontFamily="serif"
                    fontSize="8"
                    fill="#6B6355"
                    fillOpacity="0.5"
                    textAnchor="middle"
                  >
                    Melbourne
                  </text>
                </svg>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 right-4 bg-[#B54E32] text-white rounded-2xl px-4 py-2.5 shadow-lg" aria-hidden="true">
                <p className="font-heading text-xs italic opacity-90">
                  &ldquo;Made with love&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-7 order-1 lg:order-2"
          >
            <SectionTitle
              eyebrow="Our Story"
              title="A Passion for Authentic Flavour"
              id="story-heading"
              scrollAnimate
            />

            <div className="space-y-4 font-body text-[#6B6355] leading-relaxed text-base">
              <p>
                Shish Shawarma & Grill was born from a deep love of Middle Eastern
                food and a desire to bring those honest, vibrant flavours to
                Melbourne. What started as a passion for cooking the way our
                families did — over real charcoal, with hand-blended spices and
                the finest cuts — has grown into a place where the whole community
                gathers.
              </p>
              <p>
                Every dish we prepare carries that same spirit. The slow-roasted
                shawarma, the smoky mixed grill, the handcrafted wraps — each one
                is a reflection of the care, tradition, and respect we have for
                the food we serve.
              </p>
              <p>
                We believe great food should be simple, honest, and made with
                intention. That&apos;s why we prepare everything fresh each day,
                never cutting corners, always grilling over real charcoal the way
                it was meant to be done.
              </p>
            </div>

            <blockquote className="border-l-2 border-[#B54E32] pl-5 italic font-heading text-xl text-[#2F2F2F] leading-snug">
              &ldquo;Food is the common ground — a universal experience.&rdquo;
            </blockquote>

            <SecondaryButton as="a" href="/about" className="mt-2">
              Our Story
            </SecondaryButton>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
