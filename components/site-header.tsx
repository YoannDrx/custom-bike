"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { business, navigation } from "@/lib/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastYRef.current;

    if (latest <= 24) {
      setCompact(false);
      setHidden(false);
      lastYRef.current = latest;
      return;
    }

    setCompact(latest > 44);

    if (Math.abs(delta) < 5) {
      return;
    }

    if (delta > 0 && latest > 170 && !mobileOpen) {
      setHidden(true);
    } else if (delta < 0) {
      setHidden(false);
    }

    lastYRef.current = latest;
  });

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.header
      className="site-header-shell"
      initial={false}
      animate={{ y: hidden ? -150 : 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="site-header-frame">
        <div className={`site-header-surface ${compact ? "site-header-surface-compact" : ""}`}>
          <Link
            href="/"
            className="site-brand"
            aria-label="Retour a l'accueil Custom Bike"
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
              <span className="site-brand-topline">
                Montreuil
                <span aria-hidden="true">/</span>
                Atelier
              </span>
              <p className="display-font site-brand-title">Custom Bike</p>
              <p className="site-brand-subtitle">Moto, scooter, custom, LED, assurance</p>
            </div>
          </Link>

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

          <div className="site-header-actions">
            <a href={business.phoneHref} className="site-phone-chip">
              {business.phoneDisplay}
            </a>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className={`mobile-toggle ${mobileOpen ? "mobile-toggle-open" : ""}`}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <motion.div
              className="site-mobile-sheet"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
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
                    <span className="display-font text-xl">+</span>
                  </Link>
                ))}

                <div className="site-mobile-meta">
                  <a href={business.phoneHref} className="neo-button neo-button-primary">
                    <span>Appeler</span>
                    <span className="neo-button-mark" />
                  </a>
                  <a href={business.emailHref} className="neo-button neo-button-secondary">
                    <span>E-mail</span>
                    <span className="neo-button-mark" />
                  </a>
                  <a href={business.mapHref} target="_blank" rel="noreferrer" className="neo-chip">
                    {business.address}
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
