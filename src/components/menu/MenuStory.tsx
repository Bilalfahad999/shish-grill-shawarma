"use client";

import { motion } from "framer-motion";
import { Flame, Leaf, Clock, ChefHat } from "lucide-react";

const pillars = [
  {
    icon: <Flame size={18} className="text-[#D96C2F]" aria-hidden="true" />,
    title: "Charcoal Grilling",
    desc: "Every grill item cooked over real charcoal — never gas, never shortcuts.",
  },
  {
    icon: <Leaf size={18} className="text-[#6E8B5C]" aria-hidden="true" />,
    title: "Fresh Ingredients",
    desc: "Produce, herbs, and sauces prepared in-house each morning before service.",
  },
  {
    icon: <ChefHat size={18} className="text-[#B54E32]" aria-hidden="true" />,
    title: "Traditional Recipes",
    desc: "Spice blends and techniques rooted in authentic Middle Eastern culinary heritage.",
  },
  {
    icon: <Clock size={18} className="text-[#4C6B3C]" aria-hidden="true" />,
    title: "Handcrafted Sauces",
    desc: "Our garlic toum, tahini, and chilli sauces are made from scratch — every single day.",
  },
];

export function MenuStory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="py-12 sm:py-16 my-4 rounded-3xl bg-[#2F2F2F] px-6 sm:px-10 lg:px-14"
      aria-labelledby="menu-story-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-body text-xs font-medium tracking-[0.2em] uppercase text-[#D96C2F]/80 mb-3">
          Our Promise
        </p>
        <h2
          id="menu-story-heading"
          className="font-heading font-light text-3xl sm:text-4xl text-white mb-4"
        >
          Prepared Fresh Every Day
        </h2>
        <p className="font-body text-sm sm:text-base text-white/55 leading-relaxed max-w-2xl mx-auto mb-10">
          There are no shortcuts at Shish. Every item on this menu is made with care,
          using real ingredients and techniques that take time to do properly.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-white/8 flex items-center justify-center">
                {p.icon}
              </div>
              <div>
                <h3 className="font-body font-semibold text-white text-sm mb-1">{p.title}</h3>
                <p className="font-body text-xs text-white/45 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
