import Image from "next/image";
import { ButtonLink, Reveal, SectionLabel } from "@/components/site-primitives";
import { business, featuredProjects, galleryItems, testimonials } from "@/lib/site-content";

const socialVideos = [
  {
    title: "BMW M Sport",
    caption: "Programmation / instrumentation",
    image: "/media/tiktok-msport.jpg",
    url: "https://www.tiktok.com/@custombike/video/7419298293030587680",
  },
  {
    title: "RT full black",
    caption: "Finition visuelle",
    image: "/media/tiktok-rt-black.jpg",
    url: "https://www.tiktok.com/@custombike/video/7501297224568147222",
  },
  {
    title: "Yamaha LED",
    caption: "Signature lumineuse",
    image: "/media/tiktok-yamaha-led.jpg",
    url: "https://www.tiktok.com/@custombike/video/7575206149968989462",
  },
];

export function RealisationsPage() {
  return (
    <>
      <section className="section-shell section-paper py-18 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
            <div>
              <Reveal>
                <SectionLabel>Réalisations</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-font mt-6 text-[3.6rem] leading-[0.9] text-[#111111] md:text-[5rem] xl:text-[5.8rem]">
                  Ce que l’atelier
                  <span className="block text-black/44">fait vraiment sortir.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-xl text-base leading-8 text-black/64">
                  LED, logos, carénages, accessoires, finitions, électroniques, avant / après,
                  remise en état ou présence visuelle. Cette page existe pour faire sentir la
                  densité du travail, pas juste pour aligner des miniatures.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={business.socials.instagram} label="Voir Instagram" external />
                  <ButtonLink href={business.socials.tiktok} label="Voir TikTok" variant="ghost" external />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="gallery-marquee-shell">
                <div className="gallery-marquee-track gallery-marquee-track-a">
                  {[...galleryItems.slice(0, 5), ...galleryItems.slice(0, 5)].map((item, index) => (
                    <div key={`${item.title}-${index}`} className="gallery-marquee-card">
                      <div className="image-panel aspect-[4/5] bg-black">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="22vw"
                          className="object-cover"
                        />
                        <div className="masonry-overlay" />
                        <div className="masonry-copy">
                          <p className="project-kicker">{item.category}</p>
                          <p className="display-font text-[1.8rem] leading-none text-white">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="gallery-marquee-track gallery-marquee-track-b">
                  {[...galleryItems.slice(3), ...galleryItems.slice(3)].map((item, index) => (
                    <div key={`${item.caption}-${index}`} className="gallery-marquee-card gallery-marquee-card-small">
                      <div className="image-panel aspect-[5/6] bg-black">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="18vw"
                          className="object-cover"
                        />
                        <div className="masonry-overlay" />
                        <div className="masonry-copy">
                          <p className="project-kicker">{item.caption}</p>
                          <p className="display-font text-[1.4rem] leading-none text-white">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell section-carbon py-22 text-white lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <Reveal>
                <SectionLabel tone="light">Projets phares</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.4rem]">
                  Les machines qui racontent
                  <span className="block text-white/56">l’univers Custom Bike.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-white/64">
                La sélection mélange travaux esthétiques, éclairage, électronique et projets plus
                complets. L’idée n’est pas de copier un feed social, mais d’en faire une galerie
                vraiment éditorialisée.
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
                      <p className="mt-3 max-w-xs text-sm leading-7 text-white/68">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-white py-22 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Reveal>
                <SectionLabel>Mur de réalisations</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-[#111111] md:text-[4.4rem]">
                  Une galerie dense,
                  <span className="block text-black/44">pensée comme un portfolio vivant.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-2xl text-sm leading-8 text-black/62">
                Hover plus riches, zooms, profondeur, images mixtes Instagram et TikTok, et une
                composition plus libre que la grille standard qu’on voit partout.
              </p>
            </Reveal>
          </div>

          <div className="masonry-grid mt-12">
            {galleryItems.map((item, index) => (
              <Reveal key={item.title} delay={0.03 * index}>
                <a href={item.url} target="_blank" rel="noreferrer" className="masonry-item-link">
                  <div className={`image-panel ${item.aspect} bg-black`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 100vw"
                      className="object-cover"
                    />
                    <div className="masonry-overlay" />
                    <div className="masonry-copy">
                      <p className="project-kicker">{item.caption}</p>
                      <p className="display-font text-[1.9rem] leading-none text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-metal py-22 text-white lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div>
            <Reveal>
              <SectionLabel tone="light">TikTok & détails en mouvement</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.4rem]">
                Quand l’image bouge,
                <span className="block text-white/56">la finition se lit encore mieux.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {socialVideos.map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index}>
                <a href={item.url} target="_blank" rel="noreferrer" className="editorial-card editorial-card-dark block">
                  <div className="image-panel aspect-[4/5] bg-black">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 768px) 32vw, 100vw"
                      className="object-cover"
                    />
                    <div className="masonry-overlay" />
                  </div>
                  <p className="editorial-kicker mt-5">{item.caption}</p>
                  <p className="display-font mt-3 text-[2rem] leading-none text-white">{item.title}</p>
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
              <SectionLabel tone="light">Retour client</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-font mt-6 text-[3.2rem] leading-[0.9] text-white md:text-[4.4rem]">
                L’effet recherché:
                <span className="block text-white/56">faire sortir la machine sans la caricaturer.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="testimonial-stage">
              <p className="text-2xl leading-10 text-white md:text-[2rem] md:leading-[1.7]">
                &ldquo;{testimonials[2].quote}&rdquo;
              </p>
              <footer className="mt-8 border-t border-white/10 pt-5">
                <p className="display-font text-[2rem] leading-none text-white">
                  {testimonials[2].author}
                </p>
                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.3em] text-white/50">
                  {testimonials[2].meta}
                </p>
              </footer>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
