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
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <WhyChooseNoble />
      <BestSellers />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
