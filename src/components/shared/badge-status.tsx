import { cn } from "@/lib/utils";

export type BadgeStatusValue = "new" | "in-stock" | "low-stock" | "out-of-stock";

const statusConfig: Record<BadgeStatusValue, { label: string; className: string }> = {
  new: { label: "New", className: "bg-noble-black text-noble-white" },
  "in-stock": { label: "In Stock", className: "bg-noble-white text-noble-black border border-noble-line" },
  "low-stock": { label: "Low Stock", className: "bg-noble-gold text-noble-black" },
  "out-of-stock": { label: "Sold Out", className: "bg-noble-grey text-noble-white" },
};

interface BadgeStatusProps {
  status: BadgeStatusValue;
  className?: string;
}

/** Single source of truth for New / In Stock / Low Stock / Sold Out styling — see /ARCHITECTURE.md Section 9. */
export function BadgeStatus({ status, className }: BadgeStatusProps) {
  const config = statusConfig[status];
  return (
    <span className={cn("px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em]", config.className, className)}>
      {config.label}
    </span>
  );
}
