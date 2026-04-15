import Image from "next/image";
import { ButtonLink, HoverTile, Reveal, SectionLabel } from "@/components/site-primitives";
import { business, featuredProjects, galleryItems, testimonials } from "@/lib/site-content";

const socialVideos = [
  {
    title: "BMW M Sport",
    caption: "Instrumentation / reel",
    image: "/media/tiktok-msport.jpg",
    url: "https://www.tiktok.com/@custombike/video/7419298293030587680",
  },
  {
    title: "RT full black",
    caption: "Finition / TikTok",
    image: "/media/tiktok-rt-black.jpg",
    url: "https://www.tiktok.com/@custombike/video/7501297224568147222",
  },
  {
    title: "Yamaha LED",
    caption: "Signature / TikTok",
    image: "/media/tiktok-yamaha-led.jpg",
    url: "https://www.tiktok.com/@custombike/video/7575206149968989462",
  },
];

export function RealisationsPage() {
  return (
    <>
      <section className="section-shell px-4 pb-16 pt-4 md:px-6 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="pt-4">
              <Reveal>
                <SectionLabel tone="accent">Réalisations</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-font mt-6 text-[3.2rem] leading-[0.84] text-[var(--ink)] md:text-[5.2rem]">
                  Les images portent
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    le niveau de finition.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
                  Chaque build raconté en image : avant/après, LED, custom et accessoires. Ce
                  qu&apos;on fait, ça se voit immédiatement.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href={business.socials.instagram} label="Voir Instagram" external />
                  <ButtonLink
                    href={business.socials.tiktok}
                    label="Voir TikTok"
                    variant="secondary"
                    external
                  />
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Reveal delay={0.08} direction="right">
                <div className="neo-image-frame min-h-[23rem] md:min-h-[30rem]">
                  <Image
                    src="/media/tiktok-rt-black.jpg"
                    alt="BMW RT full black"
                    fill
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="object-cover"
                  />
                  <div className="hero-shot-overlay" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="neo-kicker" style={{ color: "rgba(255,255,255,0.52)" }}>
                      Custom / présence
                    </p>
                    <p
                      className="display-font mt-3 text-white md:text-[3.2rem]"
                      style={{ fontSize: "2.2rem", lineHeight: 0.88 }}
                    >
                      RT full black
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-4">
                <Reveal delay={0.12}>
                  <HoverTile tilt={-0.8}>
                    <div className="neo-panel neo-panel-red floating-sticker p-5">
                      <p className="neo-kicker" style={{ color: "rgba(255,255,255,0.58)" }}>
                        Image forte
                      </p>
                      <p className="display-font mt-3 text-[2rem] leading-[0.92] text-white">
                        Avant / après,
                        <span className="block">LED, détails.</span>
                      </p>
                    </div>
                  </HoverTile>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="neo-image-frame min-h-[14rem]">
                    <Image
                      src="/media/goldwing-led.jpg"
                      alt="Goldwing avec logos LED"
                      fill
                      sizes="(min-width: 1024px) 18vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel>Sélection marquée</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Gros plans,
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    pas miniatures timides.
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-[var(--ink-soft)] md:text-base">
                Chaque projet existe comme une pièce forte. L&apos;objectif n&apos;est pas de
                remplir une grille mais de faire ressentir la densité et la propreté d&apos;exécution.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.title} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -1 : 1}>
                  <a href={project.url} target="_blank" rel="noreferrer" className="block">
                    <article
                      className={`neo-panel h-full p-4 md:p-5 ${index % 2 === 1 ? "neo-panel-soft" : ""}`}
                    >
                      <div className="neo-image-frame aspect-[4/5]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="neo-kicker mt-4">{project.category}</p>
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

      <section className="section-shell gta-dark-section px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Mosaïque libre</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Une galerie
                  <span className="block text-[var(--ink-soft)]">qui respire et cogne.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-[var(--ink-soft)] md:text-base">
                LED, avant/après, covering, accessoires, électronique. Toute la diversité du travail
                atelier en un coup d&apos;œil éditorial.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {galleryItems.map((item, index) => (
              <Reveal key={item.title} delay={0.03 * index}>
                <HoverTile tilt={index % 3 === 0 ? -0.8 : index % 3 === 1 ? 0.8 : -0.4}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="block">
                    <article className="neo-panel neo-panel-dark h-full p-4 md:p-5">
                      <div className={`neo-image-frame ${item.aspect}`}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="neo-kicker mt-4">{item.caption}</p>
                      <h3 className="display-font mt-3 text-[1.8rem] leading-[0.9] text-[var(--ink)]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{item.category}</p>
                    </article>
                  </a>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <SectionLabel>TikTok &amp; Reels</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3rem] leading-[0.84] text-[var(--ink)] md:text-[4.6rem]">
                  Quand l&apos;image bouge,
                  <span className="block" style={{ color: "var(--vice-pink)" }}>
                    la finition se voit mieux.
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-[var(--ink-soft)] md:text-base">
                Les formats verticaux montrent ce qu&apos;une photo ne peut pas toujours transmettre :
                le soin du geste, la progression et le résultat final.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {socialVideos.map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index}>
                <HoverTile tilt={index % 2 === 0 ? -0.8 : 0.8}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="block">
                    <article
                      className={`neo-panel h-full p-4 md:p-5 ${index === 1 ? "neo-panel-soft" : "neo-panel-metal"}`}
                    >
                      <div className="neo-image-frame aspect-[4/5]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 768px) 30vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="neo-kicker mt-4">{item.caption}</p>
                      <h3 className="display-font mt-3 text-[1.8rem] leading-[0.9] text-[var(--ink)]">
                        {item.title}
                      </h3>
                    </article>
                  </a>
                </HoverTile>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-shell px-4 py-16 md:px-6 lg:py-20"
        style={{ background: "linear-gradient(135deg, var(--red-deep) 0%, var(--red) 100%)" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="neo-panel neo-panel-dark p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                <div>
                  <SectionLabel tone="light">Retour client</SectionLabel>
                  <p className="mt-6 text-base leading-8 text-white/80 md:text-lg">
                    &ldquo;{testimonials[2].quote}&rdquo;
                  </p>
                  <p className="display-font mt-5 text-[1.8rem] leading-none text-white">
                    {testimonials[2].author}
                  </p>
                  <p className="mt-2 text-[0.7rem] uppercase tracking-[0.24em] text-white/50">
                    {testimonials[2].meta}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <ButtonLink href="/contact" label="Parler du projet" variant="secondary" />
                  <ButtonLink
                    href={business.socials.instagram}
                    label="Instagram"
                    variant="ghost"
                    external
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
