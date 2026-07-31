import { PrismaClient } from "@prisma/client";

/**
 * Standard Next.js + Prisma singleton pattern. Without this, every hot
 * reload in development would create a brand new PrismaClient (and a new
 * SQLite connection), eventually exhausting connections. Storing it on
 * `globalThis` survives module reloads in dev while staying a fresh
 * single instance in production.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
