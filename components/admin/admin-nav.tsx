"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/admin", label: "Aperçu", exact: true },
  { href: "/admin/orders", label: "Commandes" },
  { href: "/admin/products", label: "Produits" },
  { href: "/admin/realisations", label: "Réalisations" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/customers", label: "Clients" },
  { href: "/admin/content", label: "Contenu" },
  { href: "/admin/settings", label: "Réglages" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav" aria-label="Navigation admin">
      {sections.map((section) => {
        const active = section.exact
          ? pathname === section.href
          : pathname === section.href || pathname.startsWith(`${section.href}/`);
        return (
          <Link
            key={section.href}
            href={section.href}
            className={`admin-nav-link ${active ? "admin-nav-link-active" : ""}`}
          >
            <span className="admin-nav-dot" />
            <span>{section.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
