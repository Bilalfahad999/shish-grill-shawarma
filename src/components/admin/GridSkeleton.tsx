import { Skeleton } from "@/components/ui/Skeleton";

export function GridSkeleton({ items = 6 }: { items?: number }) {
  return (
    <div className="space-y-5 max-w-[1200px]">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-4">
        <Skeleton className="h-9 w-full max-w-md rounded-xl" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <Skeleton className="h-40 w-full rounded-none" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-3.5 w-2/3" />
              <Skeleton className="h-2.5 w-1/3" />
              <Skeleton className="h-7 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
