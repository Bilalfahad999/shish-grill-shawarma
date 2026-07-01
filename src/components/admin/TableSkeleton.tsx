import { Skeleton } from "@/components/ui/Skeleton";

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
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

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-50">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4">
            <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-1/3" />
              <Skeleton className="h-2.5 w-1/4" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
