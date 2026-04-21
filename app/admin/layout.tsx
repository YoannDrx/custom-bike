import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { getRequiredAdmin } from "@/lib/auth-user";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getRequiredAdmin();
  return (
    <AdminShell adminName={admin.name} adminEmail={admin.email}>
      {children}
    </AdminShell>
  );
}
