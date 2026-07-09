import Link from "next/link";
import type { ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  variant?: "solid" | "outline";
  size?: ButtonProps["size"];
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

/**
 * The only way marketing/product surfaces should render a call-to-action
 * button. It wraps the shadcn Button primitive but exposes just the two
 * variants the design system allows — solid and outline, no gradients, no
 * ad-hoc one-off styles creeping in page by page. See /ARCHITECTURE.md
 * Section 9.
 */
export function CTAButton({ href, variant = "solid", size = "default", children, className, onClick, type = "button" }: CTAButtonProps) {
  const mappedVariant = variant === "solid" ? "default" : "outline";

  if (href) {
    return (
      <Button asChild variant={mappedVariant} size={size} className={cn(className)}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button type={type} variant={mappedVariant} size={size} className={cn(className)} onClick={onClick}>
      {children}
    </Button>
  );
}
