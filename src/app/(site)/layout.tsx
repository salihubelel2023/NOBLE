import { getCategories } from "@/data/categories";
import { getSiteSettings } from "@/data/site-settings";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloatButton } from "@/components/shared/whatsapp-float-button";

/**
 * Every standard-chrome page (Home, Catalog, Product, About, Contact, FAQ,
 * Policies, Wishlist, Account) lives inside this route group and shares
 * this persistent Navbar + Footer + WhatsApp button. Checkout deliberately
 * sits outside this group with its own minimal layout — see
 * /ARCHITECTURE.md Section 1.
 *
 * Fetches categories + site settings ONCE here and passes them down —
 * Navbar, Footer, and WhatsAppFloatButton all need them, and this way a
 * single request queries the database once instead of three times.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [categories, settings] = await Promise.all([getCategories(), getSiteSettings()]);

  return (
    <>
      <Navbar categories={categories} settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
