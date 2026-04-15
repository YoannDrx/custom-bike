import Image from "next/image";
import Link from "next/link";
import { business, navigation } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="footer-shell">
      <div className="footer-inner">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="neo-panel neo-panel-red p-6 md:p-7">
            <div className="flex items-center gap-4">
              <div className="site-brand-logo !h-[4.5rem] !w-[4.5rem] !rounded-[1.4rem] !border-white !shadow-none">
                <Image
                  src="/media/custombike-logo.jpg"
                  alt="Logo Custom Bike"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="neo-kicker text-white/70">Montreuil / atelier / custom</p>
                <p className="display-font mt-2 text-[2.7rem] leading-none">Custom Bike</p>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-8 text-white/78 md:text-base">
              Revisions, reparations, sellerie, accessoires, LED, dossiers assurance, vente et
              location. Le site devient aussi assumé que les machines qui sortent de l&apos;atelier.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={business.phoneHref} className="neo-button neo-button-secondary">
                <span>{business.phoneDisplay}</span>
                <span className="neo-button-mark" />
              </a>
              <a href={business.emailHref} className="neo-button neo-button-dark">
                <span>Ecrire</span>
                <span className="neo-button-mark" />
              </a>
            </div>
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
            <p className="footer-heading">Coordonnees</p>
            <div className="footer-list">
              <a href={business.phoneHref}>{business.phoneDisplay}</a>
              <a href={business.emailHref}>{business.email}</a>
              <a href={business.mapHref} target="_blank" rel="noreferrer">
                {business.address}
              </a>
            </div>
          </div>

          <div>
            <p className="footer-heading">Horaires & reseaux</p>
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
          <p>Custom Bike / Montreuil / Atelier moto & scooter</p>
          <p>Neo-brutaliste dehors, precision dedans</p>
        </div>
      </div>
    </footer>
  );
}
