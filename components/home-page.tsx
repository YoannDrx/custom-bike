"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { FaqAccordion } from "@/components/faq-accordion";
import { ButtonLink, Reveal, SectionLabel, Stars, TypewriterText } from "@/components/site-primitives";
import {
  brandPartners,
  business,
  corePromises,
  detailedServiceSections,
  faqItems,
  featuredProjects,
  featuredServices,
  heroTypingPhrases,
  pricingReference,
  testimonials,
  trustGuests,
} from "@/lib/site-content";

const heroSlides = [
  {
    title: "BMW RT / GS",
    kicker: "Signature lumineuse",
    image: "/media/hero-bmw.jpg",
    description:
      "Révision, pose LED, accessoires et finitions propres pour des machines à forte présence visuelle.",
  },
  {
    title: "Goldwing",
    kicker: "Logo LED",
    image: "/media/goldwing-led.jpg",
    description:
      "Des intégrations premium qui changent immédiatement la lecture de la moto, de jour comme de nuit.",
  },
  {
    title: "Compteur M Sport",
    kicker: "Programmation",
    image: "/media/tiktok-msport.jpg",
    description:
      "L'expérience Custom Bike ne s'arrête pas à la carrosserie : l'atelier travaille aussi l'instrumentation et les accessoires utiles.",
  },
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const heroVisualY = useTransform(scrollY, [0, 600], [0, -60]);
  const heroBrandY = useTransform(scrollY, [0, 600], [0, -26]);
  const heroThumbX = useTransform(scrollY, [0, 600], [0, 24]);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    const testimonialTimer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => {
      window.clearInterval(slideTimer);
      window.clearInterval(testimonialTimer);
    };
  }, []);

  const currentSlide = heroSlides[activeSlide];
  const currentReview = testimonials[activeTestimonial];

  return (
    <>
      <section id="home" className="section-shell section-paper hero-radial">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div className="hero-screen flex flex-col justify-center py-10">
            <Reveal>
              <SectionLabel>Garage moto / scooter / accessoires à Montreuil</SectionLabel>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 display-font text-[4rem] leading-[0.88] text-[#111111] sm:text-[5rem] xl:text-[7.2rem]">
                Entretien,
                <span className="block text-[#d61121]">custom</span>
                <span className="block">et présence visuelle</span>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 max-w-2xl text-base leading-8 text-black/68 md:text-lg">
                Votre spécialiste du deux-roues et du trois-roues vous accueille à Montreuil
                pour la révision, la réparation, la vente, la location, la sellerie, le covering,
                les accessoires, les LED et la prise en charge assurance.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-4 text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-black/46">
                <TypewriterText words={heroTypingPhrases} />
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/contact" label="Demander un devis" />
                <ButtonLink href="/services" label="Découvrir les services" variant="ghost" />
                <ButtonLink
                  href={business.socials.instagram}
                  label="Instagram"
                  variant="ghost"
                  external
                />
              </div>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {corePromises.map((item, index) => (
                <Reveal key={item} delay={0.34 + index * 0.04} direction={index % 2 === 0 ? "left" : "right"}>
                  <motion.div className="metric-pill" whileHover={{ y: -4, x: 3 }}>
                    {item}
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="hero-screen flex items-center py-10">
            <div className="hero-stage">
              <motion.div
                className="hero-brand-card"
                style={{ y: heroBrandY }}
                initial={{ opacity: 0, scale: 0.94, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.14 }}
                whileHover={{ y: -5 }}
              >
                <div className="hero-brand-mark">
                  <Image
                    src="/media/custombike-logo.jpg"
                    alt="Logo Custom Bike"
                    width={134}
                    height={134}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="display-font text-[3rem] leading-none text-[#111111] md:text-[3.8rem]">
                    Custom Bike
                  </p>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.34em] text-black/46">
                    Atelier / magasin / vente / location
                  </p>
                </div>
              </motion.div>

              <motion.div className="image-panel hero-visual-panel" style={{ y: heroVisualY }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.image}
                    initial={{ opacity: 0, y: 32, scale: 1.03 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 1.01 }}
                    transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="hero-main-overlay" />

                <div className="hero-copy-panel">
                  <span className="hero-kicker">{currentSlide.kicker}</span>
                  <h2 className="display-font mt-4 text-[3rem] leading-none text-white md:text-[4rem]">
                    {currentSlide.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/72">
                    {currentSlide.description}
                  </p>
                </div>
              </motion.div>

              <motion.div className="hero-bottom-strip" style={{ x: heroThumbX }}>
                {heroSlides.map((slide, index) => (
                  <motion.button
                    key={slide.title}
                    type="button"
                    className={`hero-thumb ${index === activeSlide ? "hero-thumb-active" : ""}`}
                    onClick={() => setActiveSlide(index)}
                    whileHover={{ y: -5 }}
                  >
                    <span className="display-font text-[1.6rem] leading-none">{slide.title}</span>
                    <span className="hero-thumb-kicker">{slide.kicker}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-carbon border-y border-white/8 py-5 text-white">
        <div className="ticker">
          <div className="ticker-track">
            {[...featuredServices, ...featuredServices].map((item, index) => (
              <span key={`${item.title}-${index}`} className="ticker-pill">
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-carbon py-22 text-white lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <Reveal>
              <div>
                <SectionLabel tone="light">Réparations & entretien</SectionLabel>
                <h2 className="display-font mt-6 text-[3.3rem] leading-[0.9] text-white md:text-[4.7rem]">
                  L’atelier pour rouler,
                  <span className="block text-white/54">et l’atelier pour transformer.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-white/66">
                Custom Bike réalise la réparation et l’entretien de motos et scooters toutes
                cylindrées, du 50cc au 1800cc, avec des forfaits clairs, des pièces de qualité,
                des rendez-vous rapides et une vraie exigence de restitution.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal direction="left">
              <div className="image-panel min-h-[28rem] bg-black">
                <Image
                  src={detailedServiceSections[0].image}
                  alt={detailedServiceSections[0].title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="service-image-overlay" />
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="feature-surface">
                <p className="display-font text-[3rem] leading-none text-white">
                  {detailedServiceSections[0].title}
                </p>
                <p className="mt-5 text-base leading-8 text-white/68">
                  {detailedServiceSections[0].intro}
                </p>

                <div className="mt-8 grid gap-3">
                  {detailedServiceSections[0].details.map((detail) => (
                    <motion.div key={detail} className="service-chip service-chip-wide" whileHover={{ x: 6 }}>
                      {detail}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/services" label="Voir tous les services" />
                  <ButtonLink href="/contact" label="Prendre rendez-vous" variant="ghost" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell section-paper py-22 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <Reveal>
              <div>
                <SectionLabel>Services signature</SectionLabel>
                <h2 className="display-font mt-6 text-[3.4rem] leading-[0.9] text-[#111111] md:text-[4.8rem]">
                  Les services qui font venir,
                  <span className="block text-black/44">et ceux qui font revenir.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-black/62">
                Révision, feu LED, sellerie sur mesure, covering, Quad Lock, CarPlay, vente,
                location, avant / après, assurance. L’offre est large, mais racontée comme un
                vrai univers d’atelier haut de gamme.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service, index) => (
              <Reveal key={service.slug} delay={0.03 * index}>
                <motion.article className="feature-card" whileHover={{ y: -8, x: 4 }}>
                  <div className="feature-card-media">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1280px) 26vw, (min-width: 768px) 46vw, 100vw"
                      className="object-cover"
                    />
                    <div className="feature-card-overlay" />
                  </div>

                  <div className="feature-card-body">
                    <p className="feature-card-kicker">{service.subtitle}</p>
                    <h3 className="display-font text-[2.2rem] leading-none text-[#111111]">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-black/60">{service.description}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-metal py-22 text-white lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel tone="light">Pièces & accessoires</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.5rem]">
                Des marques reconnues,
                <span className="block text-white/54">une pose propre et un vrai oeil atelier.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-sm leading-8 text-white/66">
                Akrapovic, LeoVince, Yasuni, Malossi, JCosta, Polini, Tucano, Bagster, Top
                Block, Tecno Globe et une sélection d’accessoires utiles pour améliorer le rendu,
                le confort ou l’usage quotidien.
              </p>
            </Reveal>
          </div>

          <div className="brands-wall">
            {brandPartners.map((brand, index) => (
              <Reveal key={brand} delay={0.03 * index} direction={index % 2 === 0 ? "left" : "right"}>
                <motion.div className="brand-chip" whileHover={{ y: -6 }}>
                  <span className="display-font text-[2rem] leading-none text-white">{brand}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-paper py-22 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <Reveal>
              <div>
                <SectionLabel>Vente, location & projets</SectionLabel>
                <h2 className="display-font mt-6 text-[3.3rem] leading-[0.9] text-[#111111] md:text-[4.6rem]">
                  Plus qu’un garage:
                  <span className="block text-black/44">un lieu de mobilité et d’image.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-black/62">
                Vente neuf / occasion selon disponibilités, location, véhicule de courtoisie en
                option payante, accessoires, custom et accompagnement complet. Le site peut
                assumer une proposition beaucoup plus large qu’une simple page atelier.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.title} delay={0.04 * index}>
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-tile"
                  whileHover={{ y: -8, x: 5 }}
                >
                  <div className="image-panel aspect-[4/5]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 100vw"
                      className="object-cover"
                    />
                    <div className="masonry-overlay" />
                    <div className="masonry-copy">
                      <p className="project-kicker">{project.category}</p>
                      <p className="display-font text-[2rem] leading-none text-white">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/vente-location" label="Explorer vente & location" variant="light" />
              <ButtonLink href="/realisations" label="Voir les réalisations" variant="ghost" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-oxide py-22 text-white lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Reveal>
                <SectionLabel tone="light">Ils nous font confiance</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3.3rem] leading-[0.9] text-white md:text-[4.6rem]">
                  Une clientèle cosmopolite,
                  <span className="block text-white/56">du quotidien aux profils visibles.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-sm leading-8 text-white/66">
                Des motards du quotidien, des profils publics, des artistes, des sportifs et
                des passionnés passent aussi par l’atelier pour l’entretien, les accessoires ou
                les projets plus visuels.
              </p>
              </Reveal>

              <div className="mt-8 flex flex-wrap gap-3">
                {trustGuests.map((guest, index) => (
                  <Reveal key={guest} delay={0.03 * index}>
                    <motion.div className="trust-pill" whileHover={{ x: 4, y: -4 }}>
                      {guest}
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.12}>
              <div className="testimonial-stage">
                <Stars />
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={currentReview.author}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.52 }}
                  >
                    <p className="mt-6 text-2xl leading-10 text-white md:text-[2rem] md:leading-[1.7]">
                      &ldquo;{currentReview.quote}&rdquo;
                    </p>
                    <footer className="mt-8 border-t border-white/10 pt-5">
                      <p className="display-font text-[2rem] leading-none text-white">
                        {currentReview.author}
                      </p>
                      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.3em] text-white/52">
                        {currentReview.meta}
                      </p>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="mt-12 flex flex-wrap gap-3">
              <ButtonLink href="/contact" label="Contacter l'atelier" />
              <ButtonLink href={business.phoneHref} label={business.phoneDisplay} variant="ghost" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-white py-22 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel>Tarifs & devis</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-[#111111] md:text-[4.5rem]">
                Des repères utiles,
                <span className="block text-black/44">sans simplifier à outrance l’atelier.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-sm leading-8 text-black/62">
                Les forfaits et points d’entrée rassurent. Les projets LED, les transformations,
                les sinistres et les montages plus spécifiques restent eux traités sur devis.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pricingReference.map((item, index) => (
              <Reveal key={item.title} delay={0.03 * index}>
                <article className="pricing-card pricing-card-light">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-black/42">
                    {item.title}
                  </p>
                  <p className="display-font mt-4 text-[3rem] leading-none text-[#111111]">
                    {item.price}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-black/62">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-carbon py-22 text-white lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel tone="light">Questions fréquentes</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.5rem]">
                Le site répond aussi
                <span className="block text-white/56">aux objections avant l’appel.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <FaqAccordion items={faqItems} tone="light" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
