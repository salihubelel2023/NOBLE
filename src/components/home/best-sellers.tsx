import { getBestSellers } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * Reuses ProductCard exactly as it will appear in Catalog — same hover
 * crossfade, same wishlist toggle, same price formatting. No bespoke
 * "homepage card" component exists, because it shouldn't need to.
 */
export async function BestSellers() {
  const bestSellers = await getBestSellers(8);

  return (
    <section className="bg-noble-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Most Wanted" title="Best Sellers" ctaLabel="View Full Collection" ctaHref="/catalog/watches" className="mb-12" />
        </FadeIn>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
          {bestSellers.map((product, index) => (
            <FadeIn key={product.id} delay={(index % 4) * 0.05}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
