import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";
import type { Category, CategoryAttributeDefinition } from "@/types/category";

/**
 * Prisma-backed as of the admin build. `getCategories()` is new — it
 * replaces the old direct `import { categories }` array access, since a
 * database read can't be a synchronous top-level export. Every other
 * function keeps its original name; consumers just gained `await`.
 */

const categoryInclude = {
  attributes: { orderBy: { displayOrder: "asc" as const } },
} satisfies Prisma.CategoryInclude;

type DbCategory = Prisma.CategoryGetPayload<{ include: typeof categoryInclude }>;

function mapCategory(dbCategory: DbCategory): Category {
  return {
    id: dbCategory.id,
    slug: dbCategory.slug,
    name: dbCategory.name,
    description: dbCategory.description,
    displayOrder: dbCategory.displayOrder,
    attributeDefinitions: dbCategory.attributes.map(
      (attribute): CategoryAttributeDefinition => ({
        key: attribute.key,
        label: attribute.label,
        inputType: attribute.inputType as CategoryAttributeDefinition["inputType"],
        options: JSON.parse(attribute.optionsJson) as string[],
        isFilterable: attribute.isFilterable,
      })
    ),
  };
}

export async function getCategories(): Promise<Category[]> {
  const dbCategories = await prisma.category.findMany({
    include: categoryInclude,
    orderBy: { displayOrder: "asc" },
  });
  return dbCategories.map(mapCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const dbCategory = await prisma.category.findUnique({
    where: { slug },
    include: categoryInclude,
  });
  return dbCategory ? mapCategory(dbCategory) : null;
}
