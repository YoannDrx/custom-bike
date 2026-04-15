import { ContactForm } from "@/components/contact-form";
import { ButtonLink, Reveal, SectionLabel } from "@/components/site-primitives";
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
      <section className="section-shell section-paper py-18 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel>Contact</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-font mt-6 text-[3.6rem] leading-[0.9] text-[#111111] md:text-[5rem] xl:text-[5.8rem]">
                Parler du besoin,
                <span className="block text-black/44">puis lancer le bon rendez-vous.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/64">
                Révision, réparation, assurance, LED, accessoires, vente, location ou projet plus
                visuel: le contact doit être simple, direct et suffisamment clair pour éviter les
                allers-retours inutiles.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={business.phoneHref} label="Appeler maintenant" />
                <ButtonLink href={business.emailHref} label="Envoyer un e-mail" variant="ghost" />
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {contactCards.map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="editorial-card editorial-card-light block"
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-black/42">
                    {item.title}
                  </p>
                  <p className="display-font mt-5 text-[2.2rem] leading-none text-[#111111]">
                    {item.value}
                  </p>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              <article className="editorial-card editorial-card-light">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-black/42">
                  Horaires
                </p>
                <div className="mt-5 space-y-3">
                  {business.hours.map((line) => (
                    <p key={line} className="text-sm leading-7 text-black/62">
                      {line}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.2}>
              <article className="editorial-card editorial-card-light">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-black/42">
                  Réseaux
                </p>
                <div className="mt-5 flex flex-col gap-3">
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

            <Reveal delay={0.24}>
              <article className="editorial-card editorial-card-light">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-black/42">
                  Pratique
                </p>
                <p className="mt-5 text-sm leading-7 text-black/62">
                  Véhicule de courtoisie possible en option payante selon disponibilité. Le plus
                  simple est de le signaler dès la première prise de contact.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell section-white py-22 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel>Formulaire</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-[#111111] md:text-[4.4rem]">
                Expliquer le projet,
                <span className="block text-black/44">pour obtenir une réponse plus juste.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/64">
                Plus la demande est claire, plus le retour atelier peut l’être aussi. Le
                formulaire reprend les besoins les plus fréquents pour gagner du temps dès le premier échange.
              </p>
            </Reveal>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="section-shell section-carbon py-22 text-white lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel tone="light">Avant de passer</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.4rem]">
                Préparer le bon échange,
                <span className="block text-white/56">sans friction inutile.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.slice(0, 4).map((item, index) => (
              <Reveal key={item.question} delay={0.04 * index}>
                <article className="editorial-card editorial-card-dark h-full">
                  <p className="display-font text-[2rem] leading-none text-white">{item.question}</p>
                  <p className="mt-4 text-sm leading-7 text-white/64">{item.answer}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
