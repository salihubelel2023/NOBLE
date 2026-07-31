import type { Metadata } from "next";

import "@/app/globals.css";
import { displayFont, bodyFont } from "@/styles/fonts";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = defaultMetadata;

/**
 * The TRUE root layout — html/body, fonts, and site-wide metadata only.
 * Global chrome (Navbar/Footer/WhatsApp) intentionally does NOT live here
 * anymore; it lives in `(site)/layout.tsx` instead, so `/checkout` (a
 * sibling of the `(site)` group, not a child of it) can render its own
 * stripped-down header without carrying the full nav. Route groups don't
 * affect URLs — `/about` is still `/about`. See /ARCHITECTURE.md Section 1.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
