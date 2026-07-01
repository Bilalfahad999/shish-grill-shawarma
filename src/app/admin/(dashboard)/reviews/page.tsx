"use client";

import { useState, useTransition, useEffect } from "react";
import { Star, Eye, EyeOff, Pin, PinOff } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/admin/EmptyState";
import { getReviews, updateReview } from "@/lib/actions/content";
import type { AdminReview } from "@/types/admin";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className={i <= rating ? "text-amber-400 fill-amber-400" : "text-neutral-200 fill-neutral-200"} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const data = await getReviews();
      setReviews(data);
    });
  };

  useEffect(() => { load(); }, []);

  const TOGGLE_LABELS: Record<"hidden" | "featured" | "pinned", [string, string]> = {
    hidden: ["Review hidden", "Review shown"],
    featured: ["Removed from featured", "Added to featured"],
    pinned: ["Unpinned", "Pinned to top"],
  };

  const toggle = (id: string, field: "hidden" | "featured" | "pinned", current: boolean) => {
    startTransition(async () => {
      await updateReview(id, { [field]: !current });
      toast.success(TOGGLE_LABELS[field][current ? 0 : 1]);
      load();
    });
  };

  return (
    <div className="space-y-5 max-w-[900px]">
      <div>
        <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Reviews</h1>
        <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{reviews.length} reviews</p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200">
          <EmptyState icon={Star} title="No reviews yet" description="Customer reviews will appear here once they start coming in." />
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white rounded-2xl border p-5 transition-opacity ${review.hidden ? "opacity-50 border-neutral-100" : "border-neutral-200"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-[#111] text-sm" style={{ fontFamily: "var(--font-inter)" }}>{review.author}</p>
                    {review.pinned && <span className="px-1.5 py-0.5 rounded bg-[#B54E32]/10 text-[#B54E32] text-[10px] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Pinned</span>}
                    {review.featured && <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Featured</span>}
                    {review.hidden && <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-400 text-[10px] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Hidden</span>}
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-neutral-600 mt-2 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{review.text}</p>
                  <p className="text-xs text-neutral-400 mt-2" style={{ fontFamily: "var(--font-inter)" }}>
                    {review.date} · via {review.source === "google" ? "Google" : "Manual"}
                  </p>
                </div>

                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => toggle(review.id, "pinned", review.pinned)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${review.pinned ? "bg-[#B54E32]/10 text-[#B54E32]" : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"}`}
                    title={review.pinned ? "Unpin" : "Pin to top"}
                  >
                    {review.pinned ? <PinOff size={12} /> : <Pin size={12} />}
                  </button>
                  <button
                    onClick={() => toggle(review.id, "featured", review.featured)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${review.featured ? "bg-amber-100 text-amber-600" : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"}`}
                    title={review.featured ? "Unfeature" : "Feature on homepage"}
                  >
                    <Star size={12} className={review.featured ? "fill-current" : ""} />
                  </button>
                  <button
                    onClick={() => toggle(review.id, "hidden", review.hidden)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${review.hidden ? "bg-neutral-200 text-neutral-600" : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"}`}
                    title={review.hidden ? "Show review" : "Hide review"}
                  >
                    {review.hidden ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
