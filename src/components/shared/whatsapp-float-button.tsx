"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface WhatsAppFloatButtonProps {
  whatsappNumber: string;
}

/**
 * Global WhatsApp order entry point, mounted once in the (site) layout.
 * Fades in only after the visitor scrolls past the hero — appearing over
 * the hero image from first paint would compete with the primary CTA and
 * read as spammy. See wireframe notes on global chrome.
 *
 * Receives whatsappNumber as a prop now (fetched once in the layout via
 * getSiteSettings()) rather than importing a static siteConfig constant —
 * this is a Client Component and can't query the database itself.
 */
export function WhatsAppFloatButton({ whatsappNumber }: WhatsAppFloatButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NOBLE on WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <MessageCircle className="h-6 w-6" fill="white" />
    </a>
  );
}
