import type { Testimonial } from "@/types/testimonial";

/**
 * Placeholder testimonials per the brief. Each already carries a `verified`
 * flag set to false — the day real reviews replace these, flipping verified
 * purchases to `true` is enough to surface the "Verified Buyer" badge with
 * no component changes.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Amara O.",
    location: "Lagos, Nigeria",
    rating: 5,
    quote:
      "The Heritage Chronograph gets more compliments than watches I've paid triple for. It feels heavier, more considered, more mine.",
    verified: false,
  },
  {
    id: "t2",
    name: "Daniel K.",
    location: "London, UK",
    rating: 5,
    quote:
      "Ordered on a Tuesday, wearing it by Thursday. The packaging alone told me this wasn't going to be a disappointing unboxing.",
    verified: false,
  },
  {
    id: "t3",
    name: "Farida M.",
    location: "Dubai, UAE",
    rating: 5,
    quote:
      "I was skeptical an 'affordable' watch could look this good in person. The Aurora Quartz changed my mind within a day.",
    verified: false,
  },
  {
    id: "t4",
    name: "Tobenna E.",
    location: "Abuja, Nigeria",
    rating: 4,
    quote:
      "Sizing the bracelet was easier than I expected, and customer support answered my WhatsApp message in under an hour.",
    verified: false,
  },
  {
    id: "t5",
    name: "Priya S.",
    location: "New York, USA",
    rating: 5,
    quote:
      "NOBLE understands that a watch is the one accessory nobody has to ask about — it just registers. Mine has.",
    verified: false,
  },
  {
    id: "t6",
    name: "Kwame A.",
    location: "Accra, Ghana",
    rating: 5,
    quote:
      "The Solstice Mechanical's case-back window is the detail that sold me. Small thing, but it says a lot about the brand.",
    verified: false,
  },
];
