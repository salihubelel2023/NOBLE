import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

/**
 * The authoritative auth check. middleware.ts only verifies a session
 * cookie is *present* (Edge-compatible, no database access) — this layout
 * runs in the Node.js runtime on every request to a protected admin page
 * and actually validates the session against the database, redirecting to
 * login if it's missing, expired, or was revoked. See ADMIN_SETUP.md for
 * the full two-layer explanation.
 */
export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-noble-ivory">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden p-6 lg:p-10">{children}</main>
    </div>
  );
}
