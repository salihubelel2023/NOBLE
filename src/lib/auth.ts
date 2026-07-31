import { cookies } from "next/headers";

import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";

const SESSION_COOKIE_NAME = "noble_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Hand-rolled rather than a third-party auth library — this is a
 * single-admin system today, and this is small enough to fully own. If
 * NOBLE later needs staff accounts or social login, the AdminUser +
 * Session tables are exactly what a library would sit on top of; nothing
 * here is wasted. See ARCHITECTURE.md Section 3.
 *
 * Password hashing itself lives in lib/password.ts (re-exported below) —
 * that file has no Next.js dependency, so prisma/seed.ts (a standalone
 * script) can safely import it too, unlike this file.
 */
export { hashPassword, verifyPassword };

/**
 * Creates a session row and sets the cookie. Mutates cookies, so this can
 * only be called from a Server Action or Route Handler — never from a
 * plain Server Component render (Next.js disallows setting cookies during
 * render). The login Server Action is the one place this is called.
 */
export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await prisma.session.create({ data: { userId, expiresAt } });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

/**
 * Reads the session cookie, validates it against the database, and returns
 * the signed-in admin user, or null. Only reads cookies, so this is safe
 * to call from Server Components (including the protected admin layout).
 * This is the authoritative check — middleware only does a fast,
 * cookie-presence pre-check; this is what actually confirms the session
 * hasn't expired or been revoked. See ADMIN_SETUP.md.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
}

/** Deletes the session row and clears the cookie. Must be called from a Server Action (mutates cookies). */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {
      // Already gone — fine, we're clearing the cookie regardless.
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export { SESSION_COOKIE_NAME };
