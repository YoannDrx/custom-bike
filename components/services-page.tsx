import Image from "next/image";
import { FaqAccordion } from "@/components/faq-accordion";
import { ButtonLink, HoverTile, Reveal, SectionLabel } from "@/components/site-primitives";
import {
  brandPartners,
  business,
  detailedServiceSections,
  faqItems,
  featuredServices,
  pricingReference,
} from "@/lib/site-content";

export function ServicesPage() {
  return (
    <>
      <section className="section-shell px-4 pb-18 pt-4 md:px-6 lg:pb-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="pt-4">
              <Reveal>
                <SectionLabel tone="accent">Services</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-font mt-6 text-[3.2rem] leading-[0.84] text-[var(--ink)] md:text-[5.3rem]">
                  Reparer,
                  <span className="block text-[var(--red)]">equiper, transformer.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Toute la page a ete repensee comme une carte d&apos;offres lisible: moins de
                  texte, plus de blocs utiles, plus de sensation de matiere et de precision.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" label="Demander un devis" />
                  <ButtonLink href={business.phoneHref} label={business.phoneDisplay} variant="secondary" />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="neo-panel neo-panel-dark p-6 md:p-7">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    "Revisions et entretien toutes cylindrees",
                    "Diagnostic, panne et remise en etat",
                    "LED, accessoires, sellerie, covering",
                    "Assurance, vente, location et vehicule relais",
                  ].map((item, index) => (
                    <div key={item} className={`neo-chip neo-chip-dark ${index === 1 ? "floating-sticker-delayed" : ""}`}>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
                  {[
                    { label: "Lecture", value: "Claire" },
                    { label: "Atelier", value: "Multi-marques" },
                    { label: "Amplitude", value: "50cc > 1800cc" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="neo-kicker text-white/52">{item.label}</p>
                      <p className="display-font mt-3 text-[1.9rem] leading-none text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell px-4 py-18 md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {detailedServiceSections.map((section, index) => (
              <Reveal key={section.title} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -1 : 1}>
                  <article className={`neo-panel h-full p-4 md:p-5 ${index === 1 ? "neo-panel-soft" : index === 2 ? "neo-panel-metal" : ""}`}>
                    <div className="neo-image-frame aspect-[4/3]">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        sizes="(min-width: 1024px) 31vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="neo-kicker mt-4 text-[var(--ink-faint)]">Bloc 0{index + 1}</p>
                    <h2 className="display-font mt-3 text-[2rem] leading-[0.9] text-[var(--ink)]">
                      {section.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{section.intro}</p>
                    <div className="mt-4 grid gap-2">
                      {section.details.map((detail) => (
                        <div key={detail} className="neo-chip">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--ink)] px-4 py-18 text-white md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Catalogue vivant</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-white md:text-[4.6rem]">
                  Tous les gestes
                  <span className="block text-white/58">qui structurent l&apos;atelier.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-white/70 md:text-base">
                Les services sont reorganises comme une collection de cartes epaisses: on garde la
                densite de l&apos;offre, mais avec une hierarchie visuelle beaucoup plus nette.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((item, index) => (
              <Reveal key={item.slug} delay={0.03 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.7 : 0.7}>
                  <article className="neo-panel neo-panel-dark h-full p-4 md:p-5">
                    <div className="neo-image-frame aspect-[4/3]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="neo-kicker text-white/52">{item.category}</p>
                      <span className="rounded-full border-4 border-white bg-transparent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em]">
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="display-font mt-4 text-[1.9rem] leading-[0.92] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/72">{item.description}</p>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell px-4 py-18 md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel>Tarifs repere</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Des points d&apos;entree,
                  <span className="block text-[var(--red)]">pas des promesses floues.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Le design expose les reperes utiles sans casser la logique devis pour les projets
                  vraiment sur mesure.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="neo-panel neo-panel-soft p-6 md:p-7">
                <p className="neo-kicker text-[var(--ink-faint)]">Lecture budgetaire</p>
                <p className="mt-4 text-base leading-8 text-[var(--ink-soft)]">
                  Diagnostic, revision, accessoire et projet custom s&apos;affichent comme des
                  cartes lisibles, avec assez de details pour rassurer sans surcharger.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pricingReference.map((item, index) => (
              <Reveal key={item.title} delay={0.03 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.6 : 0.6}>
                  <article className={`neo-panel h-full p-5 md:p-6 ${index % 3 === 1 ? "neo-panel-soft" : index % 3 === 2 ? "neo-panel-metal" : ""}`}>
                    <p className="neo-kicker text-[var(--ink-faint)]">{item.title}</p>
                    <p className="display-font mt-4 text-[2.8rem] leading-none text-[var(--ink)]">
                      {item.price}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                      {item.description}
                    </p>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--red)] px-4 py-18 text-white md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Pieces & partenaires</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-white md:text-[4.6rem]">
                  Des marques utiles,
                  <span className="block text-white/58">pas du remplissage.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-white/76 md:text-base">
                Echappements, variateurs, LED ventilees, poignets chauffantes, alarme ou bagagerie:
                chaque reference doit servir le resultat reel, pas juste la liste marketing.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {brandPartners.map((brand, index) => (
              <Reveal key={brand} delay={0.02 * index}>
                <div className="neo-chip neo-chip-dark">{brand}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--ink)] px-4 py-18 text-white md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionLabel tone="light">FAQ atelier</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-white md:text-[4.6rem]">
                  Les bonnes infos
                  <span className="block text-white/58">avant le rendez-vous.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" label="Prendre rendez-vous" variant="secondary" />
                  <ButtonLink href={business.emailHref} label={business.email} variant="ghost" />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <FaqAccordion items={faqItems} tone="light" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
