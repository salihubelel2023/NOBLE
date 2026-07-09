import { NewsletterForm } from "@/components/shared/newsletter-form";
import { FadeIn } from "@/components/motion/fade-in";

export function Newsletter() {
  return (
    <section className="bg-noble-charcoal py-24 text-noble-white md:py-28">
      <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.12em] text-noble-gold">The Inner Circle</span>
        <h2 className="font-serif text-3xl tracking-tight md:text-4xl">Join the Inner Circle</h2>
        <p className="text-white/60">Early access. New arrivals first. No noise.</p>
        <NewsletterForm variant="dark" className="mt-2 justify-center" />
      </FadeIn>
    </section>
  );
}
