import Link from "next/link";
import type { ReactNode } from "react";

import { getRequiredUser } from "@/lib/auth-user";

const links = [
  { href: "/compte", label: "Aperçu" },
  { href: "/compte/commandes", label: "Commandes" },
  { href: "/compte/profil", label: "Profil" },
];

export default async function CompteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getRequiredUser();
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)]">
          Mon espace
        </div>
        <h1 className="mt-2 font-[family-name:var(--font-archivo-black)] text-3xl text-white">
          Salut {user.name} 👋
        </h1>
      </div>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-[color:var(--vice-pink)]/30 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {user.role === "admin" ? (
            <Link
              href="/admin"
              className="mt-4 block rounded-xl border border-[color:var(--vice-cyan)]/40 bg-[color:var(--vice-cyan)]/5 px-4 py-3 text-sm font-semibold text-[color:var(--vice-cyan)] hover:bg-[color:var(--vice-cyan)]/10"
            >
              Dashboard admin →
            </Link>
          ) : null}
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
