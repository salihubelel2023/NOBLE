import type { Metadata } from "next";
import { MessageCircle, Phone, Mail, Instagram, Facebook } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Reach NOBLE via WhatsApp, phone, email, or the contact form. We reply within one business day.",
});

const quickContacts = [
  {
    href: `https://wa.me/${siteConfig.whatsappNumber}`,
    icon: MessageCircle,
    label: "WhatsApp Us",
    external: true,
  },
  { href: siteConfig.phoneHref, icon: Phone, label: siteConfig.phone, external: false },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: siteConfig.email, external: false },
];

/**
 * Quick Contact moves above the form on mobile (in source order here, since
 * that's simplest and correct for both breakpoints) — most mobile visitors
 * on a contact page want the fastest path, a tap to open WhatsApp or dial a
 * number, not to type a full message on a phone keyboard. WhatsApp is
 * listed first per the brief's explicit "WhatsApp Order button" requirement.
 * Every quick-contact action carries a visible label next to its icon,
 * never icon-only, given the target age range spans 18 to 70. See
 * wireframe notes on Contact.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="mb-14 text-center">
        <span className="text-[11px] uppercase tracking-[0.12em] text-noble-gold">Get in Touch</span>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-noble-black md:text-5xl">Let&apos;s Talk</h1>
      </div>

      <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <div className="flex flex-col gap-3">
            {quickContacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 rounded-sm border border-noble-line px-5 py-4 text-noble-black transition-colors hover:border-noble-black"
              >
                <contact.icon className="h-5 w-5 shrink-0 text-noble-gold" strokeWidth={1.5} />
                <span className="text-sm">{contact.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5 border-t border-noble-line pt-6">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="NOBLE on Instagram" className="text-noble-black transition-colors hover:text-noble-gold">
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="NOBLE on Facebook" className="text-noble-black transition-colors hover:text-noble-gold">
              <Facebook className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="order-2 lg:order-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
