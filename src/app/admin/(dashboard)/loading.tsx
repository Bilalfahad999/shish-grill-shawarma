import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-9 rounded-xl" />
            </div>
            <Skeleton className="h-7 w-16" />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-5">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-20 mb-5" />
          <Skeleton className="h-16 w-full" />
        </div>
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
          <Skeleton className="h-4 w-24" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-2.5 w-16" />
                <Skeleton className="h-3.5 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
          <Skeleton className="h-4 w-28" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
          <Skeleton className="h-4 w-28" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
