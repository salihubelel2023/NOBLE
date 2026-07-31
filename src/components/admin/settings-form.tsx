"use client";

import { useActionState } from "react";
import { Check } from "lucide-react";

import { updateSiteSettingsAction } from "@/lib/actions/settings-admin-actions";
import type { SiteSettings } from "@/data/site-settings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, isPending] = useActionState(updateSiteSettingsAction, {});

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-5 border border-noble-line bg-noble-white p-6">
      {state.error && <p className="text-sm text-noble-error">{state.error}</p>}
      {state.success && (
        <p className="flex items-center gap-2 text-sm text-noble-black">
          <Check className="h-4 w-4 text-noble-gold" />
          Saved. Changes appear across the site immediately.
        </p>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">WhatsApp Number</span>
        <Input name="whatsappNumber" required defaultValue={settings.whatsappNumber} placeholder="2348012345678" />
        <span className="text-xs text-noble-grey">Digits only, country code first, no + or spaces.</span>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Support Phone</span>
        <Input name="phone" required defaultValue={settings.phone} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Support Email</span>
        <Input name="email" type="email" required defaultValue={settings.email} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Instagram URL</span>
        <Input name="instagramUrl" defaultValue={settings.instagramUrl} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Facebook URL</span>
        <Input name="facebookUrl" defaultValue={settings.facebookUrl} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Brand Tagline</span>
        <Input name="tagline" defaultValue={settings.tagline} />
      </label>

      <Button type="submit" disabled={isPending} className="w-fit">
        {isPending ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
