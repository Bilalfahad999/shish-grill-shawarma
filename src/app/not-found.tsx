import Link from "next/link";
import { Home, UtensilsCrossed } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center px-4 pt-24">
        <div className="text-center max-w-md">
          <p className="font-heading text-8xl font-light text-[#B54E32] mb-2">404</p>
          <h1 className="font-heading text-3xl font-light text-[#2F2F2F] mb-3">
            Page not found
          </h1>
          <p className="font-body text-base text-[#6B6355] mb-8 leading-relaxed">
            Looks like this page got grilled a little too long. Let's get you back to something delicious.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#B54E32] text-white font-body font-semibold text-sm hover:bg-[#D96C2F] transition-colors cursor-pointer"
            >
              <Home size={15} /> Back to Home
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#E5DDD0] text-[#2F2F2F] font-body font-semibold text-sm hover:bg-white transition-colors cursor-pointer"
            >
              <UtensilsCrossed size={15} /> View Menu
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
