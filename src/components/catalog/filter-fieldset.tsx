"use client";

interface FilterFieldsetProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  defaultOpen?: boolean;
}

/**
 * One collapsible checkbox group. Used for Brand and, in a loop, for every
 * CategoryAttributeDefinition the active category defines — this is the
 * piece of UI that makes the catalog category-agnostic: it renders whatever
 * options it's handed, with no idea whether they're watch movements or,
 * someday, perfume concentrations.
 *
 * Native <details>/<summary> gives the collapse/expand behavior for free,
 * with no extra client state needed for the open/closed toggle itself.
 */
export function FilterFieldset({ title, options, selected, onToggle, defaultOpen = false }: FilterFieldsetProps) {
  if (options.length === 0) return null;

  return (
    <details className="group border-b border-noble-line py-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-noble-black">
        {title}
        {selected.length > 0 && (
          <span className="rounded-full bg-noble-ivory px-2 py-0.5 text-[11px] text-noble-grey">{selected.length}</span>
        )}
      </summary>
      <div className="mt-3 flex flex-col gap-2.5">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className="flex cursor-pointer items-center gap-2.5 text-sm text-noble-grey">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="h-4 w-4 shrink-0 rounded-sm border-noble-line accent-noble-black"
              />
              <span className={checked ? "text-noble-black" : undefined}>{option}</span>
            </label>
          );
        })}
      </div>
    </details>
  );
}
