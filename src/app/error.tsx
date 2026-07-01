"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // TODO: send to error reporting service (Sentry, etc.)
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-red-500" />
        </div>
        <h1 className="font-heading text-3xl font-light text-[#2F2F2F] mb-3">
          Something went wrong
        </h1>
        <p className="font-body text-base text-[#6B6355] mb-8 leading-relaxed">
          We hit an unexpected error. Please try again, or head back home — your cart and order are safe.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => unstable_retry()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#B54E32] text-white font-body font-semibold text-sm hover:bg-[#D96C2F] transition-colors cursor-pointer"
          >
            <RefreshCw size={15} /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#E5DDD0] text-[#2F2F2F] font-body font-semibold text-sm hover:bg-white transition-colors cursor-pointer"
          >
            <Home size={15} /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
