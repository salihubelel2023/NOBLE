import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Duplicated from lib/auth.ts deliberately, not imported — middleware runs
// in the Edge runtime, and importing lib/auth.ts here would pull its
// Prisma import into the Edge bundle, where Prisma Client isn't supported.
// This file only ever checks for the cookie's *presence*; it never touches
// the database. See ADMIN_SETUP.md for the full two-layer auth explanation.
const SESSION_COOKIE_NAME = "noble_admin_session";

/**
 * Fast pre-check only: does a session cookie exist at all? This catches
 * the common case (never logged in, or logged out) with an instant
 * redirect and no render cost. It deliberately does NOT verify the
 * session is still valid in the database — Prisma can't run here. That
 * authoritative check happens in app/admin/(protected)/layout.tsx, which
 * runs in the Node.js runtime on every request to a protected admin page.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);

  if (!isLoginPage && !hasSessionCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPage && hasSessionCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
