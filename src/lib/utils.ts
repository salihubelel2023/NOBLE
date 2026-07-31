import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names safely, resolving conflicts (e.g. "p-2 p-4" -> "p-4").
 * Used by every component in the project instead of raw template-string concatenation.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Derives a `tel:` href from a human-formatted phone number, stripping everything but digits and a leading +. */
export function toPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
