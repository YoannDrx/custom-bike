import type { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Commande confirmée" };
export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  const order = session_id
    ? await prisma.order.findUnique({
        where: { stripeSessionId: session_id },
        include: { items: true },
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-3xl border border-[color:var(--vice-cyan)]/30 bg-[color:var(--surface)]/60 p-10 text-center">
        <div className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)]">
          Paiement validé
        </div>
        <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
          Merci pour ta commande
        </h1>
        {order ? (
          <p className="mt-4 text-white/60">
            Commande <span className="font-semibold text-white">{order.number}</span> ·{" "}
            <span className="font-semibold text-[color:var(--vice-pink)]">
              {formatPrice(order.totalCents, order.currency)}
            </span>
          </p>
        ) : (
          <p className="mt-4 text-white/60">
            Ton paiement a bien été enregistré. On te confirme la commande par email dans quelques instants.
          </p>
        )}

        {order ? (
          <div className="mx-auto mt-8 max-w-lg space-y-2 text-left text-sm text-white/70">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-white/5 py-2"
              >
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>{formatPrice(item.totalCents, order.currency)}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/boutique"
            className="rounded-full bg-[color:var(--vice-pink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
          >
            Continuer mes achats
          </Link>
          <Link
            href="/compte/commandes"
            className="rounded-full border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:border-white/40"
          >
            Voir mes commandes
          </Link>
        </div>
      </div>
    </div>
  );
}
