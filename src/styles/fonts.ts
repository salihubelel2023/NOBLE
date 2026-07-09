import { Fraunces, Inter } from "next/font/google";

/**
 * Self-hosted, variable fonts via next/font — eliminates a render-blocking
 * round trip to an external font CDN and prevents layout shift (CLS), both
 * of which directly protect the "fast loading" requirement. See
 * /ARCHITECTURE.md Section 8.
 *
 * Fraunces and Inter are the freely-licensed Google Fonts stand-ins for the
 * "Canela-style serif" / "Neue Montreal" pairing named in the design system
 * — same editorial-serif-plus-precise-sans role, without a commercial
 * license requirement.
 */
export const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
