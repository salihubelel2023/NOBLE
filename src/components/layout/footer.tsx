import Link from "next/link";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

import { footerLinks } from "@/lib/constants";
import { toPhoneHref } from "@/lib/utils";
import type { SiteSettings } from "@/data/site-settings";
import { NewsletterForm } from "@/components/shared/newsletter-form";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <details className="group border-b border-white/10 py-4 md:border-none md:py-0" open>
      <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] uppercase tracking-[0.12em] text-white/50 md:cursor-default md:pointer-events-none">
        {title}
      </summary>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-noble-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

interface FooterProps {
  settings: SiteSettings;
}

/** Receives settings as a prop — fetched once in (site)/layout.tsx via getSiteSettings(). */
export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-noble-black text-noble-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] md:gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-serif text-2xl tracking-tight">NOBLE</span>
            <p className="max-w-xs text-sm text-white/60">{settings.tagline}</p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NOBLE on Instagram"
                className="text-white/70 transition-colors hover:text-noble-gold"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NOBLE on Facebook"
                className="text-white/70 transition-colors hover:text-noble-gold"
              >
                <Facebook className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <FooterColumn title="Shop" links={footerLinks.shop} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Support" links={footerLinks.support} />

          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.12em] text-white/50">Stay Informed</span>
            <p className="text-sm text-white/60">Early access. New arrivals first.</p>
            <NewsletterForm variant="dark" />
            <div className="flex flex-col gap-2 pt-2 text-sm text-white/60">
              <a href={toPhoneHref(settings.phone)} className="flex items-center gap-2 hover:text-noble-gold">
                <Phone className="h-4 w-4" /> {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-noble-gold">
                <Mail className="h-4 w-4" /> {settings.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>&copy; {new Date().getFullYear()} NOBLE. All rights reserved.</p>
          <p>Precision. Presence. Noble.</p>
        </div>
      </div>
    </footer>
  );
}
