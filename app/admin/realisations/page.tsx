import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

import { RealizationRowActions } from "@/components/admin/realization-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminRealizationsPage() {
  const realizations = await prisma.realization.findMany({
    orderBy: [{ featured: "desc" }, { position: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { images: true } } },
  });
  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-h1">Réalisations</h1>
          <p className="admin-subtitle">
            {realizations.length} projet{realizations.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/realisations/new" className="neo-button neo-button-primary">
          <span>Nouvelle réalisation</span>
          <span className="neo-button-mark" />
        </Link>
      </header>

      <section className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Moto</th>
              <th>Catégorie</th>
              <th>Images</th>
              <th>État</th>
              <th>Mise à jour</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {realizations.length === 0 ? (
              <tr>
                <td colSpan={7} className="admin-empty" style={{ padding: "2rem" }}>
                  Aucune réalisation.
                </td>
              </tr>
            ) : (
              realizations.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link
                      href={`/admin/realisations/${r.id}`}
                      className="admin-list-main"
                    >
                      {r.featured ? "★ " : ""}
                      {r.title}
                    </Link>
                    <p className="admin-list-sub">/{r.slug}</p>
                  </td>
                  <td>{r.bike ?? "—"}</td>
                  <td>{r.category ?? "—"}</td>
                  <td>{r._count.images}</td>
                  <td>
                    <span
                      className={`admin-pill admin-pill-${
                        r.published ? "positive" : "warn"
                      }`}
                    >
                      {r.published ? "PUBLIÉ" : "BROUILLON"}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
                    {formatDate(r.updatedAt)}
                  </td>
                  <td>
                    <RealizationRowActions id={r.id} />
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
