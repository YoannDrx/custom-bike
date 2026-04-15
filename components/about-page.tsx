import Image from "next/image";
import { ButtonLink, HoverTile, Reveal, SectionLabel } from "@/components/site-primitives";
import { brandPartners, business, testimonials, trustGuests } from "@/lib/site-content";

const workshopValues = [
  {
    title: "Lecture claire",
    text: "Le client doit comprendre le besoin, le geste atelier et le resultat vise sans friction.",
  },
  {
    title: "Finition propre",
    text: "Un montage utile perd tout son interet s'il vieillit mal ou s'il se lit comme du bricolage.",
  },
  {
    title: "Double culture",
    text: "La mecanique serieuse et l'esthetique ne sont pas traitees comme deux mondes separes.",
  },
  {
    title: "Ancrage local",
    text: "Montreuil, accueil reel, suivi simple, passage en atelier et adresse tres visible.",
  },
];

export function AboutPage() {
  return (
    <>
      <section className="section-shell px-4 pb-18 pt-4 md:px-6 lg:pb-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="pt-4">
              <Reveal>
                <SectionLabel tone="accent">A propos</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-font mt-6 text-[3.2rem] leading-[0.84] text-[var(--ink)] md:text-[5.2rem]">
                  Un atelier
                  <span className="block text-[var(--red)]">qui remet en route</span>
                  <span className="block">et remet en valeur.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  La refonte change le ton du site pour coller a l&apos;identite reelle de Custom
                  Bike: precis, visuel, urbain, premium et assume sans surjouer.
                </p>
              </Reveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Multi-marques", value: "BMW, Honda, Yamaha..." },
                  { label: "Cadence", value: "10h / 18h" },
                  { label: "Offre", value: "Atelier + custom + mobilite" },
                  { label: "Adresse", value: "Montreuil" },
                ].map((item, index) => (
                  <Reveal
                    key={item.label}
                    delay={0.2 + index * 0.04}
                    direction={index % 2 === 0 ? "left" : "right"}
                  >
                    <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                      <div className="neo-panel p-5">
                        <p className="neo-kicker text-[var(--ink-faint)]">{item.label}</p>
                        <p className="display-font mt-3 text-[1.9rem] leading-none text-[var(--ink)]">
                          {item.value}
                        </p>
                      </div>
                    </HoverTile>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="neo-image-frame min-h-[28rem] md:min-h-[34rem]">
                <Image
                  src="/media/hero-bmw.jpg"
                  alt="Atelier Custom Bike"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
                <div className="hero-shot-overlay" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <p className="neo-kicker text-white/60">Atelier / magasin / ancrage</p>
                  <p className="display-font mt-3 text-[2.5rem] leading-[0.88] text-white md:text-[4rem]">
                    {business.address}
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/76 md:text-base">
                    L&apos;adresse n&apos;est pas un detail de footer. Elle fait partie du parcours
                    et de la confiance.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell bg-[var(--ink)] px-4 py-18 text-white md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Positionnement</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-white md:text-[4.6rem]">
                  Pas seulement
                  <span className="block text-white/58">un garage mecanique.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-white/72 md:text-base">
                L&apos;atelier prend la machine complete en compte: fonctionnement, confort, image,
                usage quotidien, accessoires et restitution propre.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {workshopValues.map((value, index) => (
              <Reveal key={value.title} delay={0.03 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.6 : 0.6}>
                  <article className="neo-panel neo-panel-dark h-full p-5 md:p-6">
                    <p className="display-font text-[2rem] leading-[0.92] text-white">
                      {value.title}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-white/72">{value.text}</p>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-18 md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionLabel>Confiance visible</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Des profils publics,
                  <span className="block text-[var(--red)]">mais aussi le client du quotidien.</span>
                </h2>
              </Reveal>
              <div className="mt-8 flex flex-wrap gap-3">
                {trustGuests.map((guest, index) => (
                  <Reveal key={guest} delay={0.02 * index}>
                    <div className="neo-chip">{guest}</div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="neo-panel neo-panel-soft p-6 md:p-7">
                <p className="neo-kicker text-[var(--ink-faint)]">Retour client</p>
                <p className="mt-4 text-base leading-8 text-[var(--ink-soft)] md:text-lg">
                  &ldquo;{testimonials[1].quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-[var(--line)] pt-4">
                  <p className="display-font text-[1.8rem] leading-none text-[var(--ink)]">
                    {testimonials[1].author}
                  </p>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.24em] text-[var(--ink-faint)]">
                    {testimonials[1].meta}
                  </p>
                </footer>
              </div>
            </Reveal>
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
                  Les bonnes references,
                  <span className="block text-white/60">posees pour durer.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="flex flex-wrap gap-3">
                {brandPartners.map((brand, index) => (
                  <Reveal key={brand} delay={0.02 * index}>
                    <div className="neo-chip neo-chip-dark">{brand}</div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-18 md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="neo-panel neo-panel-metal p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                <div>
                  <SectionLabel>A suivre</SectionLabel>
                  <p className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                    Voir les services
                    <span className="block text-[var(--red)]">ou parler du projet.</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <ButtonLink href="/services" label="Voir les services" />
                  <ButtonLink href="/contact" label="Contacter l'atelier" variant="secondary" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
