"use client";

import { useActionState, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { createCategoryAction } from "@/lib/actions/category-admin-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AttributeRow {
  key: string;
  label: string;
  optionsText: string;
}

/**
 * This form is the concrete proof of the "no redesign" promise: fill this
 * in for "Bags" (material, size) and the storefront's catalog, filters,
 * and nav pick it up automatically. See ARCHITECTURE.md Section 11.
 */
export function AddCategoryForm() {
  const [state, formAction, isPending] = useActionState(createCategoryAction, {});
  const [attributes, setAttributes] = useState<AttributeRow[]>([{ key: "", label: "", optionsText: "" }]);

  function updateAttribute(index: number, field: keyof AttributeRow, value: string) {
    setAttributes(attributes.map((attribute, i) => (i === index ? { ...attribute, [field]: value } : attribute)));
  }

  function addAttribute() {
    setAttributes([...attributes, { key: "", label: "", optionsText: "" }]);
  }

  function removeAttribute(index: number) {
    setAttributes(attributes.filter((_, i) => i !== index));
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 border border-noble-line bg-noble-white p-6">
      {state.error && <p className="text-sm text-noble-error">{state.error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Name</span>
          <Input name="name" required placeholder="Bags" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Slug (URL)</span>
          <Input name="slug" required placeholder="bags" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Description</span>
        <Input name="description" placeholder="Shown at the top of the category page and used for SEO." />
      </label>

      <div className="flex flex-col gap-3">
        <p className="text-[11px] uppercase tracking-[0.1em] text-noble-grey">
          Filterable Attributes (e.g. Material, Size)
        </p>
        {attributes.map((attribute, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_2fr_auto]">
            <Input
              placeholder="Key (material)"
              value={attribute.key}
              onChange={(e) => updateAttribute(index, "key", e.target.value)}
            />
            <Input
              placeholder="Label (Material)"
              value={attribute.label}
              onChange={(e) => updateAttribute(index, "label", e.target.value)}
            />
            <Input
              placeholder="Options, comma separated (Leather, Canvas, Nylon)"
              value={attribute.optionsText}
              onChange={(e) => updateAttribute(index, "optionsText", e.target.value)}
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeAttribute(index)} aria-label="Remove attribute">
              <Trash2 className="h-4 w-4 text-noble-error" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addAttribute} className="w-fit gap-2">
          <Plus className="h-4 w-4" />
          Add Attribute
        </Button>
        <input type="hidden" name="attributesJson" value={JSON.stringify(attributes)} />
      </div>

      <Button type="submit" disabled={isPending} className="w-fit">
        {isPending ? "Creating..." : "Create Category"}
      </Button>
    </form>
  );
}
