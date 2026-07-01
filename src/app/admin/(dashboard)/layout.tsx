import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const userName = session.user.name ?? session.user.email ?? "Admin";

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      <Toaster position="top-right" richColors closeButton />
      <Sidebar userName={userName} userRole="Administrator" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar userName={userName} title="Dashboard" />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
