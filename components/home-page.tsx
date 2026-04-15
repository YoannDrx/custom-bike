"use client";

import { useEffect, useEffectEvent, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  ButtonLink,
  HoverTile,
  Reveal,
  SectionLabel,
  TypewriterText,
} from "@/components/site-primitives";
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
    title: "Precision mecanique, allure directe",
    kicker: "BMW RT / GS",
    description:
      "Revisions, LED, accessoires et finitions qui rendent la machine plus dense sans la forcer.",
    image: "/media/hero-bmw.jpg",
  },
  {
    title: "Une signature lumineuse qui ne se rate pas",
    kicker: "Goldwing / logos LED",
    description:
      "Custom Bike travaille le detail qui change la presence globale, pas juste l'effet visible la nuit.",
    image: "/media/goldwing-led.jpg",
  },
  {
    title: "L'electronique utile doit aussi etre belle",
    kicker: "Compteur M / accessoires",
    description:
      "Programmation, instrumentation, CarPlay et montage propre pour garder une vraie lecture premium.",
    image: "/media/tiktok-msport.jpg",
  },
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroVisualY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -36]);
  const heroAsideY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 18]);

  const rotateSlide = useEffectEvent(() => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  });

  const rotateTestimonial = useEffectEvent(() => {
    setActiveTestimonial((current) => (current + 1) % testimonials.length);
  });

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const slideTimer = window.setInterval(() => rotateSlide(), 4300);
    const reviewTimer = window.setInterval(() => rotateTestimonial(), 5600);

    return () => {
      window.clearInterval(slideTimer);
      window.clearInterval(reviewTimer);
    };
  }, [reduceMotion]);

  const currentSlide = heroSlides[activeSlide];
  const currentReview = testimonials[activeTestimonial];

  return (
    <>
      <section className="section-shell px-4 pb-20 pt-4 md:px-6 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-6 pt-2 lg:pt-8">
              <Reveal>
                <SectionLabel tone="accent">Garage moto / scooter a Montreuil</SectionLabel>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="max-w-3xl">
                  <h1 className="display-font text-[4rem] leading-[0.8] text-[var(--ink)] sm:text-[5rem] xl:text-[8.4rem]">
                    Une presence
                    <span className="block text-[var(--red)]">qui roule</span>
                    <span className="block">et qui dure.</span>
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="max-w-xl text-base leading-8 text-[var(--ink-soft)] md:text-lg">
                  Custom Bike rassemble mecanique, custom premium, LED, accessoires, assurance,
                  vente et location dans un site plus vif, plus graphique et plus direct.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="neo-chip neo-chip-soft max-w-max">
                  <span className="neo-kicker text-[var(--ink-faint)]">Focus atelier</span>
                  <span className="text-sm font-semibold">
                    <TypewriterText words={heroTypingPhrases} />
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/contact" label="Demander un devis" />
                  <ButtonLink href="/services" label="Voir les services" variant="secondary" />
                  <ButtonLink
                    href={business.socials.instagram}
                    label="Instagram"
                    variant="ghost"
                    external
                  />
                </div>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2">
                {corePromises.map((promise, index) => (
                  <Reveal
                    key={promise}
                    delay={0.28 + index * 0.04}
                    direction={index % 2 === 0 ? "left" : "right"}
                  >
                    <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                      <div className="neo-chip h-full min-h-[5.75rem]">{promise}</div>
                    </HoverTile>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div style={{ y: heroVisualY }} className="neo-image-frame min-h-[28rem] md:min-h-[36rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.image}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: 28, scale: 1.03 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 1.01 }}
                    transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.kicker}
                      fill
                      priority
                      sizes="(min-width: 1024px) 48vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="hero-shot-overlay" />

                <div className="absolute left-5 top-5 z-10">
                  <div className="neo-chip neo-chip-dark">{currentSlide.kicker}</div>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7">
                  <p className="neo-kicker text-white/58">Atelier / custom / assurance</p>
                  <h2 className="display-font mt-3 max-w-2xl text-[2.6rem] leading-[0.86] text-white md:text-[4.2rem]">
                    {currentSlide.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
                    {currentSlide.description}
                  </p>
                </div>
              </motion.div>

              <motion.div
                style={{ y: heroAsideY }}
                className="mt-4 grid gap-4 lg:grid-cols-2"
              >
                <Reveal delay={0.08}>
                  <HoverTile tilt={-1.2}>
                    <div className="neo-panel neo-panel-red floating-sticker p-5">
                      <p className="neo-kicker text-white/60">Base camp</p>
                      <p className="display-font mt-3 text-[2.2rem] leading-none">Montreuil</p>
                      <p className="mt-4 text-sm leading-7 text-white/78">{business.address}</p>
                      <p className="mt-3 text-sm leading-7 text-white/78">{business.hours[0]}</p>
                    </div>
                  </HoverTile>
                </Reveal>

                <Reveal delay={0.12} direction="right">
                  <HoverTile tilt={1.1}>
                    <div className="neo-panel neo-panel-dark p-5">
                      <p className="neo-kicker text-white/58">Retour client en rotation</p>
                      <p className="mt-4 text-base leading-8 text-white/80 md:text-lg">
                        &ldquo;{currentReview.quote}&rdquo;
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/12 pt-4">
                        <div>
                          <p className="display-font text-[1.5rem] leading-none">
                            {currentReview.author}
                          </p>
                          <p className="mt-2 text-[0.72rem] uppercase tracking-[0.24em] text-white/52">
                            {currentReview.meta}
                          </p>
                        </div>
                        <div className="neo-chip neo-chip-dark">{activeTestimonial + 1}/5</div>
                      </div>
                    </div>
                  </HoverTile>
                </Reveal>
              </motion.div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {heroSlides.map((slide, index) => (
                  <Reveal key={slide.kicker} delay={0.16 + index * 0.04}>
                    <button
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`neo-panel p-4 text-left transition-colors ${
                        index === activeSlide ? "neo-panel-soft" : ""
                      }`}
                    >
                      <p className="neo-kicker text-[var(--ink-faint)]">{slide.kicker}</p>
                      <p className="display-font mt-3 text-[1.55rem] leading-[0.92] text-[var(--ink)]">
                        {slide.title}
                      </p>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell border-y-4 border-[var(--ink)] bg-[var(--red)] text-white">
        <div className="marquee-shell">
          <div className="marquee-track">
            {[...featuredServices, ...featuredServices].map((item, index) => (
              <span key={`${item.slug}-${index}`} className="marquee-pill">
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-20 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel>Services qui claquent juste</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.8rem]">
                  Reparer,
                  <span className="block text-[var(--red)]">equiper, signer.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Le site devait sortir du catalogue plat. Chaque carte met en avant un geste
                  atelier, une categorie claire et une image qui raconte un vrai resultat.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="neo-panel neo-panel-metal p-6 md:p-7">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Multi-marques", value: "50cc a 1800cc" },
                    { label: "Horaires", value: "10h / 18h" },
                    { label: "Mobilite", value: "Courtoisie possible" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="neo-kicker text-[var(--ink-faint)]">{item.label}</p>
                      <p className="display-font mt-3 text-[1.9rem] leading-none text-[var(--ink)]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.slice(0, 6).map((item, index) => (
              <Reveal key={item.slug} delay={0.03 * index}>
                <HoverTile tilt={index % 3 === 0 ? -1 : index % 3 === 1 ? 0.9 : -0.5}>
                  <article
                    className={`neo-panel h-full p-4 md:p-5 ${
                      index % 3 === 1
                        ? "neo-panel-soft"
                        : index % 3 === 2
                          ? "neo-panel-metal"
                          : ""
                    }`}
                  >
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
                      <span className="neo-kicker text-[var(--ink-faint)]">{item.category}</span>
                      <span className="rounded-full border-4 border-[var(--ink)] bg-white px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em]">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="display-font mt-4 text-[2rem] leading-[0.9] text-[var(--ink)]">
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

      <div className="section-divider section-divider-dark" />

      <section className="section-shell bg-[var(--ink)] px-4 py-20 text-white md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionLabel tone="light">Double ADN</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-white md:text-[4.8rem]">
                  Atelier pour rouler,
                  <span className="block text-white/56">atelier pour transformer.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
                  Mecanique serieuse d&apos;un cote, culture du detail visuel de l&apos;autre. Le
                  nouveau design assume ce melange et l&apos;organise en trois blocs tres lisibles.
                </p>
              </Reveal>

              <div className="mt-8 flex flex-wrap gap-3">
                {trustGuests.map((guest, index) => (
                  <Reveal key={guest} delay={0.02 * index}>
                    <div className="neo-chip neo-chip-dark">{guest}</div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {detailedServiceSections.map((section, index) => (
                <Reveal key={section.title} delay={0.05 * index}>
                  <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                    <article className="neo-panel neo-panel-dark h-full p-4 md:p-5">
                      <div className="neo-image-frame aspect-[4/5]">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          sizes="(min-width: 768px) 28vw, 100vw"
                          className="object-cover"
                        />
                      </div>

                      <p className="neo-kicker mt-4 text-white/52">Bloc 0{index + 1}</p>
                      <h3 className="display-font mt-3 text-[1.8rem] leading-[0.9] text-white">
                        {section.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/72">{section.intro}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {section.details.slice(0, 3).map((detail) => (
                          <span key={detail} className="neo-chip neo-chip-dark">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </article>
                  </HoverTile>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-20 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel>Realisations & preuves</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.8rem]">
                  De vraies machines,
                  <span className="block text-[var(--red)]">pas des mockups lisses.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Le site devait garder l&apos;energie Instagram et TikTok, mais avec une lecture
                  premium, des blocs plus forts et des transitions plus rythmiques.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="neo-panel p-6 md:p-7">
                <p className="neo-kicker text-[var(--ink-faint)]">Marques & pieces reconnues</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {brandPartners.slice(0, 8).map((brand) => (
                    <div key={brand} className="neo-chip">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.title} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -1 : 1}>
                  <a href={project.url} target="_blank" rel="noreferrer" className="block">
                    <article className="neo-panel h-full p-4 md:p-5">
                      <div className="neo-image-frame aspect-[4/5]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="neo-kicker mt-4 text-[var(--ink-faint)]">{project.category}</p>
                      <h3 className="display-font mt-3 text-[1.85rem] leading-[0.9] text-[var(--ink)]">
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

      <div className="section-divider" />

      <section className="section-shell bg-[var(--red)] px-4 py-20 text-white md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionLabel tone="light">Repere budgetaire</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-white md:text-[4.8rem]">
                  Une lecture simple,
                  <span className="block text-white/60">meme avant le devis.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/76">
                  Les tarifs visibles restent des points d&apos;entree. Les transformations,
                  sinistres et projets LED continuent de passer par un chiffrage precise.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="neo-panel neo-panel-dark mt-8 p-6 md:p-7">
                  <p className="neo-kicker text-white/56">Ce qui ressort le plus</p>
                  <p className="mt-4 text-base leading-8 text-white/78 md:text-lg">
                    &ldquo;{testimonials[0].quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/12 pt-4">
                    <div>
                      <p className="display-font text-[1.6rem] leading-none">
                        {testimonials[0].author}
                      </p>
                      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.24em] text-white/50">
                        {testimonials[0].meta}
                      </p>
                    </div>
                    <ButtonLink href="/contact" label="Prendre rendez-vous" variant="secondary" />
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {pricingReference.slice(0, 4).map((item, index) => (
                <Reveal key={item.title} delay={0.04 * index}>
                  <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                    <article className="neo-panel h-full bg-white p-5 text-[var(--ink)] md:p-6">
                      <p className="neo-kicker text-[var(--ink-faint)]">{item.title}</p>
                      <p className="display-font mt-4 text-[2.8rem] leading-none">{item.price}</p>
                      <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                        {item.description}
                      </p>
                    </article>
                  </HoverTile>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-20 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionLabel>Questions utiles</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.8rem]">
                  Moins de texte,
                  <span className="block text-[var(--red)]">plus de reponses nettes.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  La FAQ reste courte, directe et pousse ensuite vers le bon canal: telephone,
                  formulaire ou reseaux selon le projet.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="neo-panel neo-panel-soft mt-8 p-6 md:p-7">
                  <p className="display-font text-[2rem] leading-[0.92] text-[var(--ink)] md:text-[3rem]">
                    Besoin d&apos;une machine
                    <span className="block text-[var(--red)]">qui ressorte vraiment ?</span>
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href="/contact" label="Lancer le projet" />
                    <ButtonLink href={business.phoneHref} label="Appeler" variant="secondary" />
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <FaqAccordion items={faqItems} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
