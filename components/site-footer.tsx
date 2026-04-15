import Image from "next/image";
import Link from "next/link";
import { business, navigation } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="footer-shell">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.72fr_0.72fr_0.92fr]">
          <div>
            <div className="flex items-center gap-5">
              <div className="footer-logo-wrap">
                <Image
                  src="/media/custombike-logo.jpg"
                  alt="Logo Custom Bike"
                  width={90}
                  height={90}
                />
              </div>

              <div>
                <p className="display-font text-[3rem] leading-none text-[#111111]">
                  Custom Bike
                </p>
                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.34em] text-black/46">
                  Garage moto / scooter premium
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-8 text-black/62">
              Révision, réparation, accessoires, sellerie, LED, vente, location et prise en
              charge assurance pour motos et scooters à Montreuil.
            </p>
          </div>

          <div>
            <p className="footer-heading">Navigation</p>
            <div className="footer-list">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-heading">Coordonnées</p>
            <div className="footer-list">
              <a href={business.phoneHref}>{business.phoneDisplay}</a>
              <a href={business.emailHref}>{business.email}</a>
              <a href={business.mapHref} target="_blank" rel="noreferrer">
                {business.address}
              </a>
            </div>
          </div>

          <div>
            <p className="footer-heading">Horaires & réseaux</p>
            <div className="footer-list">
              {business.hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <a href={business.socials.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={business.socials.tiktok} target="_blank" rel="noreferrer">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Custom Bike - Montreuil</p>
          <p>Révision / Réparation / Accessoires / LED / Vente / Location</p>
        </div>
      </div>
    </footer>
  );
}
