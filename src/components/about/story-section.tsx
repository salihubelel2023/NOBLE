import Image from "next/image";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";

interface StorySectionProps {
  eyebrow: string;
  title: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
}

/**
 * Alternating image/text ("zig-zag") layout creates visual rhythm across a
 * long-form page rather than a monotonous single-column wall of paragraphs.
 * Mobile always resolves image-first, then text, regardless of which side
 * the image sits on at desktop — the photo sets the emotional register
 * before the copy explains it. See wireframe notes on About.
 */
export function StorySection({ eyebrow, title, body, imageUrl, imageAlt, reverse = false }: StorySectionProps) {
  return (
    <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <FadeIn className={cn("relative aspect-[4/5] w-full overflow-hidden", reverse && "md:order-2")}>
        <Image src={imageUrl} alt={imageAlt} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
      </FadeIn>
      <FadeIn delay={0.1} className={cn(reverse && "md:order-1")}>
        <span className="text-[11px] uppercase tracking-[0.12em] text-noble-gold">{eyebrow}</span>
        <h2 className="mt-4 font-serif text-3xl tracking-tight text-noble-black md:text-4xl">{title}</h2>
        <p className="mt-5 text-base leading-relaxed text-noble-grey">{body}</p>
      </FadeIn>
    </div>
  );
}
