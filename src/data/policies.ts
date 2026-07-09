export interface PolicySection {
  heading: string;
  body: string[];
}

export interface Policy {
  slug: "shipping" | "returns" | "privacy" | "terms";
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}

/**
 * Template content — solid enough to review real UX/layout against, but
 * NOBLE's legal counsel should review and finalize the actual wording
 * before launch, particularly for Privacy and Terms.
 */
export const policies: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping Policy",
    lastUpdated: "July 1, 2026",
    sections: [
      {
        heading: "Processing Time",
        body: [
          "Orders are inspected and dispatched within 24-48 hours of confirmation, Monday through Saturday. Orders placed after 3pm are processed the following business day.",
        ],
      },
      {
        heading: "Delivery Estimates",
        body: [
          "Standard nationwide delivery takes 3-5 business days from dispatch. Same-day and next-day delivery is available in select cities at checkout.",
          "Selected international destinations are available at checkout with estimated delivery of 7-14 business days.",
        ],
      },
      {
        heading: "Tracking",
        body: ["A tracking link is emailed automatically the moment your order leaves our facility. You can also request a manual status update any time via WhatsApp or email."],
      },
      {
        heading: "Shipping Costs",
        body: ["Standard shipping is complimentary on all orders. Expedited and international shipping costs are calculated at checkout before payment."],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns & Warranty",
    lastUpdated: "July 1, 2026",
    sections: [
      {
        heading: "Return Window",
        body: ["You may return any unworn piece in its original packaging, with all tags and certificates included, within 14 days of delivery for a full refund."],
      },
      {
        heading: "How to Start a Return",
        body: ["Contact our support team via WhatsApp, email, or the contact form with your order number. We'll provide a return authorization and pickup or drop-off instructions."],
      },
      {
        heading: "Refunds",
        body: ["Approved refunds are issued to your original payment method within 5-7 business days of us receiving the returned item."],
      },
      {
        heading: "Warranty",
        body: [
          "Every NOBLE watch includes a 1-year manufacturer warranty covering movement defects under normal use.",
          "Straps, batteries, and damage from misuse, water exposure beyond the stated rating, or unauthorized repair are not covered.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    lastUpdated: "July 1, 2026",
    sections: [
      {
        heading: "Information We Collect",
        body: ["We collect the information you provide directly, such as your name, email, shipping address, and payment details, along with basic usage data to improve the site."],
      },
      {
        heading: "How We Use Your Information",
        body: ["To process orders, provide customer support, send order updates, and — only with your consent — send marketing communications you can unsubscribe from at any time."],
      },
      {
        heading: "Data Sharing",
        body: ["We share information only with the payment processors, shipping carriers, and service providers required to fulfill your order. We do not sell personal data to third parties."],
      },
      {
        heading: "Your Rights",
        body: ["You may request access to, correction of, or deletion of your personal data at any time by contacting our support team."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    lastUpdated: "July 1, 2026",
    sections: [
      {
        heading: "Acceptance of Terms",
        body: ["By using this website or placing an order, you agree to these Terms of Service and our Privacy Policy."],
      },
      {
        heading: "Product Information",
        body: ["We make every effort to display product colors, materials, and details accurately. Minor variations between photography and the physical piece may occur."],
      },
      {
        heading: "Pricing & Payment",
        body: ["All prices are listed in the currency shown at checkout and are subject to change without notice until an order is confirmed and paid."],
      },
      {
        heading: "Limitation of Liability",
        body: ["NOBLE is not liable for indirect or consequential damages arising from the use of our products or website, to the fullest extent permitted by law."],
      },
    ],
  },
];

export function getPolicyBySlug(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}
