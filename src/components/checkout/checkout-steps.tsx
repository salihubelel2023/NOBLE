import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = ["Shipping", "Payment", "Review"] as const;

/**
 * Chunking reduces perceived effort and gives a sense of "almost there" —
 * one long form reads as more work than the same fields split into steps.
 * See wireframe notes on Checkout.
 */
export function CheckoutSteps({ currentStep }: { currentStep: number }) {
  return (
    <ol className="mb-10 flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        return (
          <li key={step} className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs",
                  isComplete && "bg-noble-black text-noble-white",
                  isActive && "border border-noble-black text-noble-black",
                  !isComplete && !isActive && "border border-noble-line text-noble-grey"
                )}
              >
                {isComplete ? <Check className="h-3.5 w-3.5" /> : stepNumber}
              </span>
              <span className={cn("text-sm", isActive ? "text-noble-black" : "text-noble-grey")}>{step}</span>
            </span>
            {stepNumber < steps.length && <span className="h-px w-6 bg-noble-line sm:w-10" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
