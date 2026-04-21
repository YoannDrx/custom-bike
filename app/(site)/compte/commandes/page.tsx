import Link from "next/link";

import { getRequiredUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  PENDING: "text-amber-300 border-amber-500/40 bg-amber-500/10",
  PAID: "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
  PROCESSING: "text-sky-300 border-sky-500/40 bg-sky-500/10",
  SHIPPED: "text-cyan-300 border-cyan-500/40 bg-cyan-500/10",
  DELIVERED: "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
  CANCELLED: "text-white/40 border-white/20 bg-white/5",
  REFUNDED: "text-rose-300 border-rose-500/40 bg-rose-500/10",
};

export default async function CompteCommandesPage() {
  const user = await getRequiredUser();
  const orders = await prisma.order.findMany({
    where: { OR: [{ userId: user.id }, { email: user.email }] },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="space-y-4">
      <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-widest text-white">
        Mes commandes
      </h2>
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-white/50">
          Pas encore de commande passée.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/compte/commandes/${order.id}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[color:var(--vice-pink)]/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">{order.number}</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${statusStyles[order.status] ?? "border-white/20 text-white/50"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs text-white/45">
                    {formatDate(order.createdAt)} · {order.items.length} article
                    {order.items.length > 1 ? "s" : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-[family-name:var(--font-bebas-neue)] text-xl tracking-widest text-[color:var(--vice-pink)]">
                    {formatPrice(order.totalCents, order.currency)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
