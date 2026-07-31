import { getCategories } from "@/data/categories";
import { createProductAction } from "@/lib/actions/product-admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductForm } from "@/components/admin/product-form";

export const metadata = { title: "Add Product | NOBLE Admin" };

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <AdminPageHeader title="Add Product" />
      <ProductForm categories={categories} action={createProductAction} submitLabel="Create Product" />
    </div>
  );
}
