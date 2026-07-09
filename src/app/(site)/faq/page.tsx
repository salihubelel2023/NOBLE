import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { faqGroups } from "@/data/faq";
import { FaqAccordion } from "@/components/faq/faq-accordion";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description: "Answers to common questions about NOBLE orders, shipping, authenticity, returns, and payments.",
});

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    ),
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-12 text-center">
        <span className="text-[11px] uppercase tracking-[0.12em] text-noble-gold">Support</span>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-noble-black md:text-5xl">Frequently Asked Questions</h1>
      </div>
      <FaqAccordion />
    </div>
  );
}
