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
                >
                  <span className="footer-social-icon">IG</span>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={business.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link footer-social-link"
                >
                  <span className="footer-social-icon">TK</span>
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
          <p className="footer-tagline">
            Repair · Custom · LED · Insurance · Mobility
          </p>
        </div>
      </div>
    </footer>
  );
}
