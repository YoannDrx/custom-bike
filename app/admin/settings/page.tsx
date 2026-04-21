import { prisma } from "@/lib/prisma";

import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  const record = Object.fromEntries(settings.map((s) => [s.key, s.value])) as Record<
    string,
    unknown
  >;

  return (
    <div className="admin-page">
      <header>
        <h1 className="admin-h1">Réglages</h1>
        <p className="admin-subtitle">Configuration boutique et atelier.</p>
      </header>
      <SettingsForm initial={record} />
    </div>
  );
}
