"use client";

import { useState, useTransition, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { getAnnouncement, saveAnnouncement } from "@/lib/actions/content";
import type { AdminAnnouncement } from "@/types/admin";

export default function AnnouncementsPage() {
  const [data, setData] = useState<AdminAnnouncement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    startTransition(async () => {
      const ann = await getAnnouncement();
      if (ann) setData(ann);
    });
  }, []);

  const set = (key: keyof AdminAnnouncement, value: string | boolean) =>
    setData((prev) => prev ? { ...prev, [key]: value } : prev);

  const save = () => {
    if (!data) return;
    startTransition(async () => {
      await saveAnnouncement(data);
      toast.success("Announcement saved");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const inputCls = "w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors";

  if (!data) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 size={20} className="animate-spin text-neutral-400" />
    </div>
  );

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Announcement Bar</h1>
        <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Manage the site-wide announcement banner</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
        {/* Enable toggle */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-neutral-700" style={{ fontFamily: "var(--font-inter)" }}>Enable Announcement</p>
            <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>Show or hide the announcement bar across the website</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={data.enabled}
            aria-label="Enable announcement"
            onClick={() => set("enabled", !data.enabled)}
            className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative shrink-0 ${data.enabled ? "bg-[#B54E32]" : "bg-neutral-200"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${data.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>

        <div>
          <label htmlFor="ann-message" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Message *</label>
          <textarea id="ann-message" value={data.message} onChange={(e) => set("message", e.target.value)} rows={2} className={`${inputCls} resize-none`} style={{ fontFamily: "var(--font-inter)" }} placeholder="Now accepting catering enquiries…" />
        </div>

        <div>
          <label htmlFor="ann-type" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Type</label>
          <select id="ann-type" value={data.type} onChange={(e) => set("type", e.target.value)} className={`${inputCls} cursor-pointer`} style={{ fontFamily: "var(--font-inter)" }}>
            <option value="info">Info (Terracotta)</option>
            <option value="success">Success (Sage Green)</option>
            <option value="warning">Warning (Burnt Orange)</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={data.dismissible} onChange={(e) => set("dismissible", e.target.checked)} className="w-4 h-4 rounded border-neutral-300 accent-[#B54E32] cursor-pointer" />
          <span className="text-sm text-neutral-700" style={{ fontFamily: "var(--font-inter)" }}>Allow visitors to dismiss</span>
        </label>
      </div>

      <button
        onClick={save}
        disabled={isPending}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {isPending ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
