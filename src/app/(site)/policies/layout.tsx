import { PolicyNav } from "@/components/policies/policy-nav";

/**
 * The sidebar-plus-content shell is intentionally identical in structure to
 * the future Account page — reusing one "interior page" convention across
 * the site, rather than inventing a new layout per settings-style page, is
 * itself a scalability decision. See /ARCHITECTURE.md and wireframe notes.
 *
 * Next.js reads the active segment (e.g. "shipping") from the URL itself
 * inside each page component — this layout doesn't need to know which
 * child is active except to pass it down for nav highlighting, which each
 * page does directly via its own PolicyNav usage instead of duplicating
 * logic here.
 */
export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-20">{children}</div>;
}
