"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUploader } from "./ImageUploader";
import { createMenuItem, updateMenuItem } from "@/lib/actions/menu";
import type { AdminMenuItem, Category } from "@/types/admin";

interface MenuItemFormProps {
  categories: Category[];
  item?: AdminMenuItem;
}

export function MenuItemForm({ categories, item }: MenuItemFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: item?.name ?? "",
    description: item?.description ?? "",
    price: item?.price ?? "",
    categoryId: item?.categoryId ?? "",
    image: item?.image ?? "",
    popular: item?.popular ?? false,
    vegetarian: item?.vegetarian ?? false,
    spicy: item?.spicy ?? false,
    charcoalGrilled: item?.charcoalGrilled ?? false,
    available: item?.available ?? true,
    badge: item?.badge ?? "",
  });

  const [includes, setIncludes] = useState<string[]>(item?.includes ?? []);
  const [includeInput, setIncludeInput] = useState("");

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addInclude = () => {
    const val = includeInput.trim();
    if (val && !includes.includes(val)) {
      setIncludes((prev) => [...prev, val]);
      setIncludeInput("");
    }
  };

  const removeInclude = (i: number) => setIncludes((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const payload = { ...form, badge: form.badge || undefined, includes, displayOrder: 0 };
      const result = item
        ? await updateMenuItem(item.id, payload)
        : await createMenuItem(payload);

      if (result.success) {
        toast.success(item ? "Menu item updated" : "Menu item created");
        router.push("/admin/menu");
        router.refresh();
      } else {
        setError(result.error ?? "Something went wrong.");
      }
    });
  };

  const inputCls = "w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Basic Info</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="item-name" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Item Name *</label>
            <input id="item-name" type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required className={inputCls} style={{ fontFamily: "var(--font-inter)" }} placeholder="Chicken Shish Kebab" />
          </div>
          <div>
            <label htmlFor="item-price" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Price *</label>
            <input id="item-price" type="text" value={form.price} onChange={(e) => set("price", e.target.value)} required className={inputCls} style={{ fontFamily: "var(--font-inter)" }} placeholder="$19.90" />
          </div>
        </div>

        <div>
          <label htmlFor="item-category" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Category *</label>
          <select id="item-category" value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} required className={`${inputCls} cursor-pointer`} style={{ fontFamily: "var(--font-inter)" }}>
            <option value="">Select category…</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="item-description" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Short Description *</label>
          <textarea id="item-description" value={form.description} onChange={(e) => set("description", e.target.value)} required rows={2} className={`${inputCls} resize-none`} style={{ fontFamily: "var(--font-inter)" }} placeholder="Tender chicken marinated in herbs and grilled over charcoal." />
        </div>

        <div>
          <label htmlFor="item-badge" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Badge (optional)</label>
          <input id="item-badge" type="text" value={form.badge} onChange={(e) => set("badge", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} placeholder="Best Seller, New, Spicy…" />
        </div>
      </div>

      {/* Image */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5">
        <ImageUploader
          label="Item Image"
          value={form.image}
          onChange={(url) => set("image", url)}
          hint="Recommended: 800×600px, JPEG or WebP"
        />
        {/* Also allow URL input for now */}
        <div className="mt-3">
          <label htmlFor="item-image-url" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Or paste image URL</label>
          <input id="item-image-url" type="url" value={form.image} onChange={(e) => set("image", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} placeholder="https://images.unsplash.com/…" />
        </div>
      </div>

      {/* Flags */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-sm text-[#111] mb-4" style={{ fontFamily: "var(--font-inter)" }}>Properties</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { key: "available", label: "Available" },
            { key: "popular", label: "Popular" },
            { key: "vegetarian", label: "Vegetarian" },
            { key: "spicy", label: "Spicy" },
            { key: "charcoalGrilled", label: "Charcoal Grilled" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={form[key as keyof typeof form] as boolean}
                onChange={(e) => set(key, e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 accent-[#B54E32] cursor-pointer"
              />
              <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Includes */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-sm text-[#111] mb-3" style={{ fontFamily: "var(--font-inter)" }}>Includes (optional)</h2>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            aria-label="Add an included item"
            value={includeInput}
            onChange={(e) => setIncludeInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addInclude(); } }}
            placeholder="e.g. Pita bread, House salad…"
            className={`${inputCls} flex-1`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <button type="button" onClick={addInclude} className="px-3 py-2 rounded-xl bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer">
            <Plus size={14} />
          </button>
        </div>
        {includes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {includes.map((inc, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-sm text-neutral-700" style={{ fontFamily: "var(--font-inter)" }}>
                {inc}
                <button type="button" onClick={() => removeInclude(i)} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button type="button" onClick={() => router.back()} className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
          Cancel
        </button>
        <button type="submit" disabled={isPending} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50" style={{ fontFamily: "var(--font-inter)" }}>
          {isPending && <Loader2 size={13} className="animate-spin" />}
          {item ? "Save Changes" : "Create Item"}
        </button>
      </div>
    </form>
  );
}
