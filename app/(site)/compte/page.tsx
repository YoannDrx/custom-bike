import Link from "next/link";

import { getRequiredUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ComptePage() {
  const user = await getRequiredUser();
  const [orders, messages] = await Promise.all([
    prisma.order.findMany({
      where: { OR: [{ userId: user.id }, { email: user.email }] },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.contactMessage.count({
      where: { OR: [{ userId: user.id }, { email: user.email }] },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-white/50">Commandes</div>
          <div className="mt-2 font-[family-name:var(--font-bebas-neue)] text-4xl tracking-wider text-white">
            {orders.length}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-white/50">Messages</div>
          <div className="mt-2 font-[family-name:var(--font-bebas-neue)] text-4xl tracking-wider text-white">
            {messages}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-white/50">Depuis</div>
          <div className="mt-2 font-[family-name:var(--font-bebas-neue)] text-lg tracking-wider text-white">
            {formatDate(user.createdAt)}
          </div>
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest text-white">
            Dernières commandes
          </h2>
          <Link
            href="/compte/commandes"
            className="text-xs uppercase tracking-[0.18em] text-white/50 hover:text-white"
          >
            Tout voir
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-white/50">
            Pas encore de commande. <Link href="/boutique" className="underline">Visite la boutique</Link>.
          </div>
        ) : (
          <div className="space-y-2">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/compte/commandes/${order.id}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[color:var(--vice-pink)]/40"
              >
                <div>
                  <div className="text-sm font-semibold text-white">{order.number}</div>
                  <div className="text-xs text-white/45">{formatDate(order.createdAt)} · {order.status}</div>
                </div>
                <div className="text-sm font-semibold text-[color:var(--vice-pink)]">
                  {formatPrice(order.totalCents, order.currency)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
