"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

/**
 * Validation runs on blur, not on every keystroke — flagging "Email is
 * invalid" after two characters is a well-known annoyance pattern;
 * validating once someone's left the field respects that they weren't
 * finished typing. See wireframe notes on Contact.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors: Partial<Record<keyof FormState, string>> = {
    name: values.name.trim() ? undefined : "Please enter your name.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? undefined : "Please enter a valid email.",
    subject: values.subject.trim() ? undefined : "Please add a subject.",
    message: values.message.trim().length >= 10 ? undefined : "Message should be at least 10 characters.",
  };

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.values(errors).some(Boolean)) return;
    // TODO: wire up to a real contact endpoint.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-2 rounded-sm border border-noble-line bg-noble-ivory p-6">
        <Check className="h-5 w-5 text-noble-gold" />
        <p className="font-serif text-lg text-noble-black">Message sent.</p>
        <p className="text-sm text-noble-grey">We reply within one business day — usually much sooner.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Name</span>
          <Input
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={touched.name && Boolean(errors.name)}
          />
          {touched.name && errors.name && <span className="text-xs text-noble-error">{errors.name}</span>}
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Email</span>
          <Input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={touched.email && Boolean(errors.email)}
          />
          {touched.email && errors.email && <span className="text-xs text-noble-error">{errors.email}</span>}
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Subject</span>
        <Input
          value={values.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          onBlur={() => handleBlur("subject")}
          aria-invalid={touched.subject && Boolean(errors.subject)}
        />
        {touched.subject && errors.subject && <span className="text-xs text-noble-error">{errors.subject}</span>}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Message</span>
        <textarea
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={touched.message && Boolean(errors.message)}
          rows={5}
          className={cn(
            "w-full rounded-sm border border-input bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          )}
        />
        {touched.message && errors.message && <span className="text-xs text-noble-error">{errors.message}</span>}
      </label>

      <Button type="submit" size="lg" className="self-start">
        Send Message
      </Button>
    </form>
  );
}
