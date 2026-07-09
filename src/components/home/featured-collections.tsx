import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

interface Collection {
  slug: string;
  name: string;
  description: string;
  bg: string;
  fg: string;
}

const collections: Collection[] = [
  { slug: "affordable", name: "Affordable", description: "Everyday elegance, without the premium price.", bg: "F3F1EC", fg: "0B0B0C" },
  { slug: "luxury", name: "Luxury", description: "Statement pieces for those who've arrived.", bg: "0B0B0C", fg: "B8935A" },
  { slug: "mechanical", name: "Mechanical", description: "Engineering you can feel ticking.", bg: "1C1C1E", fg: "FAFAF8" },
  { slug: "classic", name: "Classic", description: "Timeless design that never dates.", bg: "8C6D3F", fg: "FAFAF8" },
  { slug: "minimal", name: "Minimal", description: "Less on the wrist, more of you.", bg: "E5E3DD", fg: "0B0B0C" },
];

/**
 * "Shop by Character," not "Shop by Category" — reframes what's really a
 * price/mechanism filter as an identity choice, reinforcing the brand
 * promise instead of reading as inventory housekeeping.
 *
 * Horizontal scroll-snap row on all breakpoints (rather than a hard grid
 * that switches to carousel only below a size), which keeps the card sizing
 * consistent and always leaves a peek of the next card so it never reads
 * as a dead end.
 */
export function FeaturedCollections() {
  return (
    <section className="bg-noble-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Shop by Character" title="Every wrist tells a different story." className="mb-12" />
        </FadeIn>

        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 scrollbar-none lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
          {collections.map((collection, index) => (
            <FadeIn key={collection.slug} delay={index * 0.06} className="w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
              <Link href={`/catalog/watches?style=${collection.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={`https://placehold.co/500x667/${collection.bg}/${collection.fg}?text=${collection.name}`}
                    alt={`${collection.name} watch collection`}
                    fill
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noble-black/70 to-transparent p-5">
                    <p className="font-serif text-xl text-noble-white">{collection.name}</p>
                    <p className="mt-1 text-xs text-white/70">{collection.description}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
