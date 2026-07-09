export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

/**
 * Stands in for the `Review` entity in /ARCHITECTURE.md Section 4.
 * `isVerifiedPurchase` is already the exact field name the real schema
 * uses — the day real reviews replace these, a "Verified Purchase" badge
 * appears with no component changes, just real data with that flag set.
 */
export const reviews: Review[] = [
  { id: "rev1", productId: "prod_heritage_chronograph", author: "Ibrahim S.", rating: 5, title: "Heavier than expected, in a good way", body: "The clasp alone feels like it was built by someone who cares. Chronograph pushers are crisp, not mushy.", isVerifiedPurchase: false, createdAt: "2026-04-02" },
  { id: "rev2", productId: "prod_heritage_chronograph", author: "Grace N.", rating: 4, title: "Beautiful, sizing runs slightly large", body: "Gorgeous on the wrist but I'd have gone leather over steel if I could redo it. Still wearing it daily.", isVerifiedPurchase: false, createdAt: "2026-03-18" },

  { id: "rev3", productId: "prod_meridian_automatic", author: "Chuka O.", rating: 5, title: "My go-to for every occasion", body: "Bought this for work and it's ended up being the watch I reach for on weekends too.", isVerifiedPurchase: false, createdAt: "2026-05-11" },
  { id: "rev4", productId: "prod_meridian_automatic", author: "Sade A.", rating: 4, title: "Clean dial, exactly as pictured", body: "No surprises, which is exactly what I wanted. Arrived two days early.", isVerifiedPurchase: false, createdAt: "2026-02-27" },

  { id: "rev5", productId: "prod_aurora_quartz", author: "Halima B.", rating: 5, title: "Didn't expect this at this price", body: "The gold tone hasn't faded after a few months of regular wear. Genuinely surprised.", isVerifiedPurchase: false, createdAt: "2026-04-20" },
  { id: "rev6", productId: "prod_aurora_quartz", author: "Ronke T.", rating: 4, title: "Small wrist friendly", body: "Finally a watch that doesn't look oversized on a 14cm wrist. Strap could be a touch softer.", isVerifiedPurchase: false, createdAt: "2026-01-30" },

  { id: "rev7", productId: "prod_solstice_mechanical", author: "Tunde M.", rating: 5, title: "The case-back sold me and it delivered", body: "Watching the rotor move through the exhibition window never gets old. Hand-winding is part of the ritual now.", isVerifiedPurchase: false, createdAt: "2026-05-02" },
  { id: "rev8", productId: "prod_solstice_mechanical", author: "Efe I.", rating: 5, title: "Best value mechanical I've owned", body: "Keeps time better than I expected for the price point. NATO strap is genuinely tough.", isVerifiedPurchase: false, createdAt: "2026-03-09" },

  { id: "rev9", productId: "prod_onyx_minimalist", author: "Zainab K.", rating: 4, title: "Minimal in the best way", body: "No date window was the whole point for me. Wish the second hand had a touch more lume though.", isVerifiedPurchase: false, createdAt: "2026-04-14" },
  { id: "rev10", productId: "prod_onyx_minimalist", author: "Bayo F.", rating: 5, title: "Goes with literally everything", body: "Wear it with a suit, wear it with a hoodie. It just works either way.", isVerifiedPurchase: false, createdAt: "2026-02-06" },

  { id: "rev11", productId: "prod_regent_classic", author: "Amaka C.", rating: 5, title: "Feels vintage without being fragile", body: "The domed crystal catches light beautifully. Bracelet sizing tool included, which was a nice touch.", isVerifiedPurchase: false, createdAt: "2026-05-20" },
  { id: "rev12", productId: "prod_regent_classic", author: "Kelechi U.", rating: 4, title: "Old-world charm, modern reliability", body: "Gets stopped-and-asked-about compliments more than any watch I've bought before.", isVerifiedPurchase: false, createdAt: "2026-03-24" },

  { id: "rev13", productId: "prod_lumiere_ladies_quartz", author: "Ngozi P.", rating: 5, title: "Elegant without trying too hard", body: "The pearlescent dial changes character depending on the light. Clasp is secure, doesn't pinch.", isVerifiedPurchase: false, createdAt: "2026-04-29" },
  { id: "rev14", productId: "prod_lumiere_ladies_quartz", author: "Aisha D.", rating: 5, title: "Perfect gift, kept one for myself too", body: "Bought one for my sister and liked it so much I ordered my own the same week.", isVerifiedPurchase: false, createdAt: "2026-01-15" },

  { id: "rev15", productId: "prod_atlas_diver_automatic", author: "Emeka R.", rating: 5, title: "Legible in every light condition", body: "Took it swimming twice already, no issues. Bezel action is satisfyingly snug.", isVerifiedPurchase: false, createdAt: "2026-05-05" },
  { id: "rev16", productId: "prod_atlas_diver_automatic", author: "Folake J.", rating: 4, title: "Solid diver, wish it shipped faster", body: "Great watch, arrived a couple days later than expected. Bezel and lume are excellent.", isVerifiedPurchase: false, createdAt: "2026-02-19" },

  { id: "rev17", productId: "prod_cadence_slim_quartz", author: "Yusuf A.", rating: 4, title: "Thinner than my old dress watch", body: "Slides under a cuff with zero bulk. Exactly what I needed for work.", isVerifiedPurchase: false, createdAt: "2026-04-08" },
  { id: "rev18", productId: "prod_cadence_slim_quartz", author: "Chidinma E.", rating: 4, title: "Great everyday piece for the price", body: "Not flashy, just does the job well. Strap is comfortable from day one.", isVerifiedPurchase: false, createdAt: "2026-01-22" },

  { id: "rev19", productId: "prod_voyager_gmt", author: "Obinna L.", rating: 5, title: "Worth the wait between restocks", body: "Ordered as soon as it was back in stock last time. The GMT hand is genuinely useful for calls across time zones.", isVerifiedPurchase: false, createdAt: "2026-03-01" },
  { id: "rev20", productId: "prod_voyager_gmt", author: "Temitope W.", rating: 5, title: "My favorite in the lineup", body: "Bezel action and bracelet finishing punch well above the price point.", isVerifiedPurchase: false, createdAt: "2026-01-05" },
];

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId);
}
