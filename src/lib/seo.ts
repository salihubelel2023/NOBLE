import type { Metadata } from "next";

export const siteUrl = "https://noble.example.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NOBLE — Precision Timepieces & Modern Luxury",
    template: "%s | NOBLE",
  },
  description:
    "NOBLE crafts precision watches for people who don't need to say a word. Explore automatic, mechanical and quartz timepieces built to complete the way you show up.",
  keywords: [
    "luxury watches",
    "affordable luxury watches",
    "automatic watches",
    "mechanical watches",
    "NOBLE",
  ],
  openGraph: {
    type: "website",
    siteName: "NOBLE",
    title: "NOBLE — Precision Timepieces & Modern Luxury",
    description:
      "Precision watches for people who don't need to say a word. Discover the NOBLE collection.",
    url: siteUrl,
    images: [
      {
        url: "https://placehold.co/1200x630/0B0B0C/FAFAF8?text=NOBLE",
        width: 1200,
        height: 630,
        alt: "NOBLE — Precision Timepieces",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOBLE — Precision Timepieces & Modern Luxury",
    description: "Precision watches for people who don't need to say a word.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Builds page-level metadata that inherits the site defaults instead of
 * repeating OpenGraph/Twitter boilerplate on every route.
 */
export function buildMetadata(overrides: Metadata): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
    },
  };
}
