"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { business, navigation } from "@/lib/site-content";
import { authClient } from "@/lib/auth-client";
import { LoginModal } from "@/components/auth/login-modal";

export function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastYRef.current;

    if (latest <= 24) {
      setCompact(false);
      setHidden(false);
      lastYRef.current = latest;
      return;
    }

    setCompact(latest > 44);

    if (Math.abs(delta) < 5) return;

    if (delta > 0 && latest > 170 && !mobileOpen) {
      setHidden(true);
    } else if (delta < 0) {
      setHidden(false);
    }

    lastYRef.current = latest;
  });

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.header
      className="site-header-shell"
      initial={false}
      animate={{ y: hidden ? "-132%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="site-header-frame">
        <div className={`site-header-surface ${compact ? "site-header-surface-compact" : ""}`}>
          {/* Brand */}
          <Link
            href="/"
            className="site-brand"
            aria-label="Retour à l'accueil Custom Bike"
            onClick={() => setMobileOpen(false)}
          >
            <div className={`site-brand-logo ${compact ? "site-brand-logo-compact" : ""}`}>
              <Image
                src="/media/custombike-logo.jpg"
                alt="Logo Custom Bike"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="site-brand-copy">
              <p className="site-brand-title">Custom Bike</p>
              <p className="site-brand-subtitle">Repairs · LED Custom · Insurance · Mobility</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="site-nav" aria-label="Navigation principale">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav-link ${isActive(item.href) ? "site-nav-link-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="site-header-actions">
            <a href={business.phoneHref} className="site-phone-chip">
              {business.phoneDisplay}
            </a>

            <Link
              href="/panier"
              aria-label={`Panier${cartCount ? ` (${cartCount})` : ""}`}
              className="header-icon-chip"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[1.1rem] w-[1.1rem]"
              >
                <path d="M4 4h2l2 12h11l2-8H7" />
                <circle cx="9" cy="20" r="1.6" />
                <circle cx="18" cy="20" r="1.6" />
              </svg>
              {cartCount > 0 ? (
                <span className="header-icon-badge">{cartCount > 99 ? "99+" : cartCount}</span>
              ) : null}
            </Link>

            {session ? (
              <Link
                href={isAdmin ? "/admin" : "/compte"}
                aria-label={isAdmin ? "Dashboard admin" : "Mon compte"}
                className="header-icon-chip"
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[1.1rem] w-[1.1rem]"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M4 20c1.5-3.5 4.8-5 8-5s6.5 1.5 8 5" />
                </svg>
                {isAdmin ? <span className="header-icon-dot" /> : null}
              </Link>
            ) : (
              <button
                type="button"
                aria-label="Se connecter"
                className="header-icon-chip"
                onClick={() => {
                  setMobileOpen(false);
                  setLoginOpen(true);
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[1.1rem] w-[1.1rem]"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M4 20c1.5-3.5 4.8-5 8-5s6.5 1.5 8 5" />
                </svg>
              </button>
            )}

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className={`mobile-toggle ${mobileOpen ? "mobile-toggle-open" : ""}`}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="burger-bar" />
              <span className="burger-bar burger-bar-mid" />
              <span className="burger-bar" />
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <motion.div
              className="site-mobile-sheet"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="site-mobile-sheet-inner">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`site-mobile-link ${isActive(item.href) ? "site-mobile-link-active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span
                      className="text-xl"
                      style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
                    >
                      +
                    </span>
                  </Link>
                ))}

                <div className="site-mobile-meta">
                  <a href={business.phoneHref} className="neo-button neo-button-primary">
                    <span>Appeler — {business.phoneDisplay}</span>
                    <span className="neo-button-mark" />
                  </a>
                  <a href={business.emailHref} className="neo-button neo-button-secondary">
                    <span>Écrire un email</span>
                    <span className="neo-button-mark" />
                  </a>
                  <a
                    href={business.mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="neo-button neo-button-ghost"
                  >
                    <span>{business.address}</span>
                    <span className="neo-button-mark" />
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </motion.header>
  );
}
