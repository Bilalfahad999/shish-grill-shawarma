import { Skeleton } from "@/components/ui/Skeleton";

export default function OrderDetailLoading() {
  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-2.5 w-24" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>
      <Skeleton className="h-64 rounded-2xl" />
      <Skeleton className="h-20 rounded-2xl" />
    </div>
  );
}
