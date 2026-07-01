import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategories } from "@/lib/actions/menu";
import { MenuItemForm } from "@/components/admin/MenuItemForm";

export default async function NewMenuItemPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/menu" className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer">
          <ArrowLeft size={14} />
        </Link>
        <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Add Menu Item</h1>
      </div>
      <MenuItemForm categories={categories} />
    </div>
  );
}
