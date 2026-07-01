"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateCateringStatus, updateCateringNotes } from "@/lib/actions/catering";
import type { CateringStatus } from "@/types/admin";
import { Loader2, Save } from "lucide-react";

const STATUSES: CateringStatus[] = ["NEW", "CONTACTED", "QUOTED", "CONFIRMED", "COMPLETED", "ARCHIVED"];

export function CateringStatusUpdater({
  requestId,
  currentStatus,
  adminNotes,
}: {
  requestId: string;
  currentStatus: CateringStatus;
  adminNotes?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<CateringStatus>(currentStatus);
  const [notes, setNotes] = useState(adminNotes ?? "");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const save = () => {
    startTransition(async () => {
      await Promise.all([
        status !== currentStatus ? updateCateringStatus(requestId, status) : Promise.resolve(),
        notes !== (adminNotes ?? "") ? updateCateringNotes(requestId, notes) : Promise.resolve(),
      ]);
      toast.success("Catering request updated");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
      <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Admin Actions</h2>

      <div>
        <label htmlFor="catering-status" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Status</label>
        <select
          id="catering-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as CateringStatus)}
          className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="catering-notes" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Admin Notes</label>
        <textarea
          id="catering-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Internal notes, quoted price, follow-up actions…"
          className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors resize-none"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      <button
        onClick={save}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {isPending ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
