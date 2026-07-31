"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  variant?: "light" | "dark";
  className?: string;
}

/**
 * One field, one button — every extra field measurably drops signup rate,
 * and email is the only thing this form needs to function. Shared between
 * both dark-background contexts on this site (the homepage Newsletter
 * band and the Footer) via variant="dark", with variant="light" available
 * for a future light-background placement, so the submit logic lives once.
 */
export function NewsletterForm({ variant = "dark", className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    // TODO: wire up to /api/newsletter once the route ships.
    window.setTimeout(() => setStatus("success"), 500);
  };

  if (status === "success") {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-sm",
          variant === "light" ? "text-noble-black" : "text-noble-white/90",
          className
        )}
      >
        <Check className="h-4 w-4 text-noble-gold" />
        You&apos;re in. Watch your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-2", className)}
    >
      <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
        Email address
      </label>
      <Input
        id={`newsletter-email-${variant}`}
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn(
          variant === "dark" &&
            "border-white/20 bg-transparent text-noble-white placeholder:text-white/50 focus-visible:ring-noble-gold"
        )}
      />
      <Button
        type="submit"
        disabled={status === "submitting"}
        variant={variant === "dark" ? "outline" : "default"}
        className={cn(
          "shrink-0",
          variant === "dark" && "border-white/30 text-noble-white hover:bg-white/10"
        )}
      >
        {status === "submitting" ? "Joining..." : "Join"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
