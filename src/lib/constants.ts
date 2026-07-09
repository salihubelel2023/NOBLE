/**
 * Site-wide business configuration. Placeholder contact details are marked
 * TODO — swap for NOBLE's real numbers/handles before launch.
 */
export const siteConfig = {
  name: "NOBLE",
  tagline: "The art of timeless presence.",
  description: "Precision watches for people who don't need to say a word.",
  // TODO: replace with NOBLE's real WhatsApp Business number (digits only, country code first)
  whatsappNumber: "2348000000000",
  // TODO: replace with NOBLE's real support line
  phone: "+234 800 000 0000",
  phoneHref: "tel:+2348000000000",
  // TODO: replace with NOBLE's real support inbox
  email: "care@noble.example.com",
  social: {
    instagram: "https://instagram.com/noble",
    facebook: "https://facebook.com/noble",
  },
};

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
