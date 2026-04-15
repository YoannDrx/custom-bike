import { ButtonLink, Reveal, SectionLabel } from "@/components/site-primitives";
import { business } from "@/lib/site-content";

export function FullWidthMap() {
  return (
    <section className="full-map-shell">
      <div className="full-map-grid">
        <Reveal>
          <div className="full-map-copy">
            <div className="neo-panel neo-panel-red full-map-card">
              <SectionLabel tone="accent">Atelier / Montreuil</SectionLabel>
              <h2 className="display-font mt-6 text-[2.8rem] leading-[0.88] text-white md:text-[4rem]">
                L&apos;atelier est physique,
                <span className="block text-white/72">la signature aussi.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-8 text-white/78 md:text-base">
                Reparations, accueil, prise en charge assurance, vente, location et projets custom:
                l&apos;experience finit toujours au vrai comptoir, pas dans une promesse abstraite.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={business.mapHref} label="Ouvrir l'itineraire" variant="secondary" external />
                <ButtonLink href={business.phoneHref} label="Appeler l'atelier" variant="dark" />
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div className="neo-chip neo-chip-dark">{business.address}</div>
                <div className="neo-chip neo-chip-dark">{business.phoneDisplay}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="right">
          <div className="full-map-frame">
            <iframe
              loading="lazy"
              title="Carte Custom Bike"
              src={business.mapEmbed}
              className="h-full w-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
