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
      <section className="section-shell px-4 pb-16 pt-4 md:px-6 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="pt-4">
              <Reveal>
                <SectionLabel tone="accent">Services</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-font mt-6 text-[3.2rem] leading-[0.84] text-[var(--ink)] md:text-[5.3rem]">
                  Réparer,
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    équiper, transformer.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Révisions, réparations, personnalisation LED et gestion des dossiers assurance.
                  Un seul atelier, toute l&apos;amplitude du 50cc à la 1800cc.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" label="Demander un devis" />
                  <ButtonLink
                    href={business.phoneHref}
                    label={business.phoneDisplay}
                    variant="secondary"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="neo-panel neo-panel-dark p-6 md:p-7">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    "Révisions et entretien toutes cylindrées",
                    "Diagnostic, panne et remise en état",
                    "LED, accessoires, sellerie, covering",
                    "Assurance, vente, location et véhicule relais",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`neo-chip neo-chip-dark ${index === 1 ? "floating-sticker-delayed" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 border-t pt-6 md:grid-cols-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  {[
                    { label: "Lecture", value: "Claire" },
                    { label: "Atelier", value: "Multi-marques" },
                    { label: "Amplitude", value: "50cc → 1800cc" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="neo-kicker">{item.label}</p>
                      <p className="display-font mt-3 text-[1.9rem] leading-none text-[var(--ink)]">
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

      <section className="section-shell px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {detailedServiceSections.map((section, index) => (
              <Reveal key={section.title} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -1 : 1}>
                  <article
                    className={`neo-panel h-full p-4 md:p-5 ${index === 1 ? "neo-panel-soft" : index === 2 ? "neo-panel-metal" : ""}`}
                  >
                    <div className="neo-image-frame aspect-[4/3]">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        sizes="(min-width: 1024px) 31vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="neo-kicker mt-4">Bloc 0{index + 1}</p>
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

      <section className="section-shell gta-dark-section px-4 py-16 text-[var(--ink)] md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Catalogue vivant</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] md:text-[4.6rem]">
                  Tous les gestes
                  <span className="block" style={{ color: "var(--ink-soft)" }}>
                    qui structurent l&apos;atelier.
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-[var(--ink-soft)] md:text-base">
                Services réorganisés en collection de cartes : révision, réparation, custom, LED,
                accessoires, assurance et mobilité. Toute l&apos;offre en un coup d&apos;œil.
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
                      <p className="neo-kicker">{item.category}</p>
                      <span
                        className="rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--ink-soft)]"
                        style={{ borderColor: "rgba(255,255,255,0.12)" }}
                      >
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="display-font mt-4 text-[1.9rem] leading-[0.92] text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{item.description}</p>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel>Tarifs repère</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Des points d&apos;entrée,
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    pas des promesses floues.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Repères budgétaires clairs pour diagnostic, révision, accessoire et projet custom.
                  Les projets vraiment sur mesure restent sur devis.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="neo-panel neo-panel-soft p-6 md:p-7">
                <p className="neo-kicker">Lecture budgétaire</p>
                <p className="mt-4 text-base leading-8 text-[var(--ink-soft)]">
                  Chaque prestation affichée avec son prix d&apos;entrée et une description directe.
                  Pas de chiffres gonflés, pas de flou marketing.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pricingReference.map((item, index) => (
              <Reveal key={item.title} delay={0.03 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.6 : 0.6}>
                  <article
                    className={`neo-panel h-full p-5 md:p-6 ${index % 3 === 1 ? "neo-panel-soft" : index % 3 === 2 ? "neo-panel-metal" : ""}`}
                  >
                    <p className="neo-kicker">{item.title}</p>
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

      <section
        className="section-shell px-4 py-16 md:px-6 lg:py-20"
        style={{ background: "linear-gradient(135deg, var(--red-deep) 0%, var(--red) 100%)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Pièces &amp; partenaires</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-white md:text-[4.6rem]">
                  Des marques utiles,
                  <span className="block" style={{ color: "rgba(255,255,255,0.62)" }}>
                    pas du remplissage.
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-white/76 md:text-base">
                Akrapovic, LeoVince, Yasuni, Malossi, JCosta, Polini, Tucano, Bagster, Top Block,
                Tecno Globe. Chaque référence sert le résultat réel.
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

      <section className="section-shell gta-dark-section px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionLabel tone="light">FAQ atelier</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Les bonnes infos
                  <span className="block text-[var(--ink-soft)]">avant le rendez-vous.</span>
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
