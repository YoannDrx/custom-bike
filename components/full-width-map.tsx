import { business } from "@/lib/site-content";

export function FullWidthMap() {
  return (
    <section className="full-map-shell">
      <div className="full-map-copy">
        <div className="full-map-copy-inner">
          <p className="full-map-label">Atelier Custom Bike</p>
          <h2 className="display-font text-[3rem] leading-none text-white md:text-[4.2rem]">
            Montreuil, au coeur des projets
            <span className="block text-white/56">moto et scooter.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/66 md:text-base">
            Atelier, magasin, prise en charge, devis, custom, accessoires, assurance et
            restitution. L’adresse doit être visible, assumée et ancrée dans l’expérience du site.
          </p>
          <div className="full-map-address">
            <span>{business.address}</span>
            <span>{business.phoneDisplay}</span>
          </div>
        </div>
      </div>

      <div className="full-map-frame">
        <iframe
          loading="lazy"
          title="Carte Custom Bike"
          src={business.mapEmbed}
          className="h-full w-full border-0"
        />
      </div>
    </section>
  );
}
