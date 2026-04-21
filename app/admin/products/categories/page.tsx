import { prisma } from "@/lib/prisma";

import { CategoryManager } from "@/components/admin/category-manager";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { position: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return (
    <div className="admin-page">
      <header>
        <h1 className="admin-h1">Catégories</h1>
        <p className="admin-subtitle">Organise ta boutique avec des catégories.</p>
      </header>
      <CategoryManager
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          image: c.image,
          position: c.position,
          productCount: c._count.products,
        }))}
      />
    </div>
  );
}
