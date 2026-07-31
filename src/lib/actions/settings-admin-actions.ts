"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

export interface SettingsFormState {
  error?: string;
  success?: boolean;
}

/** Updates the single SiteSettings row — replaces hand-editing lib/constants.ts. */
export async function updateSiteSettingsAction(_prevState: SettingsFormState, formData: FormData): Promise<SettingsFormState> {
  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const instagramUrl = String(formData.get("instagramUrl") ?? "").trim();
  const facebookUrl = String(formData.get("facebookUrl") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();

  if (!whatsappNumber || !phone || !email) {
    return { error: "WhatsApp number, phone, and email are required." };
  }

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: { whatsappNumber, phone, email, instagramUrl, facebookUrl, tagline },
    create: { id: "singleton", whatsappNumber, phone, email, instagramUrl, facebookUrl, tagline },
  });

  // Revalidate every page that reads settings — Footer, Navbar/MobileMenu,
  // WhatsAppFloatButton, and Contact all pull from this on every route.
  revalidatePath("/", "layout");

  return { success: true };
}
