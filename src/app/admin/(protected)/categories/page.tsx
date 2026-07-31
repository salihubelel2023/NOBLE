import { getCategories } from "@/data/categories";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AddCategoryForm } from "@/components/admin/add-category-form";

export const metadata = { title: "Categories | NOBLE Admin" };

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description="Add a new vertical (Bags, Perfumes...) and it appears in the storefront nav, catalog, and filters automatically."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="border border-noble-line bg-noble-white p-5">
            <p className="font-medium text-noble-black">{category.name}</p>
            <p className="text-xs text-noble-grey">/{category.slug}</p>
            <p className="mt-2 text-sm text-noble-grey">{category.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {category.attributeDefinitions.map((definition) => (
                <span key={definition.key} className="rounded-full bg-noble-ivory px-2.5 py-1 text-[11px] text-noble-grey">
                  {definition.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mb-3 text-[11px] uppercase tracking-[0.1em] text-noble-grey">Add a Category</p>
      <AddCategoryForm />
    </div>
  );
}
