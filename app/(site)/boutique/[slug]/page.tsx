import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

import { AddToCartBlock } from "./add-to-cart-block";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: {
      name: true,
      tagline: true,
      metaTitle: true,
      metaDescription: true,
      images: { orderBy: { position: "asc" }, take: 1, select: { url: true } },
    },
  });
  if (!product) return { title: "Produit introuvable" };
  const description = product.metaDescription ?? product.tagline ?? undefined;
  const image = product.images[0]?.url;
  return {
    title: product.metaTitle ?? product.name,
    description,
    openGraph: image
      ? {
          title: product.metaTitle ?? product.name,
          description,
          images: [{ url: image }],
        }
      : undefined,
    twitter: image
      ? { card: "summary_large_image", images: [image] }
      : undefined,
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      variants: { orderBy: { createdAt: "asc" } },
      category: true,
    },
  });

  if (!product || product.status !== "ACTIVE") notFound();

  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://custombike.fr";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline ?? undefined,
    image: product.images.map((i) => i.url),
    sku: product.id,
    brand: { "@type": "Brand", name: "Custom Bike" },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/boutique/${product.slug}`,
      priceCurrency: product.currency.toUpperCase(),
      price: (product.priceCents / 100).toFixed(2),
      availability:
        !product.trackStock || product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  const related = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    take: 4,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <nav className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
        <Link href="/boutique" className="hover:text-white">
          Boutique
        </Link>
        <span>/</span>
        {product.category ? (
          <>
            <Link
              href={`/boutique?categorie=${product.category.slug}`}
              className="hover:text-white"
            >
              {product.category.name}
            </Link>
            <span>/</span>
          </>
        ) : null}
        <span className="text-white/70">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-black/40">
            {product.images[0] ? (
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt ?? product.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            ) : null}
          </div>
          {product.images.length > 1 ? (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/40"
                >
                  <Image
                    src={img.url}
                    alt={img.alt ?? product.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          {product.category ? (
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[color:var(--vice-cyan)]">
              {product.category.name}
            </span>
          ) : null}
          <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white lg:text-5xl">
            {product.name}
          </h1>
          {product.tagline ? (
            <p className="text-lg text-white/70">{product.tagline}</p>
          ) : null}

          <div className="flex items-baseline gap-3">
            <span className="font-[family-name:var(--font-bebas-neue)] text-5xl tracking-widest text-[color:var(--vice-pink)]">
              {formatPrice(product.priceCents, product.currency)}
            </span>
            {product.compareAtCents && product.compareAtCents > product.priceCents ? (
              <span className="text-lg text-white/30 line-through">
                {formatPrice(product.compareAtCents, product.currency)}
              </span>
            ) : null}
          </div>

          {product.trackStock ? (
            product.stock > 0 ? (
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                En stock
                {product.stock <= 3 ? ` — plus que ${product.stock}` : ""}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-white/40">
                <span className="h-2 w-2 rounded-full bg-white/40" />
                Actuellement en rupture
              </div>
            )
          ) : null}

          <AddToCartBlock
            productId={product.id}
            variants={product.variants.map((v) => ({
              id: v.id,
              name: v.name,
              priceCents: v.priceCents,
              stock: v.stock,
            }))}
            basePriceCents={product.priceCents}
            currency={product.currency}
            outOfStock={product.trackStock && product.stock <= 0}
          />

          <div className="prose prose-invert prose-sm mt-4 max-w-none rounded-2xl border border-white/10 bg-white/5 p-6">
            <div
              className="text-white/70 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="mb-6 font-[family-name:var(--font-bebas-neue)] text-3xl tracking-widest text-white">
            Ça pourrait aussi t&apos;intéresser
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/boutique/${r.slug}`}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-[color:var(--vice-pink)]/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                  {r.images[0] ? (
                    <Image
                      src={r.images[0].url}
                      alt={r.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  ) : null}
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="mt-1 text-xs text-[color:var(--vice-pink)]">
                    {formatPrice(r.priceCents, r.currency)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
