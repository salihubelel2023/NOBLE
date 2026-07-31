import { getSiteSettings } from "@/data/site-settings";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SettingsForm } from "@/components/admin/settings-form";

export const metadata = { title: "Settings | NOBLE Admin" };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="WhatsApp, phone, email, and social links used across the whole storefront."
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
