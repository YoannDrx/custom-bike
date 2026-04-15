import { ContactForm } from "@/components/contact-form";
import { ButtonLink, HoverTile, Reveal, SectionLabel } from "@/components/site-primitives";
import { business, faqItems } from "@/lib/site-content";

const contactCards = [
  {
    title: "Téléphone",
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
      <section className="section-shell px-4 pb-16 pt-4 md:px-6 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="pt-4">
              <Reveal>
                <SectionLabel tone="accent">Contact</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-font mt-6 text-[3.2rem] leading-[0.84] text-[var(--ink)] md:text-[5.2rem]">
                  Le bon canal,
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    au bon moment.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Appel, e-mail, formulaire ou passage atelier : choisissez le canal qui correspond
                  à votre besoin. L&apos;atelier répond vite et clairement.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href={business.phoneHref} label="Appeler maintenant" />
                  <ButtonLink
                    href={business.emailHref}
                    label="Envoyer un e-mail"
                    variant="secondary"
                  />
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
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
                        <p className="neo-kicker">{item.title}</p>
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
                  <p className="neo-kicker">Horaires</p>
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
                  <p className="neo-kicker">Réseaux</p>
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

      <section className="section-shell px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionLabel>Formulaire</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Décrivez votre besoin,
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    on s&apos;occupe du reste.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Type de besoin, véhicule, message structuré et bascule directe vers
                  l&apos;e-mail. Pré-brief utile pour un échange direct et efficace.
                </p>
              </Reveal>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section-shell gta-dark-section px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Avant de passer</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Les points qui évitent
                  <span className="block text-[var(--ink-soft)]">les allers-retours inutiles.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-[var(--ink-soft)] md:text-base">
                Quelques réponses courtes pour savoir quoi envoyer, quoi montrer et quand passer à
                l&apos;atelier sans perdre de temps.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqItems.slice(0, 4).map((item, index) => (
              <Reveal key={item.question} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                  <article className="neo-panel neo-panel-dark h-full p-5 md:p-6">
                    <p className="display-font text-[1.9rem] leading-[0.92] text-[var(--ink)]">
                      {item.question}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{item.answer}</p>
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
