import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloatButton } from "@/components/shared/whatsapp-float-button";

/**
 * Every standard-chrome page (Home, Catalog, Product, About, Contact, FAQ,
 * Policies, Wishlist, Account) lives inside this route group and shares
 * this persistent Navbar + Footer + WhatsApp button. Checkout deliberately
 * sits outside this group with its own minimal layout — see
 * /ARCHITECTURE.md Section 1.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}
