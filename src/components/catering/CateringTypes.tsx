"use client";

import { motion } from "framer-motion";
import { Users, Building2, Cake, GraduationCap, Heart, Star } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CATERING_CONTENT } from "@/config/site-content";

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={24} />,
  building: <Building2 size={24} />,
  cake: <Cake size={24} />,
  school: <GraduationCap size={24} />,
  heart: <Heart size={24} />,
  star: <Star size={24} />,
};

export function CateringTypes() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2]" aria-labelledby="catering-types-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <SectionTitle
            id="catering-types-title"
            eyebrow="Who We Cater For"
            title="The Right Food for Every Event"
            centered
            scrollAnimate
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATERING_CONTENT.types.map((type, i) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-6 sm:p-7 border border-[#E5DDD0]/60 hover:border-[#B54E32]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#B54E32]/10 text-[#B54E32] flex items-center justify-center mb-5 group-hover:bg-[#B54E32] group-hover:text-white transition-all duration-300">
                {iconMap[type.icon] ?? <Star size={24} />}
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#2F2F2F] mb-2">
                {type.title}
              </h3>
              <p className="font-body text-sm text-[#6B6355] leading-relaxed">
                {type.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
