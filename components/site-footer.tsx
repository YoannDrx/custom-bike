import Image from "next/image";
import Link from "next/link";
import { business, navigation } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="footer-shell">
      <div className="footer-inner">
        {/* Top row */}
        <div className="footer-top-grid">
          {/* Brand */}
          <div className="footer-brand-col">
            <div className="footer-brand-mark">
              <div className="footer-brand-logo">
                <Image
                  src="/media/custombike-logo.jpg"
                  alt="Logo Custom Bike"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="footer-brand-name">Custom Bike</p>
                <p className="footer-brand-sub">Montreuil · 93</p>
              </div>
            </div>

            <p className="footer-brand-text">
              Atelier moto &amp; scooter toutes cylindrées. Révisions, réparations, custom LED,
              accessoires, dossiers assurance, vente et location.
            </p>

            <div className="footer-contact-pills">
              <a href={business.phoneHref} className="footer-pill footer-pill-primary">
                {business.phoneDisplay}
              </a>
              <a href={business.emailHref} className="footer-pill">
                {business.email}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <p className="footer-col-heading">Pages</p>
            <ul className="footer-link-list">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Adresse */}
          <div className="footer-col">
            <p className="footer-col-heading">Adresse</p>
            <ul className="footer-link-list">
              <li>
                <a href={business.mapHref} target="_blank" rel="noreferrer" className="footer-link">
                  {business.address}
                </a>
              </li>
              <li className="footer-hours-block">
                {business.hours.map((line) => (
                  <span key={line} className="footer-hour-line">
                    {line}
                  </span>
                ))}
              </li>
            </ul>
          </div>

          {/* Réseaux */}
          <div className="footer-col">
            <p className="footer-col-heading">Réseaux</p>
            <ul className="footer-link-list">
              <li>
                <a
                  href={business.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link footer-social-link"
                  aria-label="Instagram Custom Bike"
                >
                  <span className="footer-social-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={business.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link footer-social-link"
                  aria-label="TikTok Custom Bike"
                >
                  <span className="footer-social-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.6 6.8c-1.6-.1-3-1-3.7-2.3-.3-.5-.5-1.1-.5-1.7V2.5h-3.3v12.8c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6 0 .8.1V9.4c-.3 0-.5-.1-.8-.1-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V9.5c1.3.9 2.9 1.5 4.6 1.5V7.7c-.1 0-.2 0-.4-.1z" />
                    </svg>
                  </span>
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Custom Bike · Montreuil, Seine-Saint-Denis
          </p>
          <nav className="footer-legal-links">
            <Link href="/mentions-legales" className="footer-legal-link">
              Mentions légales
            </Link>
            <span className="footer-legal-sep">·</span>
            <Link href="/cgv" className="footer-legal-link">
              CGV
            </Link>
            <span className="footer-legal-sep">·</span>
            <Link href="/confidentialite" className="footer-legal-link">
              Confidentialité
            </Link>
          </nav>
          <p className="footer-tagline">
            Repair · Custom · LED · Insurance · Mobility
          </p>
        </div>
      </div>
    </footer>
  );
}
