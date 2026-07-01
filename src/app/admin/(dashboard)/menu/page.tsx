"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, MoreHorizontal, ToggleLeft, ToggleRight, Copy, Archive, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getMenuItems, toggleAvailability, deleteMenuItem, duplicateMenuItem, archiveMenuItem } from "@/lib/actions/menu";
import type { AdminMenuItem } from "@/types/admin";

export default function MenuPage() {
  const [items, setItems] = useState<AdminMenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const load = (q?: string) => {
    startTransition(async () => {
      const data = await getMenuItems();
      const filtered = q ? data.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()) || i.category.name.toLowerCase().includes(q.toLowerCase())) : data;
      setItems(filtered);
    });
  };

  useEffect(() => { load(); }, []);

  const handleToggle = (id: string, currentAvailable: boolean) => {
    startTransition(async () => {
      await toggleAvailability(id, !currentAvailable);
      toast.success(currentAvailable ? "Marked unavailable" : "Marked available");
      load(search);
    });
  };

  const handleDuplicate = (id: string) => {
    setMenuOpen(null);
    startTransition(async () => {
      await duplicateMenuItem(id);
      toast.success("Item duplicated");
      load(search);
    });
  };

  const handleArchive = (id: string) => {
    setMenuOpen(null);
    startTransition(async () => {
      await archiveMenuItem(id);
      toast.success("Item archived");
      load(search);
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const id = deleteTarget;
    setDeleteTarget(null);
    startTransition(async () => {
      await deleteMenuItem(id);
      toast.success("Item deleted");
      load(search);
    });
  };

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Menu</h1>
          <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{items.length} items</p>
        </div>
        <Link href="/admin/menu/new" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
          <Plus size={14} /> Add Item
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            aria-label="Search menu items"
            value={search}
            onChange={(e) => { setSearch(e.target.value); load(e.target.value); }}
            placeholder="Search menu items…"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
      </div>

      {/* Items grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200">
          <EmptyState icon={Search} title="No items found" description="Add your first menu item or adjust your search." action={{ label: "Add Menu Item", href: "/admin/menu/new" }} />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all ${item.available ? "border-neutral-200" : "border-neutral-200 opacity-60"}`}
            >
              {/* Image */}
              <div className="relative h-40 bg-neutral-100 rounded-t-2xl overflow-hidden">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300 text-2xl">🍽</div>
                )}
                {item.badge && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#B54E32] text-white text-[10px] font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                    {item.badge}
                  </span>
                )}
                {!item.available && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="px-2 py-1 bg-black/60 text-white text-xs rounded font-medium" style={{ fontFamily: "var(--font-inter)" }}>Unavailable</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="min-w-0">
                    <p className="font-semibold text-[#111] text-sm truncate" style={{ fontFamily: "var(--font-inter)" }}>{item.name}</p>
                    <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>{item.category.name}</p>
                  </div>
                  <p className="font-bold text-[#B54E32] text-sm shrink-0" style={{ fontFamily: "var(--font-inter)" }}>{item.price}</p>
                </div>

                {item.description && (
                  <p className="text-xs text-neutral-500 line-clamp-2 mt-1 mb-3" style={{ fontFamily: "var(--font-inter)" }}>{item.description}</p>
                )}

                <div className="flex items-center gap-2 mt-3">
                  {/* Toggle availability */}
                  <button
                    onClick={() => handleToggle(item.id, item.available)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                    style={{ fontFamily: "var(--font-inter)" }}
                    title={item.available ? "Mark unavailable" : "Mark available"}
                  >
                    {item.available
                      ? <ToggleRight size={13} className="text-[#6E8B5C]" />
                      : <ToggleLeft size={13} className="text-neutral-400" />}
                    {item.available ? "Available" : "Unavailable"}
                  </button>

                  <Link
                    href={`/admin/menu/${item.id}`}
                    className="flex-1 text-center px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Edit
                  </Link>

                  {/* More menu */}
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === item.id ? null : item.id)}
                      className="w-7 h-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer"
                      aria-label="More options"
                    >
                      <MoreHorizontal size={13} />
                    </button>

                    {menuOpen === item.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(null)} aria-hidden="true" />
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-neutral-200 shadow-lg z-50 overflow-hidden">
                          <button onClick={() => handleDuplicate(item.id)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
                            <Copy size={12} /> Duplicate
                          </button>
                          <button onClick={() => handleArchive(item.id)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
                            <Archive size={12} /> Archive
                          </button>
                          <div className="border-t border-neutral-100">
                            <button onClick={() => { setMenuOpen(null); setDeleteTarget(item.id); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete menu item?"
        description="This will permanently delete this item. This action cannot be undone."
        confirmLabel="Delete"
        danger
        loading={isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
