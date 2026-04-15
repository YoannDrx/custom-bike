"use client";

import { useEffect, useEffectEvent, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FaqAccordion } from "@/components/faq-accordion";
import { ButtonLink, HoverTile, Reveal } from "@/components/site-primitives";
import {
  brandPartners,
  business,
  detailedServiceSections,
  faqItems,
  featuredProjects,
  testimonials,
  trustGuests,
} from "@/lib/site-content";

const viceSlides = [
  {
    kicker: "Vice pursuit",
    title: "Le garage qui fait sortir la machine du trafic.",
    description:
      "Révision, réparation, LED et accessoires avec une esthétique plus noire, plus dense, plus nocturne.",
    image: "/media/tiktok-rt-black.jpg",
    tag: "GTA mood",
  },
  {
    kicker: "Neon custom",
    title: "Des détails lumineux qui changent toute la lecture.",
    description:
      "Logo LED, feux additionnels et finitions propres pour une présence qui tient autant en photo qu'en vrai.",
    image: "/media/goldwing-led.jpg",
    tag: "Miami lights",
  },
  {
    kicker: "Street ready",
    title: "Accessoires, électronique et look calibrés pour rouler.",
    description:
      "CarPlay, instrumentation, dashcam ou montage utile: le pratique reste visuel et net.",
    image: "/media/tiktok-msport.jpg",
    tag: "Downtown build",
  },
];

const landingModes = [
  {
    title: "Repair Run",
    text: "Diagnostic, remise en état, entretien toutes cylindrées et suivi atelier lisible.",
    image: "/media/hero-bmw.jpg",
    badge: "50cc > 1800cc",
  },
  {
    title: "Neon Upgrade",
    text: "LED, logos, feux additionnels, sellerie et finitions qui signent la moto.",
    image: "/media/bmw-rt-led.jpg",
    badge: "Custom",
  },
  {
    title: "Insurance Escape",
    text: "Lecture du sinistre, devis, coordination et restitution propre sans friction inutile.",
    image: "/media/tiktok-avant-apres.jpg",
    badge: "Assurance",
  },
  {
    title: "Vice Mobility",
    text: "Vente, location et solutions relais atelier quand il faut rester mobile.",
    image: "/media/tiktok-overview.jpg",
    badge: "Mobilité",
  },
];

const quickStats = [
  { value: "01", label: "garage visible de jour comme de nuit" },
  { value: "50cc+", label: "jusqu'aux grosses cylindrées" },
  { value: "10-18", label: "atelier ouvert du lundi au vendredi" },
];

