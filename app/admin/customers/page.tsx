import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const q = params.q?.trim() ?? "";

  const users = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      _count: { select: { orders: true } },
      orders: {
        where: { paymentStatus: "PAID" },
        select: { totalCents: true },
      },
    },
  });

  return (
    <div className="admin-page">
      <header>
        <h1 className="admin-h1">Clients</h1>
        <p className="admin-subtitle">{users.length} compte{users.length > 1 ? "s" : ""}</p>
      </header>

      <form className="admin-toolbar" method="get">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Nom ou email…"
          className="admin-input"
          style={{ maxWidth: 320 }}
        />
        <button type="submit" className="neo-button neo-button-secondary">
          <span>Rechercher</span>
          <span className="neo-button-mark" />
        </button>
      </form>

      <section className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Commandes</th>
              <th>CA total</th>
              <th>Inscrit</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-empty" style={{ padding: "2rem" }}>
                  Aucun client.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const revenue = user.orders.reduce(
                  (sum, order) => sum + order.totalCents,
                  0,
                );
                return (
                  <tr key={user.id}>
                    <td>
                      <Link
                        href={`/admin/customers/${user.id}`}
                        className="admin-list-main"
                      >
                        {user.name}
                      </Link>
                      {user.banned ? (
                        <span className="admin-pill admin-pill-danger" style={{ marginLeft: 8 }}>
                          BANNI
                        </span>
                      ) : null}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`admin-pill admin-pill-${
                          user.role === "admin" ? "info" : "neutral"
                        }`}
                      >
                        {user.role ?? "user"}
                      </span>
                    </td>
                    <td>{user._count.orders}</td>
                    <td>{formatPrice(revenue)}</td>
                    <td style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
