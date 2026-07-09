"use client";

import { useRef, useState, type TouchEvent } from "react";
import Image from "next/image";

import type { ProductImage } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

/**
 * Stays pinned as the customer scrolls through description, specs, and
 * reviews (via the `lg:sticky` wrapper the page applies around this
 * component) — without it, scrolling down pushes the product photo
 * off-screen right when someone's deciding to buy. See wireframe notes.
 *
 * Client Component: thumbnail-click and swipe both need local state for
 * the active image index.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const active = images[activeIndex] ?? images[0];

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) setActiveIndex((i) => Math.min(images.length - 1, i + 1));
    else setActiveIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse sm:gap-4">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-noble-ivory"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={active.url}
          alt={active.alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 sm:hidden" aria-hidden="true">
          {images.map((image, index) => (
            <span
              key={image.id}
              className={cn("h-1.5 rounded-full transition-all", index === activeIndex ? "w-5 bg-noble-black" : "w-1.5 bg-noble-white/70")}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto sm:w-20 sm:shrink-0 sm:flex-col sm:overflow-visible">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show image ${index + 1} of ${productName}`}
            aria-current={index === activeIndex}
            className={cn(
              "relative aspect-[4/5] w-16 shrink-0 overflow-hidden border transition-colors sm:w-full",
              index === activeIndex ? "border-noble-black" : "border-noble-line"
            )}
          >
            <Image src={image.url} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
