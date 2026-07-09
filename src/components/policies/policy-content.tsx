import type { Policy } from "@/data/policies";

/**
 * "Last updated" date shown on every policy — a small but real trust
 * signal for anything legal-adjacent. Typography here steps back from the
 * site's editorial serif voice: full sans-serif, tighter line length for
 * legibility. These are reference pages, not brand storytelling —
 * readability wins over atmosphere. See wireframe notes on Policies.
 */
export function PolicyContent({ policy }: { policy: Policy }) {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl tracking-tight text-noble-black md:text-4xl">{policy.title}</h1>
      <p className="mt-2 text-sm text-noble-grey">Last updated: {policy.lastUpdated}</p>

      <div className="mt-10 flex flex-col gap-8">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 text-lg font-medium text-noble-black">{section.heading}</h2>
            <div className="flex flex-col gap-3">
              {section.body.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-noble-grey">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
