import path from "path";
import { PrismaClient } from "@prisma/client";

function getPrismaDataSourceUrl(): string | undefined {
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) return undefined;

  if (rawUrl.startsWith("file:")) {
    const localPath = rawUrl.slice("file:".length);
    const resolvedPath = path.resolve(process.cwd(), localPath);
    return `file:${resolvedPath}`;
  }

  return rawUrl;
}

const prismaConfig = getPrismaDataSourceUrl()
  ? { datasources: { db: { url: getPrismaDataSourceUrl() } } }
  : undefined;

/**
 * Standard Next.js + Prisma singleton pattern. Without this, every hot
 * reload in development would create a brand new PrismaClient (and a new
 * SQLite connection), eventually exhausting connections. Storing it on
 * `globalThis` survives module reloads in dev while staying a fresh
 * single instance in production.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
