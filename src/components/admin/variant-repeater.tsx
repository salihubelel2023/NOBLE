"use client";

import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface VariantEntry {
  sku: string;
  label: string;
  priceOverride: string;
  stockQuantity: string;
}

interface VariantRepeaterProps {
  variants: VariantEntry[];
  onChange: (variants: VariantEntry[]) => void;
}

export function VariantRepeater({ variants, onChange }: VariantRepeaterProps) {
  function updateVariant(index: number, field: keyof VariantEntry, value: string) {
    const next = variants.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant));
    onChange(next);
  }

  function removeVariant(index: number) {
    onChange(variants.filter((_, i) => i !== index));
  }

  function addVariant() {
    onChange([...variants, { sku: "", label: "", priceOverride: "", stockQuantity: "0" }]);
  }

  return (
    <div className="flex flex-col gap-3">
      {variants.map((variant, index) => (
        <div key={index} className="grid gap-2 border border-noble-line p-3 sm:grid-cols-[1fr_1fr_110px_100px_auto]">
          <Input placeholder="SKU" value={variant.sku} onChange={(e) => updateVariant(index, "sku", e.target.value)} />
          <Input placeholder="Label (e.g. 42mm / Steel)" value={variant.label} onChange={(e) => updateVariant(index, "label", e.target.value)} />
          <Input
            placeholder="Price override"
            type="number"
            value={variant.priceOverride}
            onChange={(e) => updateVariant(index, "priceOverride", e.target.value)}
          />
          <Input
            placeholder="Stock"
            type="number"
            value={variant.stockQuantity}
            onChange={(e) => updateVariant(index, "stockQuantity", e.target.value)}
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)} aria-label="Remove variant">
            <Trash2 className="h-4 w-4 text-noble-error" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addVariant} className="w-fit gap-2">
        <Plus className="h-4 w-4" />
        Add Variant
      </Button>
    </div>
  );
}
