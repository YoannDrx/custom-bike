import type { Metadata } from "next";
import Link from "next/link";

import { CartView } from "./cart-view";
import { getUser } from "@/lib/auth-user";
import { getOrCreateCart, cartTotals } from "@/lib/cart";

export const metadata: Metadata = {
  title: "Mon panier",
};

export const dynamic = "force-dynamic";

export default async function PanierPage() {
  const user = await getUser();
  const cart = await getOrCreateCart(user?.id);
  const totals = cartTotals(cart.items);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
          Mon panier
        </h1>
        <Link
          href="/boutique"
          className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white"
        >
          ← Continuer mes achats
        </Link>
      </div>

      {cart.items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-16 text-center">
          <p className="text-white/60">Ton panier est vide pour le moment.</p>
          <Link
            href="/boutique"
            className="mt-6 inline-flex rounded-full bg-[color:var(--vice-pink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
          >
            Voir la boutique
          </Link>
        </div>
      ) : (
        <CartView
          initialItems={cart.items.map((item) => ({
            id: item.id,
            name: item.variant
              ? `${item.product.name} — ${item.variant.name}`
              : item.product.name,
            slug: item.product.slug,
            image: item.product.images[0]?.url ?? null,
            priceCents: item.priceCents,
            quantity: item.quantity,
            maxStock: item.product.trackStock
              ? (item.variant?.stock ?? item.product.stock)
              : 99,
          }))}
          initialTotals={totals}
          currency={cart.items[0]?.product.currency ?? "eur"}
          userEmail={user?.email ?? null}
        />
      )}
    </div>
  );
}
