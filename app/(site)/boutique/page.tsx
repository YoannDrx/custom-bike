import type { Metadata } from "next";

import { ProductCard } from "@/components/shop/product-card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Boutique accessoires & customisation moto",
  description:
    "Feux LED, covering, crashbars, CarPlay, sellerie : sélection d'accessoires posés ou livrés par l'atelier Custom Bike.",
};

export const dynamic = "force-dynamic";

type SearchParams = { categorie?: string; tri?: string; q?: string };

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { categorie, tri, q } = await searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: { position: "asc" },
      include: { _count: { select: { products: { where: { status: "ACTIVE" } } } } },
    }),
    prisma.product.findMany({
      where: {
        status: "ACTIVE",
        ...(categorie ? { category: { slug: categorie } } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { tagline: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        category: true,
      },
      orderBy:
        tri === "prix-croissant"
          ? { priceCents: "asc" }
          : tri === "prix-decroissant"
            ? { priceCents: "desc" }
            : tri === "nouveaux"
              ? { createdAt: "desc" }
              : [{ featured: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="mb-12 max-w-3xl space-y-4">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-pink)]">
          Boutique atelier
        </div>
        <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white lg:text-5xl">
          Accessoires posés ou livrés.
        </h1>
        <p className="text-base text-white/60">
          Feux LED, signature lumineuse, covering, protections, CarPlay, sellerie : ce qu&apos;on pose à
          l&apos;atelier est aussi dispo en ligne.
        </p>
      </div>

      <form
        method="get"
        className="mb-10 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
      >
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Chercher un produit…"
          className="flex-1 min-w-[180px] bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none"
        />
        <select
          name="tri"
          defaultValue={tri ?? ""}
          className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
        >
          <option value="">Pertinence</option>
          <option value="nouveaux">Nouveautés</option>
          <option value="prix-croissant">Prix croissant</option>
          <option value="prix-decroissant">Prix décroissant</option>
        </select>
        <button
          type="submit"
          className="rounded-full bg-[color:var(--vice-pink)] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white"
        >
          Filtrer
        </button>
      </form>

      <div className="mb-10 flex flex-wrap gap-2">
        <a
          href="/boutique"
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${!categorie ? "border-[color:var(--vice-pink)] bg-[color:var(--vice-pink)]/15 text-white" : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"}`}
        >
          Toutes
        </a>
        {categories.map((cat) => {
          const active = categorie === cat.slug;
          const qsParts = [`categorie=${cat.slug}`];
          if (tri) qsParts.push(`tri=${tri}`);
          return (
            <a
              key={cat.id}
              href={`/boutique?${qsParts.join("&")}`}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${active ? "border-[color:var(--vice-pink)] bg-[color:var(--vice-pink)]/15 text-white" : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"}`}
            >
              {cat.name}
              {cat._count ? (
                <span className="ml-2 text-white/40">{cat._count.products}</span>
              ) : null}
            </a>
          );
        })}
      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--vice-pink)]/40 bg-[color:var(--vice-pink)]/10 text-2xl">
            🛠️
          </div>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest text-white">
            {q || categorie ? "Rien trouvé ici" : "Boutique en préparation"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
            {q || categorie
              ? "Essaie de changer tes filtres ou de vider ta recherche."
              : "L'équipe prépare la mise en ligne des premiers produits. Reviens vite, ou écris-nous pour une demande spécifique."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {q || categorie ? (
              <a
                href="/boutique"
                className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:border-[color:var(--vice-cyan)]"
              >
                Réinitialiser
              </a>
            ) : (
              <a
                href="/contact"
                className="rounded-full bg-[color:var(--vice-pink)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black hover:brightness-110"
              >
                Nous écrire
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              name={product.name}
              tagline={product.tagline}
              priceCents={product.priceCents}
              compareAtCents={product.compareAtCents}
              currency={product.currency}
              image={product.images[0]?.url ?? null}
              category={product.category?.name}
              stock={product.stock}
              trackStock={product.trackStock}
            />
          ))}
        </div>
      )}
    </div>
  );
}
