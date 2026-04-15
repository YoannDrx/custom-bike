"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
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

/* ─────────────────────────────────────────
   DATA
   ───────────────────────────────────────── */

const viceSlides = [
  {
    kicker: "Vice pursuit",
    title: "Le garage qui fait sortir la machine du trafic.",
    description:
      "Révision, réparation, LED et accessoires avec une esthétique plus noire, plus dense, plus nocturne.",
    image: "/media/tiktok-rt-black.jpg",
    tag: "Dark Build",
  },
  {
    kicker: "Neon custom",
    title: "Des détails lumineux qui changent toute la lecture.",
    description:
      "Logo LED, feux additionnels et finitions propres pour une présence qui tient autant en photo qu'en vrai.",
    image: "/media/goldwing-led.jpg",
    tag: "Miami Lights",
  },
  {
    kicker: "Street ready",
    title: "Accessoires, électronique et look calibrés pour rouler.",
    description:
      "CarPlay, instrumentation, dashcam ou montage utile : le pratique reste visuel et net.",
    image: "/media/tiktok-msport.jpg",
    tag: "Downtown Build",
  },
];

const landingModes = [
  {
    title: "Repair Run",
    text: "Diagnostic, remise en état, entretien toutes cylindrées et suivi atelier lisible. Du 50cc à la 1800cc.",
    image: "/media/hero-bmw.jpg",
    badge: "50cc → 1800cc",
  },
  {
    title: "Neon Upgrade",
    text: "LED, logos, feux additionnels, sellerie et finitions sur mesure qui signent vraiment la machine.",
    image: "/media/bmw-rt-led.jpg",
    badge: "Custom",
  },
  {
    title: "Insurance Escape",
    text: "Lecture du sinistre, devis, coordination du dossier et restitution propre sans friction inutile.",
    image: "/media/tiktok-avant-apres.jpg",
    badge: "Assurance",
  },
  {
    title: "Vice Mobility",
    text: "Vente, location et solutions relais atelier pour rester mobile pendant l'intervention.",
    image: "/media/tiktok-overview.jpg",
    badge: "Mobilité",
  },
];

const quickStats = [
  { value: "50cc+", label: "jusqu'aux grosses cylindrées" },
  { value: "10-18", label: "lundi au vendredi" },
  { value: "Mtr", label: "Montreuil / Seine-Saint-Denis" },
];

const hotlineCards = [
  { label: "Hotline", value: business.phoneDisplay },
  { label: "Base", value: "Montreuil / 93" },
  { label: "Social", value: "@custombike" },
];

const gtaSlides = [
  {
    image: "/media/akrapovic-tmax-gta.jpeg",
    title: "Tmax Akrapovic",
    kicker: "Vice City · Exhaust Custom",
    subtitle: "Ligne Akrapovic montée propre. L'atelier touche aussi à la performance sonore.",
    tag: "Tmax · Montreuil",
  },
  {
    image: "/media/bike1-gta.jpg",
    title: "Blue Phantom",
    kicker: "Premium Build · Night Spec",
    subtitle: "Construction sur mesure, finitions premium, présence qui ne passe pas inaperçue.",
    tag: "Custom Build",
  },
  {
    image: "/media/tmax-gta.png",
    title: "Dark Matter",
    kicker: "Stealth Build · Full Black",
    subtitle: "Tmax en configuration stealth. Discret en journée, présent la nuit.",
    tag: "Tmax · Stealth",
  },
  {
    image: "/media/tracer-gta.jpeg",
    title: "Street Runner",
    kicker: "Urban Setup · Daily Rider",
    subtitle: "Tracer configuré pour la route quotidienne avec une présence visuelle assumée.",
    tag: "Tracer · Road",
  },
  {
    image: "/media/bike2-gta.jpg",
    title: "Night Patrol",
    kicker: "Vice City · Police Spec",
    subtitle: "La moto dans toutes ses versions. L'atelier connaît chaque configuration.",
    tag: "Multi-marques",
  },
];

/* ─────────────────────────────────────────
   GTA CAROUSEL COMPONENT
   ───────────────────────────────────────── */

function GtaCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimers = useEffectEvent(() => {
    if (reduceMotion) return;
    let p = 0;
    progressRef.current = setInterval(() => {
      p += 100 / 50; // 5 seconds / 50ms steps
      setProgress(Math.min(p, 100));
    }, 100);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % gtaSlides.length);
      p = 0;
      setProgress(0);
    }, 5000);
  });

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  useEffect(() => {
    setProgress(0);
    startTimers();
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, reduceMotion]);

  const goTo = (index: number) => {
    clearTimers();
    setCurrent(index);
    setProgress(0);
  };

  const prev = () => goTo((current - 1 + gtaSlides.length) % gtaSlides.length);
  const next = () => goTo((current + 1) % gtaSlides.length);

  const slide = gtaSlides[current];

  return (
    <section className="gta-carousel-section">
      {/* Header */}
      <div className="gta-carousel-header">
        <div>
          <p className="vice-kicker">Garage Cinematic</p>
          <h2 className="gta-carousel-section-title mt-2">
            Les machines
            <span> du garage</span>
          </h2>
        </div>
        <span className="vice-tag vice-tag-cyan hidden sm:inline-flex">Vice City Edition</span>
      </div>

      {/* Main frame */}
      <div className="gta-carousel-inner">
        {/* Slide image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="gta-carousel-overlay" />
        <div className="gta-carousel-scanlines" />
        <div className="gta-carousel-hud-border" />

        {/* Dots (desktop: top right) */}
        <div className="gta-carousel-dots">
          {gtaSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`gta-carousel-dot ${i === current ? "gta-carousel-dot-active" : ""}`}
            />
          ))}
        </div>

        {/* Nav arrows */}
        <div className="gta-carousel-nav">
          <button
            type="button"
            onClick={prev}
            aria-label="Slide précédente"
            className="gta-carousel-arrow"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Slide suivante"
            className="gta-carousel-arrow"
          >
            →
          </button>
        </div>

        {/* Caption */}
        <div className="gta-carousel-caption">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              className="gta-carousel-caption-inner"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="gta-carousel-kicker">{slide.kicker}</p>
                <h3 className="gta-carousel-title mt-1">{slide.title}</h3>
                <p className="gta-carousel-subtitle mt-1 hidden sm:block">{slide.subtitle}</p>
              </div>
              <div className="flex-none">
                <span className="gta-carousel-tag">{slide.tag}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div
          className="gta-carousel-progress"
          style={{ width: reduceMotion ? "100%" : `${progress}%` }}
        />
      </div>

      {/* Bottom padding */}
      <div style={{ height: "0.75rem" }} />
    </section>
  );
}

