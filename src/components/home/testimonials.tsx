"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { testimonials } from "@/data/testimonials";
import { RatingStars } from "@/components/shared/rating-stars";
import { cn } from "@/lib/utils";

/**
 * Manual navigation only — no autoplay. Autoplay that can't be paused is a
 * known accessibility failure (WCAG 2.2.2), and shipping without it at all
 * is the simplest way to satisfy that requirement rather than building
 * pause/resume-on-hover-and-focus edge cases. Native scroll-snap means
 * mobile swipe and keyboard scrolling both work for free.
 *
 * Client Component: needs the current-index state for the dot indicators
 * and the prev/next handlers — this one genuinely can't stay server-side.
 */
export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIndex(index);
  };

  const handlePrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const handleNext = () => scrollToIndex(Math.min(testimonials.length - 1, activeIndex + 1));

  return (
    <section aria-label="Customer testimonials" className="bg-noble-ivory py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-[11px] uppercase tracking-[0.12em] text-noble-gold">What People Say</span>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-noble-black md:text-4xl">Worn by Noble People</h2>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-2 scrollbar-none"
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="w-full shrink-0 snap-start bg-noble-white p-8 md:w-[calc(33.333%-1rem)]"
            >
              <RatingStars rating={testimonial.rating} />
              <p className="mt-4 font-serif text-lg leading-relaxed text-noble-black">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-6 text-sm text-noble-grey">
                {testimonial.name} <span className="text-noble-line">&middot;</span> {testimonial.location}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-noble-line text-noble-black transition-colors hover:border-noble-gold hover:text-noble-gold"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={cn("h-1.5 rounded-full transition-all", index === activeIndex ? "w-5 bg-noble-black" : "w-1.5 bg-noble-line")}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-noble-line text-noble-black transition-colors hover:border-noble-gold hover:text-noble-gold"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
