import type { Metadata } from "next";
import Image from "next/image";
import { Gem, ShieldCheck, Sparkles, Unlock } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { CTAButton } from "@/components/shared/cta-button";
import { FadeIn } from "@/components/motion/fade-in";
import { StorySection } from "@/components/about/story-section";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "NOBLE exists so you can become the version of yourself people remember. Our story, our craft, our values.",
});

const values = [
  { icon: Gem, label: "Quality", description: "Every piece earns its place before it ships." },
  { icon: ShieldCheck, label: "Trust", description: "What we say about a watch is what you get." },
  { icon: Sparkles, label: "Confidence", description: "Presence, not just accessories." },
  { icon: Unlock, label: "Access", description: "Premium shouldn't mean unreachable." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-noble-black text-noble-white">
        <Image
          src="https://placehold.co/1600x900/0B0B0C/1C1C1E?text=NOBLE"
          alt="NOBLE workshop, dark and quiet"
          fill
          priority
          className="object-cover opacity-60"
        />
        <FadeIn className="relative mx-auto max-w-2xl px-6 text-center">
          <p className="font-serif text-2xl italic leading-snug tracking-tight md:text-4xl">
            &ldquo;NOBLE exists so that the world sees you the way you already see yourself.&rdquo;
          </p>
        </FadeIn>
      </section>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <StorySection
          eyebrow="Our Story"
          title="Built on a simple observation"
          body="People don't buy watches for the time. They buy them for the moment someone else notices. NOBLE started with that observation and a refusal to accept that premium presence had to mean an unreasonable price, so we set out to build pieces with genuine weight, genuine detail, and a price that a growing career could actually stretch to."
          imageUrl="https://placehold.co/700x875/F3F1EC/0B0B0C?text=Our+Story"
          imageAlt="NOBLE founding story imagery"
        />
        <StorySection
          eyebrow="Our Craft & Sourcing"
          title="Every component earns its place"
          body="We work with verified manufacturing partners and inspect every movement, case, and strap before it's approved to carry the NOBLE name. Nothing ships because it's cheap to source, it ships because it passed. That standard doesn't change whether a piece costs $300 or $3,000."
          imageUrl="https://placehold.co/700x875/1C1C1E/B8935A?text=Our+Craft"
          imageAlt="NOBLE craftsmanship and sourcing imagery"
          reverse
        />
      </div>

      <section className="bg-noble-ivory py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <FadeIn className="mb-14 text-center">
            <span className="text-[11px] uppercase tracking-[0.12em] text-noble-gold">What We Stand On</span>
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-noble-black md:text-4xl">Our Values</h2>
          </FadeIn>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {values.map((value, index) => (
              <FadeIn key={value.label} delay={index * 0.06} className="flex flex-col items-center gap-3 text-center">
                <value.icon className="h-7 w-7 text-noble-gold" strokeWidth={1.5} />
                <p className="font-medium text-noble-black">{value.label}</p>
                <p className="text-sm text-noble-grey">{value.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 py-20 text-center md:py-28">
        <h2 className="font-serif text-2xl tracking-tight text-noble-black md:text-3xl">
          See what we mean, in person.
        </h2>
        <CTAButton href="/catalog/watches" variant="solid" size="lg">
          Explore the Collection
        </CTAButton>
      </section>
    </div>
  );
}
