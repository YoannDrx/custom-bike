import { prisma } from "@/lib/prisma";

import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { position: "asc" } });
  return (
    <div className="admin-page">
      <header>
        <h1 className="admin-h1">Nouveau produit</h1>
        <p className="admin-subtitle">Crée une fiche boutique et optionnellement synchronise avec Stripe.</p>
      </header>
      <ProductForm categories={categories} />
    </div>
  );
}
