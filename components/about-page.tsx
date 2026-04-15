import Image from "next/image";
import { ButtonLink, HoverTile, Reveal, SectionLabel } from "@/components/site-primitives";
import { brandPartners, business, testimonials, trustGuests } from "@/lib/site-content";

const workshopValues = [
  {
    title: "Lecture claire",
    text: "Le client comprend le besoin, le geste atelier et le résultat visé sans friction ni surprise.",
  },
  {
    title: "Finition propre",
    text: "Un montage utile perd tout son intérêt s'il vieillit mal ou se lit comme du bricolage.",
  },
  {
    title: "Double culture",
    text: "La mécanique sérieuse et l'esthétique ne sont pas deux mondes séparés à Custom Bike.",
  },
  {
    title: "Ancrage local",
    text: "Montreuil, accueil réel, suivi simple, passage atelier et adresse très visible.",
  },
];

export function AboutPage() {
  return (
    <>
      <section className="section-shell px-4 pb-16 pt-4 md:px-6 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="pt-4">
              <Reveal>
                <SectionLabel tone="accent">À propos</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-font mt-6 text-[3.2rem] leading-[0.84] text-[var(--ink)] md:text-[5.2rem]">
                  Un atelier
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    qui remet en route
                  </span>
                  <span className="block">et en valeur.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Custom Bike à Montreuil, c&apos;est l&apos;atelier qui prend la machine entière en
                  compte : mécanique, esthétique, image et restitution propre. Précis, visuel,
                  urbain, premium et assumé sans surjouer.
                </p>
              </Reveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Multi-marques", value: "BMW, Honda, Yamaha…" },
                  { label: "Horaires", value: "10h — 18h" },
                  { label: "Offre", value: "Atelier + Custom + Mobilité" },
                  { label: "Adresse", value: "Montreuil / 93" },
                ].map((item, index) => (
                  <Reveal
                    key={item.label}
                    delay={0.2 + index * 0.04}
                    direction={index % 2 === 0 ? "left" : "right"}
                  >
                    <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                      <div className="neo-panel p-5">
                        <p className="neo-kicker">{item.label}</p>
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
                  alt="Atelier Custom Bike Montreuil"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
                <div className="hero-shot-overlay" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <p className="neo-kicker" style={{ color: "rgba(255,255,255,0.54)" }}>
                    Atelier / magasin / ancrage
                  </p>
                  <p
                    className="display-font mt-3 text-white md:text-[3.5rem]"
                    style={{ fontSize: "2.2rem", lineHeight: 0.88 }}
                  >
                    {business.address}
                  </p>
                  <p
                    className="mt-4 max-w-xl text-sm leading-7 md:text-base"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    L&apos;adresse ne se cache pas dans un footer. Elle fait partie du parcours et
                    de la confiance client.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell gta-dark-section px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Positionnement</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Pas seulement
                  <span className="block text-[var(--ink-soft)]">un garage mécanique.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-[var(--ink-soft)] md:text-base">
                L&apos;atelier prend la machine complète en compte : fonctionnement, confort, image,
                usage quotidien, accessoires et restitution propre à chaque intervention.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {workshopValues.map((value, index) => (
              <Reveal key={value.title} delay={0.03 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.6 : 0.6}>
                  <article className="neo-panel neo-panel-dark h-full p-5 md:p-6">
                    <p className="display-font text-[2rem] leading-[0.92] text-[var(--ink)]">
                      {value.title}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{value.text}</p>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionLabel>Confiance visible</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Des profils publics,
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    et le client du quotidien.
                  </span>
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
                <p className="neo-kicker">Retour client</p>
                <p className="mt-4 text-base leading-8 text-[var(--ink)] md:text-lg">
                  &ldquo;{testimonials[1].quote}&rdquo;
                </p>
                <footer className="mt-6 border-t pt-4" style={{ borderColor: "var(--line)" }}>
                  <p className="display-font text-[1.8rem] leading-none text-[var(--ink)]">
                    {testimonials[1].author}
                  </p>
                  <p className="mt-2 text-[0.7rem] uppercase tracking-[0.24em] text-[var(--ink-faint)]">
                    {testimonials[1].meta}
                  </p>
                </footer>
              </div>
            </Reveal>
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
                  Les bonnes références,
                  <span className="block" style={{ color: "rgba(255,255,255,0.62)" }}>
                    posées pour durer.
                  </span>
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

      <section className="section-shell px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="neo-panel neo-panel-metal p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                <div>
                  <SectionLabel>À suivre</SectionLabel>
                  <p className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                    Voir les services
                    <span className="block" style={{ color: "var(--vice-pink)" }}>
                      ou parler du projet.
                    </span>
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
