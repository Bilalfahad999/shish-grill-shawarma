"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const reviews = [
  {
    name: "Sarah M.",
    avatar: "SM",
    rating: 5,
    text: "Absolutely the best shawarma I've had in Melbourne. The charcoal flavour is incredible and everything tastes so fresh. The mixed grill platter is a must — perfect for sharing!",
    date: "2 weeks ago",
    color: "bg-[#B54E32]",
  },
  {
    name: "James K.",
    avatar: "JK",
    rating: 5,
    text: "We ordered catering for our family event and they absolutely delivered. Generous portions, everything was hot and fresh, and the team was so professional. Will definitely use again.",
    date: "1 month ago",
    color: "bg-[#6E8B5C]",
  },
  {
    name: "Layla A.",
    avatar: "LA",
    rating: 5,
    text: "Finally a place in Melbourne that does authentic shawarma! The lamb wrap is unreal. The bread is soft, the sauce is perfect. Feels like you're eating street food in Beirut.",
    date: "3 weeks ago",
    color: "bg-[#D96C2F]",
  },
  {
    name: "Michael T.",
    avatar: "MT",
    rating: 5,
    text: "Came here for the first time on a friend's recommendation and I'm hooked. The chicken shish was grilled perfectly — juicy inside, charred on the outside. Huge portions too.",
    date: "5 days ago",
    color: "bg-[#4C6B3C]",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-[#D96C2F] text-[#D96C2F]" aria-hidden="true" />
      ))}
    </div>
  );
}

export function Reviews() {
  const { settings } = useSiteSettings();

  return (
    <section
      id="reviews"
      className="py-20 sm:py-28 bg-[#F2ECE3]"
      aria-labelledby="reviews-heading"
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionTitle
            eyebrow="What People Say"
            title="Loved by Melbourne Locals"
            subtitle="Hundreds of happy customers can't be wrong. Read what they have to say."
            id="reviews-heading"
            scrollAnimate
          />
          <div className="shrink-0 self-start sm:self-auto">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#D96C2F] text-[#D96C2F]" aria-hidden="true" />
                ))}
              </div>
              <span className="font-body font-semibold text-[#2F2F2F]">4.9</span>
              <span className="font-body text-sm text-[#6B6355]">on Google</span>
            </div>
            <SecondaryButton
              as="a"
              href={settings.googleMapsUrl ?? "https://maps.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2 text-sm"
            >
              Read More Reviews
              <ArrowRight size={14} />
            </SecondaryButton>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD0]/60 hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white font-body text-sm font-semibold shrink-0`}
                    aria-hidden="true"
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[#2F2F2F] text-sm">{review.name}</p>
                    <p className="font-body text-xs text-[#6B6355]">{review.date}</p>
                  </div>
                </div>
                {/* Google G icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 shrink-0 mt-0.5"
                  aria-label="Google review"
                  role="img"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>

              <StarRow count={review.rating} />

              <p className="font-body text-sm text-[#6B6355] leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
