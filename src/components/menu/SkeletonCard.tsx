export function SkeletonCard() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-[#E5DDD0]/60 animate-pulse"
      aria-hidden="true"
    >
      <div className="h-52 bg-[#F2ECE3]" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-[#E5DDD0] rounded-full" />
          <div className="h-4 w-12 bg-[#E5DDD0] rounded-full" />
        </div>
        <div className="h-3 w-full bg-[#F2ECE3] rounded-full" />
        <div className="h-3 w-4/5 bg-[#F2ECE3] rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonFeaturedCard() {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden border border-[#E5DDD0]/60 animate-pulse"
      aria-hidden="true"
    >
      <div className="h-72 bg-[#F2ECE3]" />
      <div className="p-6 space-y-3">
        <div className="h-6 w-40 bg-[#E5DDD0] rounded-full" />
        <div className="h-4 w-full bg-[#F2ECE3] rounded-full" />
        <div className="h-4 w-3/4 bg-[#F2ECE3] rounded-full" />
      </div>
    </div>
  );
}
