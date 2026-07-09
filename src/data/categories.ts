import type { Category } from "@/types/category";

/**
 * The category system, made concrete.
 *
 * Watches is the only live category today. Navbar, FeaturedCollections, and
 * (in the next build step) FilterSidebar all read from this array — none of
 * them hardcode "Watches" anywhere. That's what makes the rest of this file
 * true:
 *
 * To launch a new vertical (Bags, Perfumes, Sunglasses, Wallets, Jewelry,
 * Accessories, Textiles) later, add one object here with its own
 * attributeDefinitions — e.g. Perfumes might define `scentFamily`,
 * `volumeMl`, `concentration`. No component code changes. See
 * /ARCHITECTURE.md Section 11 for the full walkthrough.
 */
export const categories: Category[] = [
  {
    id: "cat_watches",
    slug: "watches",
    name: "Watches",
    description:
      "Precision timepieces — automatic, mechanical and quartz — for every wrist and every budget.",
    attributeDefinitions: [
      {
        key: "movement",
        label: "Movement",
        inputType: "select",
        options: ["Automatic", "Mechanical", "Quartz"],
        isFilterable: true,
      },
      {
        key: "strapMaterial",
        label: "Strap Material",
        inputType: "select",
        options: ["Leather", "Steel", "NATO", "Rubber"],
        isFilterable: true,
      },
      {
        key: "caseSize",
        label: "Case Size",
        inputType: "select",
        options: ["34mm", "36mm", "38mm", "40mm", "42mm", "44mm"],
        isFilterable: true,
      },
      {
        key: "color",
        label: "Color",
        inputType: "color",
        options: ["Black", "Silver", "Gold", "Brown", "Blue"],
        isFilterable: true,
      },
      {
        key: "gender",
        label: "Gender",
        inputType: "select",
        options: ["Men's", "Women's", "Unisex"],
        isFilterable: true,
      },
    ],
    displayOrder: 1,
  },

  // Future categories append here as additional objects, e.g.:
  //
  // {
  //   id: "cat_bags",
  //   slug: "bags",
  //   name: "Bags",
  //   description: "...",
  //   attributeDefinitions: [
  //     { key: "material", label: "Material", inputType: "select", options: [...], isFilterable: true },
  //     { key: "size", label: "Size", inputType: "select", options: [...], isFilterable: true },
  //   ],
  //   displayOrder: 2,
  // },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
