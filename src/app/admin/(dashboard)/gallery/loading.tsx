import { Skeleton } from "@/components/ui/Skeleton";

export default function GalleryLoading() {
  return (
    <div className="space-y-5 max-w-[1200px]">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-16 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-xl" />
        ))}
      </div>
    </div>
  );
}
