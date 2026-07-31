import { getSiteSettings } from "@/data/site-settings";
import { Hero } from "@/components/home/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { WhyChooseNoble } from "@/components/home/why-choose-noble";
import { BestSellers } from "@/components/home/best-sellers";
import { Testimonials } from "@/components/home/testimonials";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { Newsletter } from "@/components/home/newsletter";

/**
 * Section order follows Attention (Hero) -> Interest (Collections) ->
 * Trust (Why Choose Noble, Testimonials, Instagram) -> Action (Best
 * Sellers, Newsletter). See wireframe notes: each section either earns the
 * next one or closes the loop.
 *
 * Async now: fetches site settings for InstagramGallery's follow link.
 * BestSellers is itself an async Server Component (fetches its own best
 * sellers internally) — Next.js renders nested async Server Components
 * natively, so it's used here exactly as before, with no await needed at
 * this level.
 */
export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <WhyChooseNoble />
      <BestSellers />
      <Testimonials />
      <InstagramGallery instagramUrl={settings.instagramUrl} />
      <Newsletter />
    </>
  );
}
