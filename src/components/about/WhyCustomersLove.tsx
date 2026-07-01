"use client";

import { motion } from "framer-motion";
import { Flame, CheckCircle, Star, Zap, Users, Heart } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ABOUT_CONTENT } from "@/config/site-content";

const iconMap: Record<string, React.ReactNode> = {
  fresh: <Zap size={22} className="text-[#D96C2F]" />,
  halal: <CheckCircle size={22} className="text-[#6E8B5C]" />,
  recipes: <Star size={22} className="text-[#D96C2F]" />,
  charcoal: <Flame size={22} className="text-[#B54E32]" />,
  portions: <Heart size={22} className="text-[#D96C2F]" />,
  service: <Users size={22} className="text-[#6E8B5C]" />,
};

export function WhyCustomersLove() {
  return (
    <section className="py-20 sm:py-28 bg-[#F2ECE3]" aria-labelledby="why-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            id="why-title"
            eyebrow="Why Us"
            title="Why Customers Love Us"
            centered
            className="mb-14"
            scrollAnimate
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_CONTENT.values.map((item, i) => (
            <motion.div
              key={item.icon}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5DDD0]/60 hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center mb-5">
                {iconMap[item.icon] ?? <Star size={22} className="text-[#D96C2F]" />}
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#2F2F2F] mb-2">
                {item.title}
              </h3>
              <p className="font-body text-sm text-[#6B6355] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
