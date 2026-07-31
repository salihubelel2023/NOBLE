"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { searchFaq } from "@/data/faq";
import { CTAButton } from "@/components/shared/cta-button";

/**
 * Single-open accordion behavior — expanding one question collapses
 * whichever was previously open, tracked as one `openId` string rather than
 * a set, since native <details> elements don't coordinate with each other
 * automatically. Search filters client-side against the small, fully
 * in-memory FAQ dataset. See wireframe notes on FAQ.
 */
export function FaqAccordion() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const groups = useMemo(() => searchFaq(query), [query]);
  const hasResults = groups.some((group) => group.items.length > 0);

  return (
    <div>
      <div className="relative mx-auto mb-14 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-noble-grey" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs..."
          aria-label="Search FAQs"
          className="h-12 w-full rounded-sm border border-noble-line bg-transparent pl-11 pr-4 text-sm placeholder:text-noble-grey focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      {!hasResults && (
        <p className="text-center text-noble-grey">No answers match &ldquo;{query}&rdquo; — try a different search, or reach out below.</p>
      )}

      <div className="flex flex-col gap-12">
        {groups.map((group) => (
          <div key={group.topic}>
            <h2 className="mb-4 text-[11px] uppercase tracking-[0.12em] text-noble-gold">{group.topic}</h2>
            <div className="flex flex-col">
              {group.items.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="border-b border-noble-line">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left text-noble-black"
                    >
                      <span className="font-medium">{item.question}</span>
                      <span className="shrink-0 text-noble-grey transition-transform" style={{ transform: isOpen ? "rotate(180deg)" : undefined }}>
                        ⌄
                      </span>
                    </button>
                    {isOpen && <p className="pb-4 text-sm leading-relaxed text-noble-grey">{item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 text-center">
        <p className="text-noble-grey">Still need help?</p>
        <CTAButton href="/contact" variant="outline">
          Contact Us
        </CTAButton>
      </div>
    </div>
  );
}
