"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tags, ShoppingCart, Settings, LogOut } from "lucide-react";

import { logoutAction } from "@/lib/actions/auth-actions";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

/**
 * Deliberately denser than the storefront's spacious editorial layout —
 * this is a tool for getting work done quickly, not a selling surface.
 * Same black/gold/ivory tokens for brand recognition, different layout
 * conventions. See ARCHITECTURE.md Section 6 (admin architecture doc).
 */
export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-noble-line bg-noble-white">
      <div className="border-b border-noble-line px-5 py-4">
        <Link href="/admin" className="font-serif text-lg tracking-tight text-noble-black">
          NOBLE
        </Link>
        <p className="text-[11px] uppercase tracking-[0.1em] text-noble-grey">Admin</p>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {links.map((link) => {
          const isActive = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm transition-colors",
                isActive ? "bg-noble-black text-noble-white" : "text-noble-black hover:bg-noble-ivory"
              )}
            >
              <link.icon className="h-4 w-4" strokeWidth={1.75} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction} className="border-t border-noble-line p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-noble-grey transition-colors hover:bg-noble-ivory hover:text-noble-error"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.75} />
          Sign Out
        </button>
      </form>
    </aside>
  );
}
