import { cn } from "@/lib/utils";

/** Shimmering placeholder block — use instead of spinners while content loads. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-[#F2ECE3] via-[#E5DDD0] to-[#F2ECE3] bg-[length:200%_100%]",
        className
      )}
      style={{ animation: "skeleton-shimmer 1.8s ease-in-out infinite" }}
      aria-hidden="true"
    />
  );
}
