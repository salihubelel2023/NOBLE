"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteProductAction } from "@/lib/actions/product-admin-actions";

export function DeleteProductButton({ productId, productName }: { productId: string; productName: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(`Delete "${productName}"? This cannot be undone.`)) return;
    startTransition(() => {
      deleteProductAction(productId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={`Delete ${productName}`}
      className="flex h-8 w-8 items-center justify-center rounded-sm text-noble-grey transition-colors hover:bg-noble-error/10 hover:text-noble-error disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
