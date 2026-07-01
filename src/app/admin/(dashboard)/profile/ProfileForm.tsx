"use client";

import { useState, useTransition } from "react";
import { Loader2, Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function ProfileForm({ currentName }: { currentName: string }) {
  const [name, setName] = useState(currentName);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputCls = "w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPw && newPw !== confirmPw) {
      setError("New passwords do not match.");
      return;
    }
    startTransition(async () => {
      // TODO: implement updateProfile server action
      await new Promise((r) => setTimeout(r, 500));
      toast.success("Profile updated");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }} role="alert">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Display Name</h2>
        <div>
          <label htmlFor="profile-name" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Name</label>
          <input id="profile-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} placeholder="Your name" autoComplete="name" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Change Password</h2>
        <div>
          <label htmlFor="profile-current-pw" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Current Password</label>
          <div className="relative">
            <input id="profile-current-pw" type={showPw ? "text" : "password"} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} className={`${inputCls} pr-10`} style={{ fontFamily: "var(--font-inter)" }} autoComplete="current-password" />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
              aria-label={showPw ? "Hide passwords" : "Show passwords"}
            >
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="profile-new-pw" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>New Password</label>
          <input id="profile-new-pw" type={showPw ? "text" : "password"} value={newPw} onChange={(e) => setNewPw(e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} autoComplete="new-password" />
        </div>
        <div>
          <label htmlFor="profile-confirm-pw" className="block text-xs font-medium text-neutral-500 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Confirm New Password</label>
          <input id="profile-confirm-pw" type={showPw ? "text" : "password"} value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className={inputCls} style={{ fontFamily: "var(--font-inter)" }} autoComplete="new-password" />
        </div>
      </div>

      <button type="submit" disabled={isPending} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50" style={{ fontFamily: "var(--font-inter)" }}>
        {isPending ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </form>
  );
}
