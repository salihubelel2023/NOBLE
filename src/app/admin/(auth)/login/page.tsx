import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login | NOBLE",
  robots: { index: false, follow: false },
};

/**
 * The one public admin route — deliberately outside the (protected) group
 * so the authoritative session check in (protected)/layout.tsx never
 * gates this page (that would create a redirect loop). See
 * ADMIN_SETUP.md.
 */
export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-noble-ivory px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <div className="text-center">
          <span className="font-serif text-2xl tracking-tight text-noble-black">NOBLE</span>
          <p className="mt-1 text-sm text-noble-grey">Admin</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
