import type { Product } from "@/types/product";
import type { Review } from "@/data/reviews";
import { RatingStars } from "@/components/shared/rating-stars";
import { ReviewCard } from "@/components/product/review-card";

interface ReviewsSectionProps {
  product: Product;
  reviews: Review[];
}

export function ReviewsSection({ product, reviews }: ReviewsSectionProps) {
  return (
    <div id="reviews" className="scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <span className="font-serif text-3xl text-noble-black">{product.rating.toFixed(1)}</span>
        <div>
          <RatingStars rating={product.rating} />
          <p className="mt-1 text-xs text-noble-grey">Based on {product.reviewCount} reviews</p>
        </div>
      </div>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-noble-grey">No written reviews yet for this piece.</p>
      )}
    </div>
  );
}
