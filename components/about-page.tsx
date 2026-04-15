import Image from "next/image";
import { ButtonLink, Reveal, SectionLabel, Stars } from "@/components/site-primitives";
import { brandPartners, business, testimonials, trustGuests } from "@/lib/site-content";

export function AboutPage() {
  return (
    <>
      <section className="section-shell section-paper py-22 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel>À propos</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-font mt-6 text-[3.6rem] leading-[0.9] text-[#111111] md:text-[5rem]">
                Un atelier pensé
                <span className="block text-black/44">pour rouler, réparer et signer.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/64">
                Custom Bike accueille les motos, scooters et trois-roues dans un atelier à
                Montreuil où la mécanique sérieuse rencontre une vraie culture du détail visuel.
                L’objectif n’est pas seulement de remettre en route, mais de remettre en valeur.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="image-panel min-h-[30rem] bg-black">
              <Image
                src="/media/hero-bmw.jpg"
                alt="Atelier Custom Bike"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="hero-main-overlay" />
              <div className="masonry-copy">
                <p className="project-kicker">Atelier / magasin</p>
                <p className="display-font text-[2.6rem] leading-none text-white">
                  {business.address}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-carbon py-22 text-white lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Multi-marques",
                text: "BMW, Honda, Yamaha, scooters urbains et machines plus exigeantes.",
              },
              {
                title: "50cc à 1800cc",
                text: "L'atelier couvre les petites cylindrées comme les projets plus lourds.",
              },
              {
                title: "10h - 18h",
                text: "Une plage horaire claire, pensée pour simplifier le passage atelier.",
              },
              {
                title: "Vente & location",
                text: "Le site assume aussi la partie mobilité, pas uniquement la réparation.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index}>
                <article className="assurance-card h-full">
                  <p className="display-font text-[2.2rem] leading-none text-white">{item.title}</p>
                  <p className="mt-4 text-sm leading-7 text-white/66">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-white py-22 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel>Notre manière de travailler</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-[#111111] md:text-[4.4rem]">
                Sérieux mécanique,
                <span className="block text-black/44">lecture esthétique.</span>
              </h2>
            </Reveal>
          </div>

          <div className="space-y-6">
            {[
              "Devis clairs avant intervention et suivi lisible côté atelier.",
              "Réparations, révisions, accessoires et projets custom au même endroit.",
              "Véhicule de courtoisie possible en option payante selon disponibilité.",
              "Sélection de pièces et de marques reconnues pour éviter les montages médiocres.",
            ].map((line, index) => (
              <Reveal key={line} delay={0.05 * index} direction={index % 2 === 0 ? "left" : "right"}>
                <div className="contact-card">
                  <p className="text-sm leading-8 text-black/64">{line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-metal py-22 text-white lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel tone="light">Pièces & partenaires</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.5rem]">
                Des références utiles,
                <span className="block text-white/54">pas des accessoires choisis au hasard.</span>
              </h2>
            </Reveal>
          </div>

          <div className="brands-wall">
            {brandPartners.map((brand, index) => (
              <Reveal key={brand} delay={0.03 * index}>
                <div className="brand-chip">
                  <span className="display-font text-[2rem] leading-none text-white">{brand}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-oxide py-22 text-white lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel tone="light">Confiance</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.5rem]">
                Une clientèle large,
                <span className="block text-white/56">des profils publics aux clients du quotidien.</span>
              </h2>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-3">
              {trustGuests.map((guest, index) => (
                <Reveal key={guest} delay={0.03 * index}>
                  <div className="trust-pill">{guest}</div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.14}>
            <div className="testimonial-stage">
              <Stars />
              <p className="mt-6 text-2xl leading-10 text-white md:text-[2rem] md:leading-[1.7]">
                &ldquo;{testimonials[1].quote}&rdquo;
              </p>
              <footer className="mt-8 border-t border-white/10 pt-5">
                <p className="display-font text-[2rem] leading-none text-white">
                  {testimonials[1].author}
                </p>
                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.3em] text-white/50">
                  {testimonials[1].meta}
                </p>
              </footer>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-paper py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-3 px-5 md:px-8 lg:px-10">
          <ButtonLink href="/services" label="Voir les services" variant="light" />
          <ButtonLink href="/contact" label="Contacter l'atelier" variant="ghost" />
        </div>
      </section>
    </>
  );
}
