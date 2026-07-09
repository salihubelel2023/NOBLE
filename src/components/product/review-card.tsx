import type { Review } from "@/data/reviews";
import { RatingStars } from "@/components/shared/rating-stars";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border-b border-noble-line py-6 last:border-none">
      <div className="flex items-center justify-between">
        <RatingStars rating={review.rating} />
        <span className="text-xs text-noble-grey">{new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
      </div>
      <p className="mt-3 font-medium text-noble-black">{review.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-noble-grey">{review.body}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.08em] text-noble-grey">
        {review.author}
        {review.isVerifiedPurchase && <span className="ml-2 text-noble-gold">Verified Purchase</span>}
      </p>
    </article>
  );
}
