import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}

export function RatingStars({ rating, count, size = "md", className }: RatingStarsProps) {
  const dimension = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label={`Rated ${rating} out of 5${count ? ` from ${count} reviews` : ""}`}
    >
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(dimension, i < Math.round(rating) ? "fill-noble-gold text-noble-gold" : "fill-none text-noble-line")}
          />
        ))}
      </div>
      {count !== undefined && <span className="text-xs text-noble-grey">({count})</span>}
    </div>
  );
}
