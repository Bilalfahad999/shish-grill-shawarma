import { Skeleton } from "@/components/ui/Skeleton";

export default function CateringDetailLoading() {
  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-2.5 w-24" />
        </div>
      </div>
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-44 rounded-2xl" />
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  );
}
