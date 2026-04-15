import Image from "next/image";
import { ButtonLink, HoverTile, Reveal, SectionLabel } from "@/components/site-primitives";
import { business, featuredProjects } from "@/lib/site-content";

const mobilityHighlights = [
  {
    title: "Vente",
    text: "Neuf, occasion ou véhicule préparé selon arrivage et niveau de finition attendu.",
  },
  {
    title: "Location",
    text: "Solution ponctuelle, besoin urbain ou usage temporaire plus simple à cadrer.",
  },
  {
    title: "Courtoisie",
    text: "Véhicule relais possible en option payante selon planning et immobilisation atelier.",
  },
];

const mobilitySteps = [
  {
    step: "01",
    title: "Exprimer le besoin",
    text: "Achat, location, relais atelier ou besoin de mobilité pendant une immobilisation.",
  },
  {
    step: "02",
    title: "Recevoir une proposition",
    text: "Disponibilité, budget, durée et niveau de préparation clarifiés rapidement.",
  },
  {
    step: "03",
    title: "Repartir proprement",
    text: "Prise en main, restitution ou bascule vers une autre solution selon le contexte.",
  },
];

const availabilityCards = [
  "Vente selon arrivage réel",
  "Location urbaine ou relais atelier",
  "Préparation esthétique et accessoires possibles",
  "Conseil pour choisir le bon format",
];

export function VenteLocationPage() {
  return (
    <>
      <section className="section-shell px-4 pb-16 pt-4 md:px-6 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="pt-4">
              <Reveal>
                <SectionLabel tone="accent">Vente &amp; location</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-font mt-6 text-[3.2rem] leading-[0.84] text-[var(--ink)] md:text-[5.2rem]">
                  Rester mobile,
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    même hors atelier.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Vente neuf et occasion selon arrivage, location ponctuelle et véhicule de
                  courtoisie en option payante. Des solutions concrètes, sans promesse floue.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" label="Vérifier les disponibilités" />
                  <ButtonLink
                    href={business.phoneHref}
                    label="Appeler l'atelier"
                    variant="secondary"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="neo-image-frame min-h-[28rem] md:min-h-[34rem]">
                <Image
                  src="/media/tiktok-overview.jpg"
                  alt="Vente et location Custom Bike"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
                <div className="hero-shot-overlay" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <p className="neo-kicker" style={{ color: "rgba(255,255,255,0.52)" }}>
                    Mobilité / solution / relais
                  </p>
                  <p
                    className="display-font mt-3 text-white md:text-[3.5rem]"
                    style={{ fontSize: "2.2rem", lineHeight: 0.88 }}
                  >
                    Vente, location,
                    <span className="block">courtoisie.</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {mobilityHighlights.map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                  <article
                    className={`neo-panel h-full p-5 md:p-6 ${index === 1 ? "neo-panel-soft" : index === 2 ? "neo-panel-metal" : ""}`}
                  >
                    <p className="display-font text-[2.1rem] leading-[0.92] text-[var(--ink)]">
                      {item.title}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{item.text}</p>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell gta-dark-section px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Parcours simple</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Trois étapes,
                  <span className="block text-[var(--ink-soft)]">pas de brouillard.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-[var(--ink-soft)] md:text-base">
                Vente et location gardent une logique atelier : cadrage rapide, proposition claire,
                restitution ou relais propre selon le contexte.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {mobilitySteps.map((item, index) => (
              <Reveal key={item.step} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                  <article className="neo-panel neo-panel-dark h-full p-5 md:p-6">
                    <p
                      className="display-font text-[2.6rem] leading-none"
                      style={{ color: "rgba(0,212,255,0.4)" }}
                    >
                      {item.step}
                    </p>
                    <p className="display-font mt-4 text-[1.8rem] leading-[0.92] text-[var(--ink)]">
                      {item.title}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{item.text}</p>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel>Disponibilité</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Honnête sur le stock,
                  <span className="block" style={{ color: "var(--vice-cyan)" }}>
                    utile au quotidien.
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="neo-panel neo-panel-soft p-6 md:p-7">
                <p className="neo-kicker">Ce qui est assumé</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {availabilityCards.map((item) => (
                    <div key={item} className="neo-chip">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.title} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                  <a href={project.url} target="_blank" rel="noreferrer" className="block">
                    <article
                      className={`neo-panel h-full p-4 md:p-5 ${index === 1 ? "neo-panel-soft" : index === 3 ? "neo-panel-metal" : ""}`}
                    >
                      <div className="neo-image-frame aspect-[4/5]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="neo-kicker mt-4">{project.category}</p>
                      <h3 className="display-font mt-3 text-[1.8rem] leading-[0.9] text-[var(--ink)]">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                        {project.subtitle}
                      </p>
                    </article>
                  </a>
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
          <Reveal>
            <div className="neo-panel neo-panel-dark p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                <div>
                  <SectionLabel tone="light">Prise de contact</SectionLabel>
                  <p className="mt-6 text-base leading-8 text-white/80 md:text-lg">
                    La disponibilité varie selon arrivage et planning. Le bon réflexe : un appel
                    ou un message pour obtenir une réponse rapide et concrète.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <ButtonLink href="/contact" label="Nous écrire" variant="secondary" />
                  <ButtonLink
                    href={business.phoneHref}
                    label={business.phoneDisplay}
                    variant="ghost"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
