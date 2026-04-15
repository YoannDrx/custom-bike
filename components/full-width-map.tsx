import { ButtonLink, Reveal, SectionLabel } from "@/components/site-primitives";
import { business } from "@/lib/site-content";

export function FullWidthMap() {
  return (
    <section className="full-map-shell">
      <div className="full-map-grid">
        <Reveal>
          <div className="full-map-copy">
            <div className="full-map-card">
              <SectionLabel tone="light">Atelier / Montreuil</SectionLabel>
              <h2 className="display-font mt-6 text-[2.8rem] leading-[0.88] text-white md:text-[4rem]">
                Venir à
                <span className="block" style={{ color: "var(--vice-cyan)" }}>
                  l&apos;atelier.
                </span>
              </h2>
              <p className="mt-5 text-sm leading-8 md:text-base" style={{ color: "rgba(245,246,255,0.7)" }}>
                Réparations, accueil, prise en charge assurance, vente, location et projets custom :
                l&apos;expérience finit toujours au vrai comptoir, pas dans une promesse abstraite.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={business.mapHref} label="Ouvrir l'itinéraire" variant="secondary" external />
                <ButtonLink href={business.phoneHref} label="Appeler l'atelier" />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="full-map-info-chip">
                  <span className="full-map-info-dot" style={{ background: "var(--vice-pink)" }} />
                  {business.address}
                </div>
                <div className="full-map-info-chip">
                  <span className="full-map-info-dot" style={{ background: "var(--vice-cyan)" }} />
                  {business.phoneDisplay}
                </div>
                {business.hours.map((line) => (
                  <div key={line} className="full-map-info-chip">
                    <span className="full-map-info-dot" />
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="right">
          <div className="full-map-frame">
            <iframe
              loading="lazy"
              title="Carte Custom Bike Montreuil"
              src={business.mapEmbed}
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
