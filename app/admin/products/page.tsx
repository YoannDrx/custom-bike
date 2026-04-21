import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

import { ProductRowActions } from "@/components/admin/product-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; status?: string; category?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const q = params.q?.trim() ?? "";
  const statusFilter = params.status;
  const categoryFilter = params.category;

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { name: { contains: q, mode: "insensitive" } },
                  { slug: { contains: q, mode: "insensitive" } },
                ],
              }
            : {},
          statusFilter && ["DRAFT", "ACTIVE", "ARCHIVED"].includes(statusFilter)
            ? { status: statusFilter as "DRAFT" | "ACTIVE" | "ARCHIVED" }
            : {},
          categoryFilter ? { categoryId: categoryFilter } : {},
        ],
      },
      include: {
        category: true,
        images: { orderBy: { position: "asc" }, take: 1 },
        _count: { select: { orderItems: true, variants: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 200,
    }),
    prisma.category.findMany({ orderBy: { position: "asc" } }),
  ]);

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-h1">Produits</h1>
          <p className="admin-subtitle">
            {products.length} produit{products.length > 1 ? "s" : ""} ·{" "}
            <Link href="/admin/products/categories" className="admin-link">
              Catégories
            </Link>
          </p>
        </div>
        <Link href="/admin/products/new" className="neo-button neo-button-primary">
          <span>Nouveau produit</span>
          <span className="neo-button-mark" />
        </Link>
      </header>

      <form className="admin-toolbar" method="get">
        <div className="admin-toolbar-filters" style={{ flex: 1 }}>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Rechercher par nom ou slug…"
            className="admin-input"
            style={{ maxWidth: 280 }}
          />
          <select
            name="status"
            defaultValue={statusFilter ?? ""}
            className="admin-select"
            style={{ maxWidth: 180 }}
          >
            <option value="">Tous les statuts</option>
            <option value="ACTIVE">Actifs</option>
            <option value="DRAFT">Brouillons</option>
            <option value="ARCHIVED">Archivés</option>
          </select>
          <select
            name="category"
            defaultValue={categoryFilter ?? ""}
            className="admin-select"
            style={{ maxWidth: 200 }}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
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
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Statut</th>
              <th>Ventes</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="admin-empty" style={{ padding: "2rem" }}>
                  Aucun produit.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.05)",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        {product.images[0]?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.images[0].url}
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : null}
                      </div>
                      <div>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="admin-list-main"
                        >
                          {product.name}
                        </Link>
                        <p className="admin-list-sub">/{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.category?.name ?? "—"}</td>
                  <td>{formatPrice(product.priceCents)}</td>
                  <td>
                    {product.trackStock ? (
                      <span
                        className={`admin-pill ${
                          product.stock <= 0
                            ? "admin-pill-danger"
                            : product.stock <= 3
                              ? "admin-pill-warn"
                              : "admin-pill-positive"
                        }`}
                      >
                        {product.stock}
                      </span>
                    ) : (
                      <span className="admin-pill">illimité</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`admin-pill admin-pill-${
                        product.status === "ACTIVE"
                          ? "positive"
                          : product.status === "DRAFT"
                            ? "warn"
                            : "neutral"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td>{product._count.orderItems}</td>
                  <td>
                    <ProductRowActions productId={product.id} slug={product.slug} />
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
