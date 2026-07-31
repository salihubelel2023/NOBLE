"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

export interface CategoryFormState {
  error?: string;
}

interface ParsedAttributeDefinition {
  key: string;
  label: string;
  inputType: string;
  options: string[];
  isFilterable: boolean;
  displayOrder: number;
}

function parseAttributeDefinitions(raw: string): ParsedAttributeDefinition[] {
  try {
    const parsed = JSON.parse(raw) as { key: string; label: string; optionsText: string }[];
    return parsed
      .filter((definition) => definition.key.trim() && definition.label.trim())
      .map((definition, index) => ({
        key: definition.key.trim(),
        label: definition.label.trim(),
        inputType: "select",
        options: definition.optionsText
          .split(",")
          .map((option) => option.trim())
          .filter(Boolean),
        isFilterable: true,
        displayOrder: index,
      }));
  } catch {
    return [];
  }
}

/**
 * This is the concrete proof of the "no redesign" promise: add one row
 * here with its own attribute definitions, and the storefront's category
 * page, filter sidebar, nav, and featured collections all pick it up with
 * zero component changes. See ARCHITECTURE.md Section 11.
 */
export async function createCategoryAction(_prevState: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const attributeDefinitions = parseAttributeDefinitions(String(formData.get("attributesJson") ?? "[]"));

  if (!slug || !name) {
    return { error: "Name and slug are required." };
  }

  const existingCount = await prisma.category.count();

  try {
    await prisma.category.create({
      data: {
        slug,
        name,
        description,
        displayOrder: existingCount,
        attributes: {
          create: attributeDefinitions.map((definition) => ({
            key: definition.key,
            label: definition.label,
            inputType: definition.inputType,
            optionsJson: JSON.stringify(definition.options),
            isFilterable: definition.isFilterable,
            displayOrder: definition.displayOrder,
          })),
        },
      },
    });
  } catch {
    return { error: "Could not save — that slug may already be in use." };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  redirect("/admin/categories");
}
