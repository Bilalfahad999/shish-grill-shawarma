"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Star, StarOff } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { getGalleryImages, deleteGalleryImage, updateGalleryImage, addGalleryImage } from "@/lib/actions/content";
import type { AdminGalleryImage } from "@/types/admin";

type Category = AdminGalleryImage["category"];
const CATEGORIES: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Food", value: "food" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Events", value: "events" },
];

export default function GalleryPage() {
  const [images, setImages] = useState<AdminGalleryImage[]>([]);
  const [filter, setFilter] = useState<Category | "all">("all");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newImage, setNewImage] = useState({ src: "", alt: "", category: "food" as Category });
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const data = await getGalleryImages();
      setImages(data);
    });
  };

  useEffect(() => { load(); }, []);

  const displayed = filter === "all" ? images : images.filter((i) => i.category === filter);

  const handleDelete = () => {
    if (!deleteTarget) return;
    const id = deleteTarget;
    setDeleteTarget(null);
    startTransition(async () => {
      await deleteGalleryImage(id);
      toast.success("Image deleted");
      load();
    });
  };

  const handleFeature = (id: string, featured: boolean) => {
    startTransition(async () => {
      await updateGalleryImage(id, { featured: !featured });
      toast.success(featured ? "Removed from featured" : "Added to featured");
      load();
    });
  };

  const handleAdd = () => {
    if (!newImage.src || !newImage.alt) return;
    startTransition(async () => {
      await addGalleryImage({ ...newImage, aspect: "landscape", displayOrder: images.length, featured: false });
      toast.success("Image added to gallery");
      setNewImage({ src: "", alt: "", category: "food" });
      setShowAdd(false);
      load();
    });
  };

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Gallery</h1>
          <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{images.length} images</p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Plus size={14} /> Add Image
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
          <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Add New Image</h2>
          <ImageUploader label="Image" value={newImage.src} onChange={(url) => setNewImage((p) => ({ ...p, src: url }))} hint="Or use the URL field below" />
          <input type="url" aria-label="Image URL" value={newImage.src} onChange={(e) => setNewImage((p) => ({ ...p, src: e.target.value }))} placeholder="Image URL" className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
          <input type="text" aria-label="Alt text (description)" value={newImage.alt} onChange={(e) => setNewImage((p) => ({ ...p, alt: e.target.value }))} placeholder="Alt text (description)" className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] transition-colors" style={{ fontFamily: "var(--font-inter)" }} />
          <select aria-label="Image category" value={newImage.category} onChange={(e) => setNewImage((p) => ({ ...p, category: e.target.value as Category }))} className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
            {CATEGORIES.filter((c) => c.value !== "all").map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>Cancel</button>
            <button onClick={handleAdd} disabled={isPending || !newImage.src || !newImage.alt} className="px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50" style={{ fontFamily: "var(--font-inter)" }}>Add Image</button>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button key={c.value} onClick={() => setFilter(c.value)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${filter === c.value ? "bg-[#B54E32] text-white" : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`} style={{ fontFamily: "var(--font-inter)" }}>
            {c.label}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200">
          <EmptyState icon={Star} title="No images" description="Add images to your gallery." action={{ label: "Add Image", onClick: () => setShowAdd(true) }} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayed.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-square">
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                <div className="flex gap-1.5 w-full">
                  <button onClick={() => handleFeature(img.id, img.featured)} className={`flex items-center justify-center w-7 h-7 rounded-lg bg-white/90 hover:bg-white transition-colors cursor-pointer ${img.featured ? "text-amber-500" : "text-neutral-500"}`} title={img.featured ? "Unfeature" : "Feature"}>
                    {img.featured ? <Star size={12} fill="currentColor" /> : <StarOff size={12} />}
                  </button>
                  <button onClick={() => setDeleteTarget(img.id)} className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-red-500 transition-colors cursor-pointer" title="Delete">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              {img.featured && (
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-amber-400 text-white text-[9px] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Featured</span>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={deleteTarget !== null} title="Delete image?" description="This will permanently remove the image from your gallery." confirmLabel="Delete" danger loading={isPending} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
