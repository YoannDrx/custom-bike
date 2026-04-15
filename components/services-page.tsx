import Image from "next/image";
import { FaqAccordion } from "@/components/faq-accordion";
import { ButtonLink, Reveal, SectionLabel } from "@/components/site-primitives";
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
      <section className="section-shell section-paper py-18 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel>Services</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-font mt-6 text-[3.6rem] leading-[0.9] text-[#111111] md:text-[5rem] xl:text-[5.8rem]">
                Réparer,
                <span className="block text-black/44">équiper et transformer.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/64">
                Custom Bike concentre dans un seul lieu la mécanique, l’entretien, les projets
                custom, l’accessoire, l’électronique, l’assurance, la vente et la location.
                Chaque service est pensé avec un niveau de restitution premium.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" label="Demander un devis" />
                <ButtonLink href={business.phoneHref} label={business.phoneDisplay} variant="ghost" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="feature-surface feature-surface-light">
              <p className="display-font text-[2.7rem] leading-none text-[#111111] md:text-[3.4rem]">
                Une lecture simple,
                <span className="block text-black/38">même quand le besoin est complexe.</span>
              </p>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {[
                  "Révision et entretien toutes cylindrées",
                  "Diagnostic, réparation et remise en état",
                  "LED, logos, covering, sellerie, accessoires",
                  "Prise en charge assurance, vente et location",
                ].map((item, index) => (
                  <Reveal
                    key={item}
                    delay={0.03 * index}
                    direction={index % 2 === 0 ? "left" : "right"}
                  >
                    <div className="service-chip service-chip-contrast">{item}</div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-8 grid gap-3 border-t border-black/10 pt-6 md:grid-cols-3">
                {[
                  { label: "Devis", value: "Rapide" },
                  { label: "Courtoisie", value: "Option payante" },
                  { label: "Horaires", value: "10h - 18h" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-black/42">
                      {item.label}
                    </p>
                    <p className="display-font mt-2 text-[2rem] leading-none text-[#111111]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-carbon py-22 text-white lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredServices.slice(0, 8).map((service, index) => (
              <Reveal key={service.slug} delay={0.03 * index}>
                <article className="editorial-card editorial-card-dark">
                  <p className="editorial-kicker">{service.subtitle}</p>
                  <h2 className="display-font mt-4 text-[2.1rem] leading-none text-white">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/64">{service.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {detailedServiceSections.map((section, index) => {
        const reversed = index % 2 === 1;

        return (
          <section
            key={section.title}
            className={`section-shell ${index === 1 ? "section-white" : "section-paper"} py-22 lg:py-28`}
          >
            <div
              className={`mx-auto grid w-full max-w-7xl gap-8 px-5 md:px-8 lg:px-10 ${
                reversed ? "lg:grid-cols-[1.08fr_0.92fr]" : "lg:grid-cols-[0.92fr_1.08fr]"
              }`}
            >
              <Reveal delay={0.05} direction={reversed ? "right" : "left"}>
                <div className={`image-panel min-h-[28rem] bg-black ${reversed ? "lg:order-2" : ""}`}>
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover"
                  />
                  <div className="service-image-overlay" />
                </div>
              </Reveal>

              <div className={reversed ? "lg:order-1" : ""}>
                <Reveal>
                  <SectionLabel>{section.title}</SectionLabel>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="display-font mt-6 text-[3.2rem] leading-[0.92] text-[#111111] md:text-[4.5rem]">
                    {section.title}
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-6 max-w-xl text-base leading-8 text-black/64">{section.intro}</p>
                </Reveal>

                <div className="mt-8 grid gap-3">
                  {section.details.map((detail, detailIndex) => (
                    <Reveal
                      key={detail}
                      delay={0.16 + detailIndex * 0.04}
                      direction={detailIndex % 2 === 0 ? "left" : "right"}
                    >
                      <div className="service-chip service-chip-contrast">{detail}</div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-shell section-metal py-22 text-white lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel tone="light">Tarifs indicatifs</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.4rem]">
                Des points d’entrée clairs,
                <span className="block text-white/56">puis un devis précis sur projet.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-sm leading-8 text-white/64">
                Les montants ci-dessous servent de repères visuels sur le site. Les demandes plus
                spécifiques, les transformations, les prises en charge assurance et les projets LED
                restent chiffrés sur devis.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pricingReference.map((item, index) => (
              <Reveal key={item.title} delay={0.03 * index}>
                <article className="pricing-card">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/42">
                    {item.title}
                  </p>
                  <p className="display-font mt-4 text-[3rem] leading-none text-white">
                    {item.price}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/64">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-white py-22 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel>Marques & accessoires</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-[#111111] md:text-[4.4rem]">
                Des partenaires qui servent
                <span className="block text-black/44">vraiment le résultat final.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/64">
                Échappements, variateurs, tabliers, manchons, LED ventilées, poignées chauffantes,
                alarme, USB, Bluetooth, casques et gants. Le site devait montrer une expertise
                concrète, pas une liste abstraite de services.
              </p>
            </Reveal>
          </div>

          <div className="brands-wall brands-wall-light">
            {brandPartners.map((brand, index) => (
              <Reveal key={brand} delay={0.03 * index}>
                <div className="brand-chip brand-chip-light">
                  <span className="display-font text-[2rem] leading-none text-[#111111]">{brand}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-oxide py-22 text-white lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel tone="light">FAQ atelier</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.5rem]">
                Les questions qui reviennent
                <span className="block text-white/56">avant un rendez-vous.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <FaqAccordion items={faqItems} tone="light" />
          </Reveal>
        </div>

        <div className="mx-auto mt-14 flex w-full max-w-7xl flex-wrap gap-3 px-5 md:px-8 lg:px-10">
          <ButtonLink href="/contact" label="Prendre rendez-vous" />
          <ButtonLink href={business.emailHref} label={business.email} variant="ghost" />
        </div>
      </section>
    </>
  );
}
