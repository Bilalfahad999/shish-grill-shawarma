import { Skeleton } from "@/components/ui/Skeleton";

export default function GalleryPageLoading() {
  return (
    <main className="bg-[#FAF7F2] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-10">
        <div className="space-y-3 max-w-xl">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className={`rounded-2xl ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
          ))}
        </div>
      </div>
    </main>
  );
}
