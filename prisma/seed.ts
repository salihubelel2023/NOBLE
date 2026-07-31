import { PrismaClient } from "@prisma/client";

// Relative imports, not the "@/" alias — this script runs standalone via
// `tsx`, outside Next.js's own bundler, which is what resolves that alias
// during the real app build. Relative paths need no special resolution.
import { hashPassword } from "../src/lib/password";
import { seedCategories, seedProducts } from "./seed-data";

const prisma = new PrismaClient();

const DEFAULT_SITE_SETTINGS = {
  whatsappNumber: "2349132376668",
  phone: "09160578363",
  email: "salihubelel2023@gmail.com",
  instagramUrl: "https://instagram.com/msalihubelel",
  facebookUrl: "https://facebook.com/NobleWatches",
  tagline: "Noble watches, Move Noble",
};

async function main() {
  console.log("Seeding categories...");
  for (const category of seedCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        slug: category.slug,
        name: category.name,
        description: category.description,
        displayOrder: category.displayOrder,
        attributes: {
          create: category.attributes.map((attribute) => ({
            key: attribute.key,
            label: attribute.label,
            inputType: attribute.inputType,
            optionsJson: JSON.stringify(attribute.options),
            isFilterable: attribute.isFilterable,
            displayOrder: attribute.displayOrder,
          })),
        },
      },
    });
  }

  console.log("Seeding products...");
  for (const product of seedProducts) {
    const category = await prisma.category.findUnique({ where: { slug: product.categorySlug } });
    if (!category) {
      console.warn(`Skipping "${product.name}" — category "${product.categorySlug}" not found.`);
      continue;
    }

    const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (existing) {
      console.log(`  - "${product.name}" already exists, skipping.`);
      continue;
    }

    await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        categoryId: category.id,
        shortDescription: product.shortDescription,
        description: product.description,
        basePrice: product.basePrice,
        compareAtPrice: product.compareAtPrice,
        currency: product.currency,
        attributesJson: JSON.stringify(product.attributes),
        rating: product.rating,
        reviewCount: product.reviewCount,
        isBestSeller: product.isBestSeller ?? false,
        isNew: product.isNew ?? false,
        status: product.status,
        images: { create: product.images },
        variants: { create: product.variants },
      },
    });
  }

  console.log("Seeding site settings...");
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", ...DEFAULT_SITE_SETTINGS },
  });

  console.log("Seeding first admin user...");
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn(
      "  - ADMIN_EMAIL / ADMIN_PASSWORD not set in .env — skipping admin user creation.\n" +
        "    Set them in .env and re-run `npm run db:seed` to create your login."
    );
  } else {
    const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
    if (existingAdmin) {
      console.log(`  - Admin user ${adminEmail} already exists, skipping.`);
    } else {
      const passwordHash = await hashPassword(adminPassword);
      await prisma.adminUser.create({ data: { email: adminEmail, passwordHash } });
      console.log(`  - Created admin user: ${adminEmail}`);
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
