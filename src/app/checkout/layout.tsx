import Link from "next/link";
import { Lock } from "lucide-react";

/**
 * Full navigation at this exact moment gives the customer an obvious exit
 * ramp right when they're about to pay — stripping navigation down at
 * checkout is one of the most well-documented conversion patterns in
 * e-commerce for exactly this reason. Logo + "Secure Checkout" label only:
 * no category links, no search, no cart/wishlist icons. See wireframe
 * notes on Checkout.
 */
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-noble-line bg-noble-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="font-serif text-xl tracking-tight text-noble-black">
            NOBLE
          </Link>
          <span className="flex items-center gap-2 text-sm text-noble-grey">
            <Lock className="h-3.5 w-3.5" />
            Secure Checkout
          </span>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
