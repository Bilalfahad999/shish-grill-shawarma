import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Profile</h1>
        <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Manage your admin account</p>
      </div>

      {/* Info card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#B54E32]/15 flex items-center justify-center text-[#B54E32] text-xl font-semibold shrink-0" style={{ fontFamily: "var(--font-inter)" }}>
          {(session.user.name ?? session.user.email ?? "A").charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>{session.user.name ?? "Admin"}</p>
          <p className="text-sm text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>{session.user.email}</p>
          <p className="text-xs text-[#B54E32] font-medium mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Administrator</p>
        </div>
      </div>

      <ProfileForm currentName={session.user.name ?? ""} />
    </div>
  );
}
