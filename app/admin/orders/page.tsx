import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatDateTime, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

const ORDER_STATUSES = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
] as const;

type OrderStatus = (typeof ORDER_STATUSES)[number];

const isOrderStatus = (value: string | undefined): value is OrderStatus =>
  !!value && (ORDER_STATUSES as readonly string[]).includes(value);

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; status?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const q = params.q?.trim() ?? "";
  const statusFilter = isOrderStatus(params.status) ? params.status : null;

  const orders = await prisma.order.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { number: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        statusFilter ? { status: statusFilter } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      items: { select: { id: true, quantity: true, name: true } },
    },
  });

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-h1">Commandes</h1>
          <p className="admin-subtitle">{orders.length} commande{orders.length > 1 ? "s" : ""}</p>
        </div>
      </header>

      <form className="admin-toolbar" method="get">
        <div className="admin-toolbar-filters" style={{ flex: 1 }}>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Numéro, email…"
            className="admin-input"
            style={{ maxWidth: 280 }}
          />
          <select
            name="status"
            defaultValue={statusFilter ?? ""}
            className="admin-select"
            style={{ maxWidth: 220 }}
          >
            <option value="">Tous les statuts</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="submit" className="neo-button neo-button-secondary">
            <span>Filtrer</span>
            <span className="neo-button-mark" />
          </button>
        </div>
      </form>

      <section className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Client</th>
              <th>Statut</th>
              <th>Paiement</th>
              <th>Articles</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="admin-empty" style={{ padding: "2rem" }}>
                  Aucune commande.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="admin-list-main"
                    >
                      {order.number}
                    </Link>
                  </td>
                  <td>{order.email}</td>
                  <td>
                    <span className={`admin-pill admin-pill-${statusTone(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-pill admin-pill-${paymentTone(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>{order.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
                  <td>{formatPrice(order.totalCents)}</td>
                  <td style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
                    {formatDateTime(order.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function statusTone(status: string) {
  switch (status) {
    case "PAID":
    case "DELIVERED":
      return "positive";
    case "SHIPPED":
    case "PROCESSING":
      return "info";
    case "CANCELLED":
    case "REFUNDED":
      return "neutral";
    default:
      return "warn";
  }
}

function paymentTone(status: string) {
  switch (status) {
    case "PAID":
      return "positive";
    case "REFUNDED":
      return "neutral";
    case "FAILED":
      return "danger";
    default:
      return "warn";
  }
}
