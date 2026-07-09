"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, Phone } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { secondaryNavLinks, siteConfig } from "@/lib/constants";

/**
 * A full-height drawer, not a dropdown — a dropdown gets cramped once
 * category links, company links, and quick-contact actions are all
 * present, and a drawer scales gracefully as more categories launch later.
 *
 * Category links are mapped from `@/data/categories`, not hardcoded — the
 * day "Bags" ships, it appears here automatically. See /ARCHITECTURE.md
 * Section 11.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader>
          <SheetTitle>NOBLE</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
          <span className="mb-1 mt-2 text-[11px] uppercase tracking-[0.12em] text-noble-grey">Shop</span>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog/${category.slug}`}
              onClick={close}
              className="border-b border-noble-line py-3 text-base text-noble-black"
            >
              {category.name}
            </Link>
          ))}

          <span className="mb-1 mt-6 text-[11px] uppercase tracking-[0.12em] text-noble-grey">Company</span>
          {secondaryNavLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={close} className="border-b border-noble-line py-3 text-base text-noble-black">
              {link.label}
            </Link>
          ))}
          <Link href="/faq" onClick={close} className="border-b border-noble-line py-3 text-base text-noble-black">
            FAQ
          </Link>
        </nav>

        <div className="flex flex-col gap-2 border-t border-noble-line px-6 py-5">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-noble-black"
          >
            <MessageCircle className="h-4 w-4 text-noble-gold" />
            Order on WhatsApp
          </a>
          <a href={siteConfig.phoneHref} className="flex items-center gap-2 text-sm text-noble-black">
            <Phone className="h-4 w-4 text-noble-gold" />
            {siteConfig.phone}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
