import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/** One consistent header shape reused across every admin page. */
export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-serif text-2xl tracking-tight text-noble-black">{title}</h1>
        {description && <p className="mt-1 text-sm text-noble-grey">{description}</p>}
      </div>
      {action}
    </div>
  );
}