/* ─────────────────────────────────────────
   MAIN HOME PAGE
   ───────────────────────────────────────── */

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroMediaY = useTransform(scrollY, [0, 720], [0, reduceMotion ? 0 : -38]);

  const rotateSlide = useEffectEvent(() => {
    setActiveSlide((current) => (current + 1) % viceSlides.length);
  });

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => rotateSlide(), 4800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const currentSlide = viceSlides[activeSlide];

  return (
    <div className="vice-home">
      {/* ── HERO ─────────────────────────────── */}
      <section className="section-shell vice-hero-shell px-4 md:px-6">
        {/* Background: Akrapovic TMax GTA */}
        <div className="vice-hero-bg">
          <Image
            src="/media/akrapovic-tmax-gta.jpeg"
            alt="Custom Bike Night Garage"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="vice-hero-bg-overlay" />

        {/* Decorative elements */}
        <div className="vice-grid-floor" aria-hidden="true" />
        <div className="vice-orb vice-orb-pink" aria-hidden="true" />
        <div className="vice-orb vice-orb-cyan" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* ── LEFT: Copy ── */}
            <div className="vice-copy-column">
              <Reveal>
                <span className="vice-tag">Los Montreuil / 93 · Night Garage</span>
              </Reveal>

              <Reveal delay={0.06}>
                <p className="vice-kicker mt-5">Repair · Custom · LED · Insurance · Mobility</p>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="vice-hero-title mt-4">
                  Custom
                  <span className="vice-hero-neon">Bike</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="vice-lead mt-5 max-w-lg">
                  Atelier moto &amp; scooter toutes cylindrées à Montreuil. Réparations, custom LED,
                  accessoires, gestion assurance, vente et location. Du 50cc à la 1800cc.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink
                    href="/contact"
                    label="Prendre rendez-vous"
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
              </Reveal>

              <Reveal delay={0.26}>
                <div className="vice-stat-row mt-6">
                  {quickStats.map((item) => (
                    <div key={item.value} className="vice-stat-item">
                      <span className="vice-stat-value">{item.value}</span>
                      <span className="vice-stat-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.36}>
                <div className="vice-trustline mt-7">
                  <span className="vice-trustline-label">Crew déjà vu au garage</span>
                  <div className="vice-chip-row mt-2">
                    {trustGuests.slice(0, 4).map((guest) => (
                      <span key={guest} className="vice-chip">
                        {guest}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: Poster slider ── */}
            <Reveal delay={0.08} direction="right">
              <div className="relative">
                <div className="vice-sun" aria-hidden="true" />
                <motion.div style={{ y: heroMediaY }} className="vice-hero-stage">
                  <div className="vice-poster">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide.image}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.04, y: 18 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -16 }}
                        transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Image
                          src={currentSlide.image}
                          alt={currentSlide.title}
                          fill
                          sizes="(min-width: 1024px) 48vw, 100vw"
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="vice-poster-overlay" />
                    <div className="vice-scanlines" aria-hidden="true" />

                    <div className="vice-poster-head">
                      <span className="vice-badge">{currentSlide.tag}</span>
                      <span className="vice-badge vice-badge-outline">★★★★★ Wanted: 0</span>
                    </div>

                    <div className="vice-poster-copy">
                      <div className="min-w-0">
                        <p className="vice-poster-script">{currentSlide.kicker}</p>
                        <h2 className="vice-poster-title">{currentSlide.title}</h2>
                      </div>
                      <span className="vice-badge flex-none">{currentSlide.tag}</span>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── BRAND BAND ─────────────────────── */}
      <section className="vice-band">
        <div className="vice-band-inner">
          <div className="vice-band-label-col">
            <span className="vice-band-label">Pièces &amp; références</span>
          </div>
          <div className="vice-band-scroll">
            <div className="vice-band-track">
              {[...brandPartners, ...brandPartners].map((brand, index) => (
                <span key={`${brand}-${index}`} className="vice-band-chip">
                  {brand}
                  <span className="vice-band-sep" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GTA SCREENSHOT CAROUSEL ─────────── */}
      <GtaCarousel />

      {/* ── GAME MODES ─────────────────────── */}
      <section className="section-shell vice-section px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Intro header — full width, plus d'espace */}
          <div className="mb-10 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
            <div>
              <Reveal>
                <span className="vice-tag">Game modes</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="vice-section-title mt-5" style={{ maxWidth: "none" }}>
                  Quatre entrées.
                  <span>Un seul garage vraiment crédible.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="vice-section-copy mt-5 max-w-2xl">
                  Réparer, customiser, gérer un dossier assurance ou rester mobile pendant
                  l&apos;intervention. Choisissez votre mode d&apos;entrée.
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
              <Reveal key={item.title} delay={0.04 * index}>
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

      {/* ── SPOTLIGHT BUILDS ────────────────── */}
      <section className="section-shell vice-night px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <span className="vice-tag">Spotlight builds</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="vice-section-title mt-5">
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

          <Reveal delay={0.2}>
            <div className="mt-8 flex justify-center">
              <ButtonLink
                href="/realisations"
                label="Voir toutes les réalisations"
                variant="secondary"
                className="vice-cta vice-cta-secondary"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DETAILED SERVICES ───────────────── */}
      <section className="section-shell vice-section vice-section-alt px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <span className="vice-tag vice-tag-cyan">Night shift</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="vice-section-title mt-5">
                  Réparation sérieuse.
                  <span>Custom assumé. Dossiers simplifiés.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="vice-section-copy max-w-2xl">
                L'atelier prend la machine entière en charge : fonctionnement, confort, image et
                restitution propre. Mécanique et esthétique ne sont pas deux mondes séparés.
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

      {/* ── TESTIMONIALS ────────────────────── */}
      <section className="section-shell vice-night px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 text-center">
              <span className="vice-tag">Client line</span>
              <h2 className="vice-section-title mx-auto mt-5" style={{ maxWidth: "18ch" }}>
                Ce que disent
                <span> les riders du garage.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((item, index) => (
              <Reveal key={item.author} delay={0.05 * index}>
                <div className="vice-quote-card h-full">
                  <p className="vice-quote-label">Retour client</p>
                  <p className="vice-quote-text">&ldquo;{item.quote}&rdquo;</p>
                  <div className="vice-quote-meta">
                    <p className="vice-quote-author">{item.author}</p>
                    <p className="vice-quote-model">{item.meta}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ + CONTACT ───────────────────── */}
      <section className="section-shell vice-briefing px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <Reveal>
                <span className="vice-tag">Quick briefing</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="vice-section-title mt-5">
                  Les vraies réponses.
                  <span>Avant d&apos;appeler.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="vice-section-copy mt-4 max-w-xl">
                  Quelques questions fréquentes, un accès direct au téléphone. Le reste se règle par
                  message ou directement à l&apos;atelier.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="vice-contact-panel mt-8">
                  <p className="vice-contact-title">Ride now, talk later.</p>
                  <p className="vice-contact-copy">
                    Appel rapide, devis ou formulaire. Le bon canal dépend du projet, pas d&apos;une
                    structure figée.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
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
