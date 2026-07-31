import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export const metadata = { title: "Products | NOBLE Admin" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { images: { orderBy: { displayOrder: "asc" }, take: 1 }, category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description={`${products.length} total`}
        action={
          <Button asChild size="sm" className="gap-2">
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        }
      />

      <div className="overflow-x-auto border border-noble-line bg-noble-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-noble-line text-left text-xs uppercase tracking-[0.08em] text-noble-grey">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-noble-line last:border-none">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {product.images[0] && (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden bg-noble-ivory">
                        <Image src={product.images[0].url} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-noble-black">{product.name}</p>
                      <p className="text-xs text-noble-grey">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-noble-grey">{product.category.name}</td>
                <td className="px-4 py-3 text-noble-black">{formatPrice(product.basePrice, product.currency)}</td>
                <td className="px-4 py-3 capitalize text-noble-grey">{product.status.replace("-", " ")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/products/${product.id}`}>Edit</Link>
                    </Button>
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="px-4 py-8 text-center text-sm text-noble-grey">No products yet.</p>}
      </div>
    </div>
  );
}
