import { Skeleton } from "@/components/ui/Skeleton";

export default function MenuPageLoading() {
  return (
    <main className="bg-[#FAF7F2] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 max-w-xl">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-full shrink-0" />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[4/3] rounded-2xl" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
