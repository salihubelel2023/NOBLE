import { prisma } from "@/lib/db";

export interface SiteSettings {
  whatsappNumber: string;
  phone: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  tagline: string;
}

const FALLBACK_SETTINGS: SiteSettings = {
  whatsappNumber: "2349132376668",
  phone: "09160578363",
  email: "salihubelel2023@gmail.com",
  instagramUrl: "https://instagram.com/msalihubelel",
  facebookUrl: "https://facebook.com/NobleWatches",
  tagline: "Noble watches, Move Noble",
};

/**
 * Replaces the old static `siteConfig` export from lib/constants.ts.
 * WhatsApp number, phone, email, and social links are now editable from
 * /admin/settings — this is what the storefront reads at request time.
 * Falls back to sensible placeholders if the singleton row hasn't been
 * seeded yet, so the site never crashes on a missing settings row.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  if (!settings) return FALLBACK_SETTINGS;
  return {
    whatsappNumber: settings.whatsappNumber,
    phone: settings.phone,
    email: settings.email,
    instagramUrl: settings.instagramUrl,
    facebookUrl: settings.facebookUrl,
    tagline: settings.tagline,
  };
}
