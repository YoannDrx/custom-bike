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

    if (latest <= 16) {
      setCompact(false);
      setHidden(false);
      lastYRef.current = latest;
      return;
    }

    setCompact(latest > 34);

    if (Math.abs(delta) < 4) {
      return;
    }

    if (delta > 0 && latest > 140) {
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
      animate={{ y: hidden ? -140 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="site-header-frame">
        <motion.div
          className={`site-header-surface ${compact ? "site-header-surface-compact" : ""}`}
          initial={false}
          animate={{
            paddingTop: compact ? 12 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className={`site-header-inner ${compact ? "site-header-inner-compact" : ""}`}
            initial={false}
            animate={{
              borderRadius: compact ? 999 : 30,
              boxShadow: compact ? "0 18px 45px rgba(17,17,17,0.12)" : "0 10px 24px rgba(17,17,17,0.04)",
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" className="site-brand" onClick={() => setMobileOpen(false)}>
              <div className={`site-brand-mark ${compact ? "site-brand-mark-compact" : ""}`}>
                <Image
                  src="/media/custombike-logo.jpg"
                  alt="Logo Custom Bike"
                  width={84}
                  height={84}
                  className="site-brand-mark-image"
                />
              </div>

              <div className={`site-brand-copy ${compact ? "site-brand-copy-compact" : ""}`}>
                <p className="display-font site-brand-title">Custom Bike</p>
                <p className="site-brand-subtitle">Garage moto / scooter - Montreuil</p>
              </div>
            </Link>

            <nav className="site-desktop-nav">
              {navigation.map((item, index) => {
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.45 }}
                  >
                    <Link
                      href={item.href}
                      className={`nav-link ${active ? "nav-link-active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="site-header-actions">
              <a href={business.phoneHref} className="site-phone-pill">
                {business.phoneDisplay}
              </a>

              <button
                type="button"
                aria-label="Ouvrir le menu"
                className="mobile-toggle"
                onClick={() => setMobileOpen((open) => !open)}
              >
                <span />
                <span />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
            className="site-mobile-menu"
          >
            <div className="site-mobile-menu-inner">
              {navigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mobile-nav-link ${active ? "mobile-nav-link-active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="site-mobile-contact">
                <a href={business.phoneHref}>{business.phoneDisplay}</a>
                <a href={business.emailHref}>{business.email}</a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
