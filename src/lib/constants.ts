/**
 * Static navigation link lists — these stay hardcoded (not admin-editable)
 * per the v1 scope: they change rarely and aren't part of "Products,
 * Categories, Site Settings, Orders." Business contact details
 * (WhatsApp/phone/email/socials) moved to @/data/site-settings, which is
 * now database-backed and editable from /admin/settings.
 */
export const secondaryNavLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  shop: [
    { label: "Watches", href: "/catalog/watches" },
    { label: "Best Sellers", href: "/catalog/watches?sort=best-sellers" },
    { label: "New Arrivals", href: "/catalog/watches?sort=newest" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/policies/shipping" },
    { label: "Returns", href: "/policies/returns" },
    { label: "Privacy", href: "/policies/privacy" },
    { label: "Terms", href: "/policies/terms" },
  ],
};
