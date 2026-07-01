"use client";

import { useState, useTransition, useEffect } from "react";
import { Plus, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/actions/menu";
import type { Category } from "@/types/admin";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const data = await getCategories();
      setCategories(data);
    });
  };

  useEffect(() => { load(); }, []);

  const handleAdd = () => {
    const name = newName.trim();
    if (!name) return;
    startTransition(async () => {
      await createCategory(name);
      toast.success("Category created");
      setNewName("");
      load();
    });
  };

  const handleToggleVisible = (id: string, visible: boolean) => {
    startTransition(async () => {
      await updateCategory(id, { visible: !visible });
      toast.success(visible ? "Category hidden" : "Category shown");
      load();
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const id = deleteTarget;
    setDeleteTarget(null);
    startTransition(async () => {
      await deleteCategory(id);
      toast.success("Category deleted");
      load();
    });
  };

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Categories</h1>
        <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{categories.length} categories</p>
      </div>

      {/* Add form */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex gap-2">
        <input
          type="text"
          aria-label="New category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          placeholder="New category name…"
          className="flex-1 px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        />
        <button
          onClick={handleAdd}
          disabled={isPending || !newName.trim()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {isPending ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
          Add
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200">
          <EmptyState icon={Plus} title="No categories" description="Create your first menu category." />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-50">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-neutral-800" style={{ fontFamily: "var(--font-inter)" }}>{cat.name}</p>
                <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>{cat._count?.items ?? 0} items</p>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleToggleVisible(cat.id, cat.visible)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${cat.visible ? "bg-neutral-100 text-neutral-500 hover:bg-neutral-200" : "bg-neutral-200 text-neutral-400"}`}
                  title={cat.visible ? "Hide category" : "Show category"}
                >
                  {cat.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
                <button
                  onClick={() => setDeleteTarget(cat.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-neutral-100 text-neutral-400 hover:bg-red-100 hover:text-red-500 transition-colors cursor-pointer"
                  title="Delete category"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete category?"
        description="Items in this category won't be deleted but will become uncategorised."
        confirmLabel="Delete"
        danger
        loading={isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
