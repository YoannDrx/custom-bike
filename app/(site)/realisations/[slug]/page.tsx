import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const realization = await prisma.realization.findUnique({
    where: { slug },
    select: { title: true, summary: true, coverImage: true },
  });
  if (!realization) return { title: "Réalisation introuvable" };
  return {
    title: `${realization.title} | Custom Bike`,
    description: realization.summary ?? undefined,
    openGraph: realization.coverImage ? { images: [realization.coverImage] } : undefined,
  };
}

export const dynamic = "force-dynamic";

export default async function RealisationDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const realization = await prisma.realization.findUnique({
    where: { slug },
    include: { images: { orderBy: { position: "asc" } } },
  });
  if (!realization || !realization.published) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6">
      <Link
        href="/realisations"
        className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)] hover:text-white"
      >
        ← Toutes les réalisations
      </Link>

      <header className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-pink)]">
            {realization.category ?? "Atelier"}
            {realization.bike ? ` · ${realization.bike}` : ""}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-archivo-black)] text-5xl leading-[0.92] text-white md:text-6xl">
            {realization.title}
          </h1>
          {realization.summary ? (
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              {realization.summary}
            </p>
          ) : null}
        </div>
      </header>

      {realization.coverImage ? (
        <div className="neo-image-frame mt-10 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image
            src={realization.coverImage}
            alt={realization.title}
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {realization.description ? (
        <div
          className="prose prose-invert mt-10 max-w-3xl text-white/80"
          dangerouslySetInnerHTML={{ __html: realization.description }}
        />
      ) : null}

      {realization.images.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-[0.2em] text-white">
            Galerie
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {realization.images.map((img) => (
              <div
                key={img.id}
                className="neo-image-frame aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.url}
                  alt={img.alt ?? realization.title}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-14 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact"
          className="rounded-full bg-[color:var(--vice-pink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
        >
          Discuter d&apos;un projet
        </Link>
        <Link
          href="/realisations"
          className="rounded-full border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:border-white/40"
        >
          Autres réalisations
        </Link>
      </div>
    </div>
  );
}
