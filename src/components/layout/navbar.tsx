import Link from "next/link";

import { secondaryNavLinks } from "@/lib/constants";
import type { Category } from "@/types/category";
import type { SiteSettings } from "@/data/site-settings";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { WishlistNavIcon, CartNavIcon } from "@/components/layout/nav-icons";
import { MobileMenu } from "@/components/layout/mobile-menu";

interface NavbarProps {
  categories: Category[];
  settings: SiteSettings;
}

/**
 * Server Component shell. The only client code inside it is the handful of
 * small islands imported above (search, wishlist/cart badges, mobile menu) —
 * the nav chrome itself ships zero JS beyond those. See /ARCHITECTURE.md
 * Section 3.
 *
 * Receives categories + settings as props rather than fetching them itself
 * — (site)/layout.tsx fetches both once and passes them to Navbar, Footer,
 * and WhatsAppFloatButton, so a single request only queries the database
 * once instead of three times.
 */
export function Navbar({ categories, settings }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-noble-line bg-noble-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <MobileMenu categories={categories} whatsappNumber={settings.whatsappNumber} phone={settings.phone} />
          <Link href="/" className="font-serif text-xl tracking-tight text-noble-black lg:text-2xl">
            NOBLE
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/catalog/${category.slug}`}
                className="text-sm text-noble-black transition-colors hover:text-noble-gold"
              >
                {category.name}
              </Link>
            ))}
            {secondaryNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-noble-black transition-colors hover:text-noble-gold">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <SearchOverlay />
          <WishlistNavIcon />
          <CartNavIcon />
        </div>
      </div>
    </header>
  );
}
