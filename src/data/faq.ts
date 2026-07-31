export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqGroup {
  topic: string;
  items: FaqItem[];
}

/**
 * Grouped by topic, not one flat list — a single ungrouped list of 20+
 * questions forces scanning through everything; topic headers let someone
 * skip straight to "Returns & Warranty" without reading "Orders & Shipping"
 * first. See wireframe notes on FAQ.
 */
export const faqGroups: FaqGroup[] = [
  {
    topic: "Orders & Shipping",
    items: [
      { id: "f1", question: "How long does delivery take?", answer: "Most orders dispatch within 24-48 hours and arrive within 3-5 business days nationwide. You'll receive tracking as soon as your order ships." },
      { id: "f2", question: "Do you ship internationally?", answer: "We currently ship within Nigeria with select international destinations available at checkout. If your country isn't listed, reach out on WhatsApp and we'll do our best to accommodate you." },
      { id: "f3", question: "Can I change or cancel my order after placing it?", answer: "Yes, as long as it hasn't been dispatched yet. Contact us as soon as possible via WhatsApp or email with your order number." },
      { id: "f4", question: "How do I track my order?", answer: "A tracking link is emailed the moment your order ships. You can also reach our support team any time for a manual update." },
    ],
  },
  {
    topic: "Product & Authenticity",
    items: [
      { id: "f5", question: "Are NOBLE watches genuine?", answer: "Every NOBLE piece is sourced from verified manufacturing partners and inspected before it ships. Each order includes a certificate of authenticity." },
      { id: "f6", question: "What's the difference between the Affordable and Luxury collections?", answer: "Materials, movement complexity, and finishing. Affordable pieces use quartz movements and durable alloys; Luxury pieces feature automatic or mechanical movements with premium metals and hand-finished detailing." },
      { id: "f7", question: "Are your watches water resistant?", answer: "Water resistance varies by model and is listed in each product's Specifications section - most range from everyday splash resistance to full 200m dive rating." },
      { id: "f8", question: "Do you offer engraving or personalization?", answer: "Not yet, but it's on our roadmap. Join the newsletter to hear when it launches." },
    ],
  },
  {
    topic: "Returns & Warranty",
    items: [
      { id: "f9", question: "What's your return policy?", answer: "14 days from delivery on unworn pieces in original packaging. See our full Returns Policy for step-by-step instructions." },
      { id: "f10", question: "Do NOBLE watches come with a warranty?", answer: "Yes - every piece includes a 1-year manufacturer warranty covering movement defects. Straps and batteries are excluded from warranty coverage." },
      { id: "f11", question: "My watch arrived with an issue. What do I do?", answer: "Contact us within 48 hours of delivery with photos and your order number, and we'll arrange a replacement or repair at no cost to you." },
    ],
  },
  {
    topic: "Payments & Security",
    items: [
      { id: "f12", question: "What payment methods do you accept?", answer: "Major cards, bank transfer, and pay-on-delivery in select areas. All online payments are processed through encrypted, PCI-compliant channels." },
      { id: "f13", question: "Is it safe to enter my card details on this site?", answer: "Yes - checkout is encrypted end-to-end and NOBLE never stores your full card number on our own servers." },
      { id: "f14", question: "Can I order via WhatsApp instead of the website?", answer: "Absolutely - tap the WhatsApp button anywhere on the site to place an order conversationally with our team." },
    ],
  },
];

export function searchFaq(query: string): FaqGroup[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return faqGroups;
  return faqGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => item.question.toLowerCase().includes(normalized) || item.answer.toLowerCase().includes(normalized)
      ),
    }))
    .filter((group) => group.items.length > 0);
}
