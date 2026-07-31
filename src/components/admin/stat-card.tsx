import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 border border-noble-line bg-noble-white p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-noble-ivory">
        <Icon className="h-5 w-5 text-noble-gold" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-xl font-medium text-noble-black">{value}</p>
        <p className="text-xs text-noble-grey">{label}</p>
      </div>
    </div>
  );
}
