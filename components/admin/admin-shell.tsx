"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { AdminNav } from "./admin-nav";
import { AdminSignOut } from "./admin-sign-out";

type Props = {
  adminName: string;
  adminEmail: string;
  children: ReactNode;
};

export function AdminShell({ adminName, adminEmail, children }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="admin-shell">
      <div className="admin-mobile-topbar">
        <Link href="/admin" className="admin-mobile-brand">
          <Image
            src="/media/custombike-logo.jpg"
            alt="Custom Bike"
            width={32}
            height={32}
            className="admin-mobile-brand-logo"
          />
          <span>Cockpit</span>
        </Link>
        <button
          type="button"
          className="admin-burger"
          aria-label="Ouvrir le menu admin"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Fermer le menu"
          className="admin-drawer-overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={`admin-sidebar ${open ? "admin-sidebar-open" : ""}`}
        aria-hidden={!open && typeof window !== "undefined" && window.innerWidth < 1024}
      >
        <div className="admin-sidebar-head">
          <Link href="/admin" className="admin-brand">
            <Image
              src="/media/custombike-logo.jpg"
              alt="Custom Bike"
              width={40}
              height={40}
              className="admin-brand-logo"
            />
            <div>
              <p className="admin-brand-title">Custom Bike</p>
              <p className="admin-brand-subtitle">Cockpit atelier</p>
            </div>
          </Link>
          <button
            type="button"
            className="admin-drawer-close"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <AdminNav />
        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <p className="admin-user-name">{adminName}</p>
            <p className="admin-user-email">{adminEmail}</p>
          </div>
          <div className="admin-sidebar-footer-actions">
            <Link href="/" className="admin-footer-link">
              Voir le site
            </Link>
            <AdminSignOut />
          </div>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
