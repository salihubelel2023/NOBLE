import Image from "next/image";
import { Instagram } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";

const tiles = Array.from({ length: 8 }).map((_, i) => ({
  id: `insta-${i + 1}`,
  url: `https://placehold.co/400x400/${i % 2 === 0 ? "0B0B0C" : "F3F1EC"}/${i % 2 === 0 ? "B8935A" : "0B0B0C"}?text=NOBLE`,
}));

interface InstagramGalleryProps {
  instagramUrl: string;
}

/**
 * Link-outs only, no embedded feed script — a live Instagram embed pulls in
 * third-party JS that's a common, avoidable source of slow page loads.
 * Stays a Server Component: the hover reveal is pure CSS opacity, no client
 * JS needed. Receives instagramUrl as a prop — the Home page fetches site
 * settings once and passes it down, rather than this component querying
 * the database itself.
 */
export function InstagramGallery({ instagramUrl }: InstagramGalleryProps) {
  return (
    <section className="bg-noble-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-10 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.12em] text-noble-gold">@noble</span>
            <h2 className="mt-2 font-serif text-2xl tracking-tight text-noble-black md:text-3xl">Follow Along</h2>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-sm text-noble-black transition-colors hover:text-noble-gold sm:flex"
          >
            <Instagram className="h-4 w-4" />
            Follow
          </a>
        </FadeIn>

        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {tiles.map((tile) => (
            <a
              key={tile.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <Image src={tile.url} alt="NOBLE on Instagram" fill sizes="(min-width: 768px) 12vw, 25vw" className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-noble-black/0 transition-colors duration-300 group-hover:bg-noble-black/50">
                <Instagram className="h-6 w-6 text-noble-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
