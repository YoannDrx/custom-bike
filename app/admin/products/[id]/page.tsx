import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { position: "asc" } },
        variants: { orderBy: { createdAt: "asc" } },
      },
    }),
    prisma.category.findMany({ orderBy: { position: "asc" } }),
  ]);
  if (!product) notFound();

  return (
    <div className="admin-page">
      <header>
        <h1 className="admin-h1">{product.name}</h1>
        <p className="admin-subtitle">/{product.slug}</p>
      </header>
      <ProductForm
        categories={categories}
        initial={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          tagline: product.tagline,
          description: product.description,
          priceCents: product.priceCents,
          compareAtCents: product.compareAtCents,
          stock: product.stock,
          trackStock: product.trackStock,
          weightGrams: product.weightGrams,
          status: product.status,
          featured: product.featured,
          categoryId: product.categoryId,
          metaTitle: product.metaTitle,
          metaDescription: product.metaDescription,
          images: product.images.map((i) => ({ url: i.url, alt: i.alt ?? "" })),
          variants: product.variants.map((v) => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            priceCents: v.priceCents,
            stock: v.stock,
          })),
        }}
      />
    </div>
  );
}
