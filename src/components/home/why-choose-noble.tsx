import { Gem, Truck, ShieldCheck, Headphones, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: Gem, title: "Premium Quality", description: "Hand-inspected before it ships." },
  { icon: Truck, title: "Fast Delivery", description: "24–48h dispatch, nationwide." },
  { icon: ShieldCheck, title: "Trusted Suppliers", description: "Every watch sourced and verified." },
  { icon: Headphones, title: "Customer Support", description: "Real humans, 24h reply." },
  { icon: Lock, title: "Secure Payments", description: "Encrypted checkout, every time." },
];

/**
 * No boxes, no borders — just icon, bold label, one specific proof-line.
 * Trust badges usually get ignored because they're generic; "hand-inspected"
 * and "24–48h dispatch" are specific claims, and specificity is what earns
 * belief.
 */
export function WhyChooseNoble() {
  return (
    <section className="bg-noble-ivory py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-5 lg:gap-8">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.05} className="flex flex-col items-start gap-3">
              <feature.icon className="h-7 w-7 text-noble-gold" strokeWidth={1.5} />
              <p className="font-medium text-noble-black">{feature.title}</p>
              <p className="text-sm text-noble-grey">{feature.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
