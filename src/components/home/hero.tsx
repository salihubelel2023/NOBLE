import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CTAButton } from "@/components/shared/cta-button";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * 90vh, not 100vh — a full-height hero traps the visitor with no hint that
 * anything exists below it. The deliberate sliver of the next section
 * peeking into view functions as a silent scroll invitation.
 *
 * Two CTAs, unequal weight: "Shop Watches" is solid and transactional, for
 * a visitor who already knows what they want. "Explore Collections" is a
 * plain text link, for a visitor still browsing — deliberately NOT run
 * through CTAButton, since it isn't one of the two approved button
 * variants, just a lighter-weight affordance.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-noble-black text-noble-white">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8 lg:py-0">
        <FadeIn className="order-2 flex flex-col gap-6 lg:order-1">
          <span className="text-[11px] uppercase tracking-[0.12em] text-noble-gold">Precision Timepieces</span>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            The Art of Timeless Presence
          </h1>
          <p className="max-w-md text-base text-white/70 md:text-lg">
            Watches engineered for people who don&apos;t need to say a word.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-8">
            <CTAButton href="/catalog/watches" variant="solid" size="lg" className="bg-noble-white text-noble-black hover:bg-noble-white/90">
              Shop Watches
            </CTAButton>
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-noble-white"
            >
              Explore Collections
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            <Image
              src="https://placehold.co/900x1125/0B0B0C/B8935A?text=NOBLE+Heritage+Chronograph"
              alt="NOBLE Heritage Chronograph on a dark backdrop"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
