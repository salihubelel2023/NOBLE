import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { policies } from "@/data/policies";

/**
 * Queries the data layer directly rather than a hardcoded URL list, so
 * every new product or category is included automatically on the next
 * build — no manual sitemap upkeep. See /ARCHITECTURE.md Section 10.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/catalog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/faq`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/catalog/${category.slug}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const policyRoutes: MetadataRoute.Sitemap = policies.map((policy) => ({
    url: `${siteUrl}/policies/${policy.slug}`,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...policyRoutes];
}
