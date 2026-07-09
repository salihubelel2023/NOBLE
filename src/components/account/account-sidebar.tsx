import Link from "next/link";
import { LayoutGrid, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";

const sections = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart, href: "/wishlist" },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
];

/**
 * Intentionally identical in structure to PolicyNav — reusing one
 * "interior page" convention across the site rather than inventing a new
 * layout for every settings-style page is itself a scalability decision,
 * not just visual consistency. See wireframe notes on Account.
 */
export function AccountSidebar() {
  return (
    <nav aria-label="Account" className="mb-8 lg:mb-0">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={section.href ?? `#${section.id}`}
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-noble-line px-4 py-2 text-sm text-noble-black transition-colors hover:border-noble-black lg:rounded-none lg:border-none lg:border-l-2 lg:border-l-transparent lg:px-4 lg:py-2 lg:text-noble-grey lg:hover:border-l-noble-black lg:hover:text-noble-black"
          >
            <section.icon className="h-4 w-4" strokeWidth={1.5} />
            {section.label}
          </Link>
        ))}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-noble-line px-4 py-2 text-sm text-noble-error transition-colors hover:border-noble-error lg:mt-4 lg:rounded-none lg:border-none lg:border-l-2 lg:border-l-transparent lg:px-4 lg:py-2"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sign Out
        </Link>
      </div>
    </nav>
  );
}
