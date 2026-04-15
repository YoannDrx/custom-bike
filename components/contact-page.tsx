import { ContactForm } from "@/components/contact-form";
import { ButtonLink, HoverTile, Reveal, SectionLabel } from "@/components/site-primitives";
import { business, faqItems } from "@/lib/site-content";

const contactCards = [
  {
    title: "Telephone",
    value: business.phoneDisplay,
    href: business.phoneHref,
  },
  {
    title: "E-mail",
    value: business.email,
    href: business.emailHref,
  },
  {
    title: "Adresse",
    value: business.address,
    href: business.mapHref,
  },
];

export function ContactPage() {
  return (
    <>
      <section className="section-shell px-4 pb-18 pt-4 md:px-6 lg:pb-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="pt-4">
              <Reveal>
                <SectionLabel tone="accent">Contact</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-font mt-6 text-[3.2rem] leading-[0.84] text-[var(--ink)] md:text-[5.2rem]">
                  Le bon canal,
                  <span className="block text-[var(--red)]">au bon moment.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Appel, e-mail, formulaire ou passage atelier: la page devient plus immediate, plus
                  utile et plus structuree autour de la prise de contact reelle.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href={business.phoneHref} label="Appeler maintenant" />
                  <ButtonLink href={business.emailHref} label="Envoyer un e-mail" variant="secondary" />
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {contactCards.map((item, index) => (
                <Reveal key={item.title} delay={0.04 * index}>
                  <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="block"
                    >
                      <article className="neo-panel h-full p-5 md:p-6">
                        <p className="neo-kicker text-[var(--ink-faint)]">{item.title}</p>
                        <p className="display-font mt-4 text-[2rem] leading-[0.92] text-[var(--ink)]">
                          {item.value}
                        </p>
                      </article>
                    </a>
                  </HoverTile>
                </Reveal>
              ))}

              <Reveal delay={0.16}>
                <article className="neo-panel neo-panel-soft p-5 md:p-6">
                  <p className="neo-kicker text-[var(--ink-faint)]">Horaires</p>
                  <div className="mt-4 grid gap-3">
                    {business.hours.map((line) => (
                      <div key={line} className="neo-chip">
                        {line}
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>

              <Reveal delay={0.2}>
                <article className="neo-panel neo-panel-metal p-5 md:p-6">
                  <p className="neo-kicker text-[var(--ink-faint)]">Reseaux</p>
                  <div className="mt-4 grid gap-3">
                    <a
                      href={business.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-inline-link"
                    >
                      Instagram
                    </a>
                    <a
                      href={business.socials.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-inline-link"
                    >
                      TikTok
                    </a>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell px-4 py-18 md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionLabel>Formulaire</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Decrire juste ce qu&apos;il faut,
                  <span className="block text-[var(--red)]">sans noyer le sujet.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Le formulaire sert maintenant de pre-brief: type de besoin, vehicule, message
                  structure et bascule directe vers l&apos;e-mail.
                </p>
              </Reveal>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--ink)] px-4 py-18 text-white md:px-6 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Avant de passer</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-white md:text-[4.6rem]">
                  Les points qui evitent
                  <span className="block text-white/58">les allers-retours inutiles.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-white/72 md:text-base">
                Quelques reponses courtes suffisent pour savoir quoi envoyer, quoi montrer et quand
                passer a l&apos;atelier.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqItems.slice(0, 4).map((item, index) => (
              <Reveal key={item.question} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                  <article className="neo-panel neo-panel-dark h-full p-5 md:p-6">
                    <p className="display-font text-[1.9rem] leading-[0.92] text-white">
                      {item.question}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-white/72">{item.answer}</p>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
