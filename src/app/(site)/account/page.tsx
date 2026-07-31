import type { Metadata } from "next";
import { MapPin } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/format";
import { mockAccountUser, mockOrders, mockAddresses } from "@/data/mock-account";
import { AccountSidebar } from "@/components/account/account-sidebar";

export const metadata: Metadata = buildMetadata({
  title: "Account",
  description: "Manage your NOBLE account, orders, and addresses.",
});

/**
 * Ships as a visual shell with placeholder data, not a working system — the
 * moment auth and real User/Order/Address records exist (see
 * /ARCHITECTURE.md Section 4), these placeholders swap for real data and
 * this layout doesn't change. See wireframe notes on Account.
 */
export default function AccountPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
        <AccountSidebar />

        <div className="flex flex-col gap-14">
          <section id="overview">
            <h1 className="font-serif text-3xl tracking-tight text-noble-black md:text-4xl">
              Welcome back, {mockAccountUser.name.split(" ")[0]}
            </h1>
            <p className="mt-2 text-noble-grey">Here&apos;s what&apos;s happening with your account.</p>
          </section>

          <section id="orders">
            <h2 className="mb-5 text-[11px] uppercase tracking-[0.12em] text-noble-gold">Recent Orders</h2>
            <div className="flex flex-col">
              {mockOrders.map((order) => (
                <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-noble-line py-4">
                  <div>
                    <p className="font-medium text-noble-black">{order.id}</p>
                    <p className="text-sm text-noble-grey">
                      {order.date} &middot; {order.items} {order.items === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] bg-noble-ivory text-noble-black">
                      {order.status}
                    </span>
                    <span className="font-medium text-noble-black">{formatPrice(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-10 md:grid-cols-2">
            <section id="addresses">
              <h2 className="mb-5 text-[11px] uppercase tracking-[0.12em] text-noble-gold">Saved Addresses</h2>
              {mockAddresses.map((address) => (
                <div key={address.id} className="flex items-start gap-3 border border-noble-line p-5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-noble-gold" />
                  <div>
                    <p className="font-medium text-noble-black">
                      {address.label} {address.isDefault && <span className="text-xs text-noble-grey">(Default)</span>}
                    </p>
                    <p className="text-sm text-noble-grey">
                      {address.line1}, {address.city}
                    </p>
                  </div>
                </div>
              ))}
            </section>

            <section id="settings">
              <h2 className="mb-5 text-[11px] uppercase tracking-[0.12em] text-noble-gold">Account Details</h2>
              <div className="flex flex-col gap-3 border border-noble-line p-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-noble-grey">Name</span>
                  <span className="text-noble-black">{mockAccountUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-noble-grey">Email</span>
                  <span className="text-noble-black">{mockAccountUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-noble-grey">Phone</span>
                  <span className="text-noble-black">{mockAccountUser.phone}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
