"use client";

import { motion } from "framer-motion";
import { Flame, CheckCircle, Utensils, Layers, Truck, Clock } from "lucide-react";
import { CATERING_CONTENT } from "@/config/site-content";

const iconMap: Record<string, React.ReactNode> = {
  flame: <Flame size={28} />,
  "check-circle": <CheckCircle size={28} />,
  utensils: <Utensils size={28} />,
  layers: <Layers size={28} />,
  truck: <Truck size={28} />,
  clock: <Clock size={28} />,
};

export function CateringHighlights() {
  return (
    <section className="py-16 bg-[#2F2F2F]" aria-label="Catering highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {CATERING_CONTENT.highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="text-[#D96C2F]">
                {iconMap[item.icon] ?? <CheckCircle size={28} />}
              </div>
              <p className="font-body text-sm font-medium text-white/80">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
