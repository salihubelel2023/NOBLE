import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/shared/cta-button";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  ctaLabel,
  ctaHref,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <span className="text-[11px] uppercase tracking-[0.12em] text-noble-gold">{eyebrow}</span>
      )}
      <h2 className="font-serif text-3xl tracking-tight text-noble-black md:text-4xl">{title}</h2>
      {description && <p className="max-w-xl text-noble-grey">{description}</p>}
      {ctaLabel && ctaHref && (
        <CTAButton href={ctaHref} variant="outline" className="mt-2">
          {ctaLabel}
        </CTAButton>
      )}
    </div>
  );
}
