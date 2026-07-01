import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMenuItem, getCategories } from "@/lib/actions/menu";
import { MenuItemForm } from "@/components/admin/MenuItemForm";

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item, categories] = await Promise.all([getMenuItem(id), getCategories()]);
  if (!item) notFound();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/menu" className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer">
          <ArrowLeft size={14} />
        </Link>
        <div>
          <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Edit Menu Item</h1>
          <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>{item.name}</p>
        </div>
      </div>
      <MenuItemForm categories={categories} item={item} />
    </div>
  );
}
