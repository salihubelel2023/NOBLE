import { redirect } from "next/navigation";

import { getCategories } from "@/data/categories";

/**
 * `/catalog` with no category segment redirects to the first category.
 * With only Watches live today this is equivalent to a dedicated
 * "all products" view; once a second category exists, this is the natural
 * place to turn into a real cross-category browse page instead — nothing
 * downstream depends on it staying a redirect. Async now: categories are
 * database-backed.
 */
export default async function CatalogIndexPage() {
  const categories = await getCategories();
  const defaultCategory = categories[0];
  redirect(`/catalog/${defaultCategory.slug}`);
}
