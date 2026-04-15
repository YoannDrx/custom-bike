import Image from "next/image";
import { ButtonLink, Reveal, SectionLabel } from "@/components/site-primitives";
import { business, featuredProjects } from "@/lib/site-content";

const mobilityHighlights = [
  {
    title: "Vente",
    text: "Neuf, occasion ou véhicule préparé selon arrivage, avec une sélection cohérente par rapport à l'ADN de l'atelier.",
  },
  {
    title: "Location",
    text: "Solutions ponctuelles pour rester mobile, tester un format ou couvrir un besoin urbain immédiat.",
  },
  {
    title: "Courtoisie",
    text: "Véhicule de courtoisie possible en option payante selon disponibilité et durée d'immobilisation.",
  },
];

const mobilitySteps = [
  {
    step: "01",
    title: "Exprimer le besoin",
    text: "Usage quotidien, mobilité ponctuelle, vente, location courte durée ou besoin de relais pendant une immobilisation atelier.",
  },
  {
    step: "02",
    title: "Recevoir une proposition",
    text: "Le site assume une réponse premium: disponibilité, conditions, créneau, budget et niveau de préparation sont clarifiés rapidement.",
  },
  {
    step: "03",
    title: "Repartir proprement",
    text: "Livraison, prise en main, restitution ou bascule vers un véhicule de courtoisie selon le planning.",
  },
];

const availabilityCards = [
  "Vente neuf / occasion selon arrivage",
  "Location urbaine ou relais atelier",
  "Préparation esthétique ou accessoirisation possible",
  "Accompagnement pour choisir le bon format",
];

export function VenteLocationPage() {
  return (
    <>
      <section className="section-shell section-paper py-18 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel>Vente & location</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-font mt-6 text-[3.6rem] leading-[0.9] text-[#111111] md:text-[5rem] xl:text-[5.8rem]">
                Rester mobile,
                <span className="block text-black/44">même hors atelier.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/64">
                Custom Bike ne s’arrête pas à la réparation. L’atelier propose aussi une logique de
                mobilité avec de la vente, de la location et des solutions de courtoisie pour
                garder une vraie continuité d’usage.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" label="Vérifier les disponibilités" />
                <ButtonLink href={business.phoneHref} label="Appeler l'atelier" variant="ghost" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="image-panel min-h-[30rem] bg-black">
              <Image
                src="/media/tiktok-overview.jpg"
                alt="Vente et location Custom Bike"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="hero-main-overlay" />
              <div className="masonry-copy">
                <p className="project-kicker">Mobilité</p>
                <p className="display-font text-[2.6rem] leading-none text-white md:text-[3.4rem]">
                  Vente, location,
                  <span className="block text-white/62">et relais atelier.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-carbon py-22 text-white lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {mobilityHighlights.map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index}>
                <article className="editorial-card editorial-card-dark h-full">
                  <p className="display-font text-[2.4rem] leading-none text-white">{item.title}</p>
                  <p className="mt-4 text-sm leading-7 text-white/66">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-white py-22 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel>Ce que le site met en avant</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-[#111111] md:text-[4.4rem]">
                Une offre mobilité cohérente,
                <span className="block text-black/44">pas un bloc annexe perdu dans le footer.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {availabilityCards.map((item, index) => (
              <Reveal
                key={item}
                delay={0.05 * index}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div className="service-chip service-chip-contrast">{item}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-metal py-22 text-white lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {mobilitySteps.map((item, index) => (
              <Reveal key={item.step} delay={0.05 * index}>
                <article className="process-card">
                  <p className="display-font text-[3.2rem] leading-none text-white/38">{item.step}</p>
                  <h2 className="display-font mt-5 text-[2.4rem] leading-none text-white">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-white/64">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-paper py-22 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <Reveal>
                <SectionLabel>Exemples d’univers</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-[#111111] md:text-[4.4rem]">
                  Des machines prêtes à rouler,
                  <span className="block text-black/44">et prêtes à représenter la marque.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-black/62">
                Sans inventer un stock précis, cette page montre la tonalité de l’offre: du
                véhicule prêt à l’emploi jusqu’au projet préparé, accessoirisé ou valorisé visuellement.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.title} delay={0.04 * index}>
                <a href={project.url} target="_blank" rel="noreferrer" className="project-tile">
                  <div className="image-panel aspect-[4/5] bg-black">
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
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-oxide py-22 text-white lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel tone="light">Prise de contact</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.4rem]">
                Demander une disponibilité,
                <span className="block text-white/56">un devis ou une solution relais.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="testimonial-stage">
              <p className="text-sm leading-8 text-white/64">
                La disponibilité réelle varie selon arrivage, planning et nature du besoin. Le bon
                réflexe reste un appel ou une demande via le formulaire pour obtenir une réponse
                rapide et cadrée.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" label="Nous écrire" />
                <ButtonLink href={business.phoneHref} label={business.phoneDisplay} variant="ghost" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
