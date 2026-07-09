"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * The one motion primitive the rest of the app reaches for on scroll-reveal.
 *
 * Framer Motion needs a Client Component to run at all, but almost every
 * section around this component (Hero, FeaturedCollections, WhyChooseNoble...)
 * stays a Server Component — only this small wrapper opts into the client
 * boundary. That's the "push the client boundary as far down as possible"
 * rule from /ARCHITECTURE.md Section 3, made concrete: the section still
 * fetches/composes on the server, and only the reveal animation itself
 * ships JS to the browser.
 */
export function FadeIn({ children, delay = 0, y = 24, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
