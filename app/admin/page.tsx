import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    revenueMonth,
    revenuePrevMonth,
    revenueAllTime,
    ordersThisMonth,
    ordersPending,
    ordersPaid,
    unreadMessages,
    lowStockProducts,
    activeProducts,
    totalCustomers,
    recentOrders,
    recentMessages,
    topProducts,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { createdAt: { gte: startOfMonth }, paymentStatus: "PAID" },
      _sum: { totalCents: true },
      _count: true,
    }),
    prisma.order.aggregate({
      where: {
        createdAt: { gte: startOfPrevMonth, lt: startOfMonth },
        paymentStatus: "PAID",
      },
      _sum: { totalCents: true },
    }),
    prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { totalCents: true },
    }),
    prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.order.count({ where: { paymentStatus: "PAID" } }),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.product.findMany({
      where: { trackStock: true, stock: { lte: 3 }, status: "ACTIVE" },
      orderBy: { stock: "asc" },
      take: 5,
    }),
    prisma.product.count({ where: { status: "ACTIVE" } }),
    prisma.user.count(),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { items: { take: 1 } },
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.orderItem.groupBy({
      by: ["productId", "name"],
      _sum: { quantity: true, totalCents: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
      where: { productId: { not: null } },
    }),
  ]);

  const revenueMonthCents = revenueMonth._sum.totalCents ?? 0;
  const revenuePrevCents = revenuePrevMonth._sum.totalCents ?? 0;
  const delta =
    revenuePrevCents > 0
      ? ((revenueMonthCents - revenuePrevCents) / revenuePrevCents) * 100
      : revenueMonthCents > 0
        ? 100
        : 0;

  const stats = [
    {
      label: "Revenus du mois",
      value: formatCurrency(revenueMonthCents),
      hint:
        revenuePrevCents > 0
          ? `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}% vs mois dernier`
          : "Premier mois de ventes",
      tone: delta >= 0 ? "positive" : "negative",
    },
    {
      label: "Chiffre d'affaires total",
      value: formatCurrency(revenueAllTime._sum.totalCents ?? 0),
      hint: `${revenueMonth._count} commandes ce mois`,
      tone: "neutral",
    },
    {
      label: "Commandes payées",
      value: ordersPaid.toString(),
      hint: `${ordersThisMonth} commandes ce mois`,
      tone: "neutral",
    },
    {
      label: "Messages non lus",
      value: unreadMessages.toString(),
      hint: unreadMessages > 0 ? "À traiter rapidement" : "Tout est à jour",
      tone: unreadMessages > 0 ? "warn" : "positive",
    },
    {
      label: "Produits actifs",
      value: activeProducts.toString(),
      hint: `${lowStockProducts.length} en stock faible`,
      tone: lowStockProducts.length > 0 ? "warn" : "neutral",
    },
    {
      label: "Clients",
      value: totalCustomers.toString(),
      hint: "Comptes utilisateurs",
      tone: "neutral",
    },
  ];

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-h1">Aperçu</h1>
          <p className="admin-subtitle">Vue d&apos;ensemble de l&apos;atelier et de la boutique.</p>
        </div>
      </header>

      <section className="admin-stat-grid">
        {stats.map((stat) => (
          <article key={stat.label} className={`admin-stat admin-stat-${stat.tone}`}>
            <p className="admin-stat-label">{stat.label}</p>
            <p className="admin-stat-value">{stat.value}</p>
            <p className="admin-stat-hint">{stat.hint}</p>
          </article>
        ))}
      </section>

      <section className="admin-grid admin-grid-2">
        <article className="admin-card">
          <header className="admin-card-header">
            <h2 className="admin-h2">Dernières commandes</h2>
            <Link href="/admin/orders" className="admin-link">
              Tout voir
            </Link>
          </header>
          {recentOrders.length === 0 ? (
            <p className="admin-empty">Aucune commande pour l&apos;instant.</p>
          ) : (
            <ul className="admin-list">
              {recentOrders.map((order) => (
                <li key={order.id} className="admin-list-row">
                  <div>
                    <Link href={`/admin/orders/${order.id}`} className="admin-list-main">
                      {order.number}
                    </Link>
                    <p className="admin-list-sub">
                      {order.email} · {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="admin-list-right">
                    <span className={`admin-pill admin-pill-${statusTone(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="admin-list-amount">
                      {formatCurrency(order.totalCents)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="admin-card">
          <header className="admin-card-header">
            <h2 className="admin-h2">Messages récents</h2>
            <Link href="/admin/messages" className="admin-link">
              Tout voir
            </Link>
          </header>
          {recentMessages.length === 0 ? (
            <p className="admin-empty">Aucun message pour le moment.</p>
          ) : (
            <ul className="admin-list">
              {recentMessages.map((msg) => (
                <li key={msg.id} className="admin-list-row">
                  <div>
                    <p className="admin-list-main">{msg.name}</p>
                    <p className="admin-list-sub">
                      {msg.email} · {formatDate(msg.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`admin-pill admin-pill-${
                      msg.status === "NEW" ? "warn" : "neutral"
                    }`}
                  >
                    {msg.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <section className="admin-grid admin-grid-2">
        <article className="admin-card">
          <header className="admin-card-header">
            <h2 className="admin-h2">Stock faible</h2>
            <Link href="/admin/products" className="admin-link">
              Gérer les produits
            </Link>
          </header>
          {lowStockProducts.length === 0 ? (
            <p className="admin-empty">Aucun produit en alerte stock.</p>
          ) : (
            <ul className="admin-list">
              {lowStockProducts.map((product) => (
                <li key={product.id} className="admin-list-row">
                  <div>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="admin-list-main"
                    >
                      {product.name}
                    </Link>
                    <p className="admin-list-sub">{formatCurrency(product.priceCents)}</p>
                  </div>
                  <span className="admin-pill admin-pill-warn">
                    {product.stock} en stock
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="admin-card">
          <header className="admin-card-header">
            <h2 className="admin-h2">Top produits (ventes)</h2>
          </header>
          {topProducts.length === 0 ? (
            <p className="admin-empty">Pas encore de ventes enregistrées.</p>
          ) : (
            <ul className="admin-list">
              {topProducts.map((row) => (
                <li key={`${row.productId}-${row.name}`} className="admin-list-row">
                  <div>
                    <p className="admin-list-main">{row.name}</p>
                    <p className="admin-list-sub">
                      {row._sum.quantity ?? 0} unités vendues
                    </p>
                  </div>
                  <span className="admin-list-amount">
                    {formatCurrency(row._sum.totalCents ?? 0)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <section className="admin-card">
        <header className="admin-card-header">
          <h2 className="admin-h2">Raccourcis</h2>
        </header>
        <div className="admin-shortcut-grid">
          <Link href="/admin/products/new" className="admin-shortcut">
            <span className="admin-shortcut-title">Ajouter un produit</span>
            <span className="admin-shortcut-sub">Création rapide avec images</span>
          </Link>
          <Link href="/admin/realisations/new" className="admin-shortcut">
            <span className="admin-shortcut-title">Nouvelle réalisation</span>
            <span className="admin-shortcut-sub">Galerie + photos avant/après</span>
          </Link>
          <Link href="/admin/orders" className="admin-shortcut">
            <span className="admin-shortcut-title">Commandes en attente</span>
            <span className="admin-shortcut-sub">{ordersPending} à préparer</span>
          </Link>
          <Link href="/admin/messages" className="admin-shortcut">
            <span className="admin-shortcut-title">Inbox contact</span>
            <span className="admin-shortcut-sub">{unreadMessages} non lus</span>
          </Link>
        </div>
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
