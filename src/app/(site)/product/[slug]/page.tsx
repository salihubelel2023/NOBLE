import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { getReviewsForProduct } from "@/data/reviews";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductHeader } from "@/components/product/product-header";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductAccordionSection } from "@/components/product/product-accordion-section";
import { ReviewsSection } from "@/components/product/reviews-section";
import { RelatedProducts } from "@/components/product/related-products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-renders every known product slug at build time. See /ARCHITECTURE.md Section 2. */
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return buildMetadata({ title: "Product Not Found" });

  return buildMetadata({
    title: `${product.name} — ${product.brand}`,
    description: product.shortDescription,
    openGraph: {
      images: [{ url: product.images[0].url, width: 800, height: 1000, alt: product.images[0].alt }],
    },
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = await getCategoryBySlug(product.categorySlug);
  const relatedProducts = await getRelatedProducts(product, 4);
  // Reviews stay static mock data — deliberately out of v1 admin scope. See ARCHITECTURE.md.
  const productReviews = getReviewsForProduct(product.id);

  const availabilityMap: Record<string, string> = {
    "in-stock": "https://schema.org/InStock",
    "low-stock": "https://schema.org/LimitedAvailability",
    "out-of-stock": "https://schema.org/OutOfStock",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: product.brand },
    image: product.images.map((image) => image.url),
    sku: product.variants[0]?.sku,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/product/${product.slug}`,
      priceCurrency: product.currency,
      price: product.basePrice,
      availability: availabilityMap[product.status],
    },
    ...(product.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs
        items={[
          { label: "Catalog", href: "/catalog" },
          ...(category ? [{ label: category.name, href: `/catalog/${category.slug}` }] : []),
          { label: product.name },
        ]}
        className="mb-6"
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        <div className="flex flex-col gap-8">
          <ProductHeader product={product} />
          <ProductPurchasePanel product={product} />

          <div>
            <ProductAccordionSection title="Description">
              <p>{product.description}</p>
            </ProductAccordionSection>

            <ProductAccordionSection title="Specifications" defaultOpen>
              <dl className="grid grid-cols-2 gap-y-2">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt className="capitalize text-noble-grey">{key.replace(/([A-Z])/g, " $1").trim()}</dt>
                    <dd className="text-noble-black">{value}</dd>
                  </div>
                ))}
              </dl>
            </ProductAccordionSection>

            <ProductAccordionSection title="Shipping & Returns">
              <p>
                Ships within 24–48h nationwide. 14-day returns on unworn pieces in original packaging — see our{" "}
                <a href="/policies/returns" className="underline underline-offset-2 hover:text-noble-black">
                  Returns Policy
                </a>{" "}
                for full details.
              </p>
            </ProductAccordionSection>

            <ProductAccordionSection title={`Reviews (${product.reviewCount})`}>
              <ReviewsSection product={product} reviews={productReviews} />
            </ProductAccordionSection>
          </div>
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
