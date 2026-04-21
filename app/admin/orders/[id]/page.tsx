import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatDateTime, formatPrice } from "@/lib/utils";

import { OrderStatusForm } from "@/components/admin/order-status-form";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      shippingAddress: true,
      user: true,
    },
  });
  if (!order) notFound();

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <Link href="/admin/orders" className="admin-link">
            ← Retour
          </Link>
          <h1 className="admin-h1">Commande {order.number}</h1>
          <p className="admin-subtitle">
            Passée le {formatDateTime(order.createdAt)}
            {order.paidAt ? ` · payée le ${formatDateTime(order.paidAt)}` : ""}
          </p>
        </div>
      </header>

      <section className="admin-grid admin-grid-2">
        <article className="admin-card">
          <h2 className="admin-h2" style={{ marginBottom: 12 }}>
            Client
          </h2>
          <p className="admin-list-main">{order.email}</p>
          {order.phone ? <p className="admin-list-sub">{order.phone}</p> : null}
          {order.user ? (
            <Link
              href={`/admin/customers/${order.user.id}`}
              className="admin-link"
              style={{ display: "inline-block", marginTop: 8 }}
            >
              Voir le profil client
            </Link>
          ) : (
            <p className="admin-list-sub" style={{ marginTop: 8 }}>
              Invité (sans compte)
            </p>
          )}
        </article>

        <article className="admin-card">
          <h2 className="admin-h2" style={{ marginBottom: 12 }}>
            Livraison
          </h2>
          <p className="admin-list-sub">Méthode : {order.shippingMethod}</p>
          {order.shippingAddress ? (
            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
              <p>
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 ? <p>{order.shippingAddress.line2}</p> : null}
              <p>
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          ) : (
            <p className="admin-empty">Retrait atelier.</p>
          )}
        </article>
      </section>

      <section className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{formatPrice(item.priceCents)}</td>
                <td>{formatPrice(item.totalCents)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ textAlign: "right" }}>
                Sous-total
              </td>
              <td>{formatPrice(order.subtotalCents)}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ textAlign: "right" }}>
                Livraison
              </td>
              <td>{formatPrice(order.shippingCents)}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ textAlign: "right", fontWeight: 700 }}>
                Total
              </td>
              <td style={{ fontWeight: 700 }}>{formatPrice(order.totalCents)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <OrderStatusForm
        order={{
          id: order.id,
          status: order.status,
          trackingNumber: order.trackingNumber ?? "",
          trackingUrl: order.trackingUrl ?? "",
          notes: order.notes ?? "",
        }}
      />
    </div>
  );
}
