import Link from "next/link";
import { WifiOff, Phone } from "lucide-react";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

export const metadata = { title: "You're Offline" };

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-[#E5DDD0] flex items-center justify-center mx-auto mb-5">
          <WifiOff size={28} className="text-[#6B6355]" />
        </div>
        <h1 className="font-heading text-3xl font-light text-[#2F2F2F] mb-3">
          You're offline
        </h1>
        <p className="font-body text-base text-[#6B6355] mb-8 leading-relaxed">
          Check your internet connection and try again. You can still call us directly to place an order.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${RESTAURANT_CONFIG.phone}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#B54E32] text-white font-body font-semibold text-sm hover:bg-[#D96C2F] transition-colors cursor-pointer"
          >
            <Phone size={15} /> Call {RESTAURANT_CONFIG.phone}
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#E5DDD0] text-[#2F2F2F] font-body font-semibold text-sm hover:bg-white transition-colors cursor-pointer"
          >
            Try Again
          </Link>
        </div>
      </div>
    </main>
  );
}
