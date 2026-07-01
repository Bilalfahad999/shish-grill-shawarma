"use client";

import { useState, useTransition, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { getOpeningHours, saveOpeningHours } from "@/lib/actions/content";
import type { OpeningHour } from "@/types/admin";

export default function HoursPage() {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    startTransition(async () => {
      const data = await getOpeningHours();
      setHours(data);
    });
  }, []);

  const update = (id: string, field: keyof OpeningHour, value: string | boolean) => {
    setHours((prev) => prev.map((h) => (h.id === id ? { ...h, [field]: value } : h)));
  };

  const save = () => {
    startTransition(async () => {
      await saveOpeningHours(hours);
      toast.success("Opening hours saved");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  if (hours.length === 0) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 size={20} className="animate-spin text-neutral-400" />
    </div>
  );

  const inputCls = "px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors";

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Opening Hours</h1>
        <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Set your restaurant's weekly schedule</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-50">
        {hours.map((h) => (
          <div key={h.id} className="flex items-center gap-3 px-5 py-3.5">
            <p className="w-24 text-sm font-medium text-neutral-700 shrink-0" style={{ fontFamily: "var(--font-inter)" }}>{h.day}</p>

            {h.closed ? (
              <p className="flex-1 text-sm text-neutral-400 italic" style={{ fontFamily: "var(--font-inter)" }}>Closed</p>
            ) : (
              <div className="flex items-center gap-2 flex-1">
                <input type="time" aria-label={`${h.day} opening time`} value={h.open} onChange={(e) => update(h.id, "open", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} />
                <span className="text-neutral-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>–</span>
                <input type="time" aria-label={`${h.day} closing time`} value={h.close} onChange={(e) => update(h.id, "close", e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} />
              </div>
            )}

            <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
              <input type="checkbox" checked={h.closed} onChange={(e) => update(h.id, "closed", e.target.checked)} className="w-3.5 h-3.5 rounded border-neutral-300 accent-[#B54E32] cursor-pointer" />
              <span className="text-xs text-neutral-500" style={{ fontFamily: "var(--font-inter)" }}>Closed</span>
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={save}
        disabled={isPending}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {isPending ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
        {saved ? "Saved!" : "Save Hours"}
      </button>
    </div>
  );
}
