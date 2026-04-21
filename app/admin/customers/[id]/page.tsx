import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { formatDateTime, formatPrice } from "@/lib/utils";

import { CustomerActions } from "@/components/admin/customer-actions";

export const dynamic = "force-dynamic";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      addresses: true,
    },
  });
  if (!user) notFound();

  return (
    <div className="admin-page">
      <header>
        <Link href="/admin/customers" className="admin-link">
          ← Retour
        </Link>
        <h1 className="admin-h1">{user.name}</h1>
        <p className="admin-subtitle">{user.email}</p>
      </header>

      <CustomerActions
        user={{
          id: user.id,
          role: (user.role ?? "user") as "user" | "admin",
          banned: user.banned ?? false,
          banReason: user.banReason ?? "",
        }}
      />

      <section className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Commandes
        </h2>
        {user.orders.length === 0 ? (
          <p className="admin-empty">Aucune commande.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Statut</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="admin-list-main"
                    >
                      {order.number}
                    </Link>
                  </td>
                  <td>
                    <span className="admin-pill">{order.status}</span>
                  </td>
                  <td>{formatPrice(order.totalCents)}</td>
                  <td style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
                    {formatDateTime(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
