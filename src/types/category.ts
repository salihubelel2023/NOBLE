/**
 * Defines the shape of a filterable attribute for a given category.
 * FilterSidebar and product data validation both read from this — it is the
 * single mechanism that lets a brand-new category (Bags, Perfumes, ...) plug
 * into the existing catalog UI with zero component changes.
 */
export interface CategoryAttributeDefinition {
  key: string;
  label: string;
  inputType: "select" | "range" | "color";
  options?: string[];
  isFilterable: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  /** Self-referential in the real schema (e.g. "Men's Watches" -> "Watches"). Omitted for the flat mock data. */
  parentSlug?: string;
  description: string;
  heroImage?: string;
  attributeDefinitions: CategoryAttributeDefinition[];
  displayOrder: number;
}
