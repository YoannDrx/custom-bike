import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  slug: string;
  name: string;
  tagline: string | null;
  priceCents: number;
  compareAtCents: number | null;
  currency: string;
  image: string | null;
  category?: string | null;
  stock: number;
  trackStock: boolean;
};

export function ProductCard({
  slug,
  name,
  tagline,
  priceCents,
  compareAtCents,
  currency,
  image,
  category,
  stock,
  trackStock,
}: ProductCardProps) {
  const outOfStock = trackStock && stock <= 0;
  return (
    <Link
      href={`/boutique/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--surface)]/70 transition hover:border-[color:var(--vice-pink)]/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(255,30,110,0.4)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/30 text-xs uppercase tracking-[0.25em]">
            Custom Bike
          </div>
        )}
        {compareAtCents && compareAtCents > priceCents ? (
          <span className="absolute left-3 top-3 rounded-full bg-[color:var(--vice-pink)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            Promo
          </span>
        ) : null}
        {outOfStock ? (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Rupture
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {category ? (
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--vice-cyan)]">
            {category}
          </span>
        ) : null}
        <h3 className="font-[family-name:var(--font-archivo-black)] text-lg text-white">
          {name}
        </h3>
        {tagline ? (
          <p className="text-sm text-white/60 line-clamp-2">{tagline}</p>
        ) : null}
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest text-[color:var(--vice-pink)]">
            {formatPrice(priceCents, currency)}
          </span>
          {compareAtCents && compareAtCents > priceCents ? (
            <span className="text-sm text-white/30 line-through">
              {formatPrice(compareAtCents, currency)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