const hotlineCards = [
  { label: "Hotline", value: business.phoneDisplay },
  { label: "Base", value: "Montreuil / 93" },
  { label: "Social", value: "@custombike" },
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroMediaY = useTransform(scrollY, [0, 720], [0, reduceMotion ? 0 : -42]);

  const rotateSlide = useEffectEvent(() => {
    setActiveSlide((current) => (current + 1) % viceSlides.length);
  });

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => rotateSlide(), 4800);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const currentSlide = viceSlides[activeSlide];

  return (
    <div className="vice-home">
      <section className="section-shell vice-hero-shell px-4 pb-18 pt-6 md:px-6 lg:pb-24 lg:pt-8">
        <div className="vice-grid-floor" aria-hidden="true" />
        <div className="vice-orb vice-orb-pink" aria-hidden="true" />
        <div className="vice-orb vice-orb-cyan" aria-hidden="true" />

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="vice-copy-column">
              <span className="vice-tag">Los Santos mood / Montreuil reality</span>

              <p className="vice-kicker mt-5">Repair. Custom. LED. Insurance. Mobility.</p>

              <h1 className="vice-hero-title mt-5">
                Custom Bike
                <span className="vice-hero-neon">After Dark</span>
              </h1>

              <p className="vice-lead mt-6 max-w-xl">
                Une landing plus jeu vidéo, plus Miami by night, moins lourde en texte et plus
                directe visuellement. L&apos;atelier reste réel, la mise en scène devient beaucoup
                plus assumée.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  href="/contact"
                  label="Entrer dans l'atelier"
                  className="vice-cta vice-cta-primary"
                />
                <ButtonLink
                  href="/realisations"
                  label="Voir les builds"
                  variant="secondary"
                  className="vice-cta vice-cta-secondary"
                />
                <ButtonLink
                  href={business.socials.instagram}
                  label="Instagram"
                  variant="ghost"
                  external
                  className="vice-cta vice-cta-ghost"
                />
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {quickStats.map((item, index) => (
                  <Reveal key={item.value} delay={0.28 + index * 0.04}>
                    <div className="vice-stat-card">
                      <p className="vice-stat-value">{item.value}</p>
                      <p className="vice-stat-label">{item.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="vice-trustline mt-8">
                <span className="vice-trustline-label">Crew already seen at the garage</span>
                <div className="vice-chip-row">
                  {trustGuests.slice(0, 4).map((guest) => (
                    <span key={guest} className="vice-chip">
                      {guest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="vice-sun" aria-hidden="true" />
              <motion.div style={{ y: heroMediaY }} className="vice-hero-stage">
                <div className="vice-poster">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide.image}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.04, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.02, y: -18 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="vice-poster-overlay" />
                  <div className="vice-scanlines" aria-hidden="true" />

                  <div className="vice-poster-head">
                    <span className="vice-badge">{currentSlide.tag}</span>
                    <span className="vice-badge vice-badge-outline">Wanted level: 0</span>
                  </div>

                  <div className="vice-poster-copy">
                    <p className="vice-poster-script">{currentSlide.kicker}</p>
                    <h2 className="vice-poster-title">{currentSlide.title}</h2>
                    <p className="vice-poster-text">{currentSlide.description}</p>
                  </div>
                </div>

                <div className="vice-selector-grid">
                  {viceSlides.map((slide, index) => (
                    <button
                      key={slide.kicker}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`vice-selector ${index === activeSlide ? "vice-selector-active" : ""}`}
                    >
                      <div className="vice-selector-thumb">
                        <Image
                          src={slide.image}
                          alt={slide.kicker}
                          fill
                          sizes="(min-width: 1024px) 14vw, 28vw"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="vice-selector-label">{slide.tag}</p>
                        <p className="vice-selector-title">{slide.kicker}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell vice-band px-4 py-5 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <span className="vice-band-label">Now playing</span>
          {brandPartners.map((brand, index) => (
            <Reveal key={brand} delay={0.02 * index}>
              <span className="vice-band-chip">{brand}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell vice-section px-4 py-18 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <span className="vice-tag vice-tag-cyan">Game modes</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="vice-section-title mt-6">
                  Quatre entrées.
                  <span>Un seul garage vraiment crédible.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="vice-section-copy mt-5 max-w-xl">
                  La landing ne déroule plus tout d&apos;un bloc. Elle présente des modes
                  d&apos;entrée clairs: réparer, customiser, gérer un dossier ou rester mobile.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} direction="right">
              <div className="vice-quote-card">
                <p className="vice-quote-label">Client line</p>
                <p className="vice-quote-text">&ldquo;{testimonials[0].quote}&rdquo;</p>
                <div className="vice-quote-meta">
                  <p className="vice-quote-author">{testimonials[0].author}</p>
                  <p className="vice-quote-model">{testimonials[0].meta}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {landingModes.map((item, index) => (
              <Reveal key={item.title} delay={0.03 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                  <article className="vice-mode-card">
                    <div className="vice-mode-image">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <span className="vice-mode-badge">{item.badge}</span>
                    <h3 className="vice-mode-title">{item.title}</h3>
                    <p className="vice-mode-text">{item.text}</p>
                  </article>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell vice-night px-4 py-18 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <span className="vice-tag">Spotlight builds</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="vice-section-title mt-6">
                  Les motos doivent
                  <span>faire jaillir l&apos;envie avant le devis.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="grid gap-3 sm:grid-cols-3">
                {hotlineCards.map((item) => (
                  <div key={item.label} className="vice-hotline-card">
                    <p className="vice-hotline-label">{item.label}</p>
                    <p className="vice-hotline-value">{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <Reveal key={project.title} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                  <a href={project.url} target="_blank" rel="noreferrer" className="block">
                    <article className="vice-build-card">
                      <div className="vice-build-image">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1024px) 30vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="vice-build-kicker">{project.category}</p>
                      <h3 className="vice-build-title">{project.title}</h3>
                      <p className="vice-build-text">{project.subtitle}</p>
                    </article>
                  </a>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell vice-section vice-section-alt px-4 py-18 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <span className="vice-tag vice-tag-cyan">Night shift</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="vice-section-title mt-6">
                  Réparation sérieuse.
                  <span>Custom assumé. Dossiers simplifiés.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="vice-section-copy max-w-2xl">
                La page landing doit aussi rassurer. On garde donc trois blocs métier très clairs,
                mais dans une mise en scène plus GTA night drive que brochure atelier classique.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {detailedServiceSections.map((section, index) => (
              <Reveal key={section.title} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.7 : 0.7}>
                  <article className="vice-detail-card">
                    <div className="vice-detail-image">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="vice-detail-kicker">Mode 0{index + 1}</p>
                    <h3 className="vice-detail-title">{section.title}</h3>
                    <p className="vice-detail-text">{section.intro}</p>
                    <div className="vice-chip-row mt-4">
                      {section.details.slice(0, 2).map((detail) => (
                        <span key={detail} className="vice-chip vice-chip-soft">
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
      </section>

      <section className="section-shell vice-briefing px-4 py-18 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <Reveal>
                <span className="vice-tag">Quick briefing</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="vice-section-title mt-6">
                  On coupe le texte.
                  <span>On garde les vraies réponses.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="vice-section-copy mt-5 max-w-xl">
                  Quelques questions, un CTA clair, un accès direct au téléphone. Le reste peut se
                  jouer par message ou directement à l&apos;atelier.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="vice-contact-panel mt-8">
                  <p className="vice-contact-title">Ride now, talk later.</p>
                  <p className="vice-contact-copy">
                    Appel rapide, devis, réseaux ou formulaire. Le bon canal dépend du projet, pas
                    d&apos;une structure figée.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink
                      href={business.phoneHref}
                      label="Appeler"
                      className="vice-cta vice-cta-primary"
                    />
                    <ButtonLink
                      href="/contact"
                      label="Formulaire"
                      variant="secondary"
                      className="vice-cta vice-cta-secondary"
                    />
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
    </div>
  );
}
