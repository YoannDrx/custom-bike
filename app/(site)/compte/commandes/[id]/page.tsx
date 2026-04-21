import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getRequiredUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { formatDateTime, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function OrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getRequiredUser();
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, shippingAddress: true },
  });

  if (!order) notFound();
  if (order.userId && order.userId !== user.id && user.role !== "admin") {
    if (order.email !== user.email) notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/compte/commandes"
        className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white"
      >
        ← Toutes mes commandes
      </Link>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">Commande</div>
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-widest text-white">
              {order.number}
            </h2>
            <p className="text-sm text-white/50">{formatDateTime(order.createdAt)}</p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">Total</div>
            <div className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-widest text-[color:var(--vice-pink)]">
              {formatPrice(order.totalCents, order.currency)}
            </div>
            <div className="text-xs text-white/50">
              Statut : <span className="font-semibold text-white">{order.status}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 divide-y divide-white/5 border-y border-white/5">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black/40">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : null}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{item.name}</div>
                <div className="text-xs text-white/45">
                  {item.quantity} × {formatPrice(item.priceCents, order.currency)}
                </div>
              </div>
              <div className="text-sm font-semibold text-white">
                {formatPrice(item.totalCents, order.currency)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">Livraison</div>
            <div className="mt-1 text-sm text-white/80">
              {order.shippingMethod === "PICKUP"
                ? "Retrait atelier · 17 rue Voltaire, 93100 Montreuil"
                : order.shippingAddress
                  ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName} — ${order.shippingAddress.line1}, ${order.shippingAddress.postalCode} ${order.shippingAddress.city}`
                  : "À définir"}
            </div>
            {order.trackingNumber ? (
              <div className="mt-2 text-xs text-white/60">
                Suivi : <span className="font-semibold text-white">{order.trackingNumber}</span>
                {order.trackingUrl ? (
                  <>
                    {" · "}
                    <a
                      href={order.trackingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[color:var(--vice-cyan)] underline"
                    >
                      Suivre le colis
                    </a>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Sous-total</span>
              <span>{formatPrice(order.subtotalCents, order.currency)}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Livraison</span>
              <span>
                {order.shippingCents === 0
                  ? "Offerte"
                  : formatPrice(order.shippingCents, order.currency)}
              </span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-base font-semibold text-white">
              <span>Total</span>
              <span>{formatPrice(order.totalCents, order.currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
