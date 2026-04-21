import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { RealizationForm } from "@/components/admin/realization-form";

export const dynamic = "force-dynamic";

export default async function EditRealizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const realization = await prisma.realization.findUnique({
    where: { id },
    include: { images: { orderBy: { position: "asc" } } },
  });
  if (!realization) notFound();

  return (
    <div className="admin-page">
      <header>
        <h1 className="admin-h1">{realization.title}</h1>
        <p className="admin-subtitle">/{realization.slug}</p>
      </header>
      <RealizationForm
        initial={{
          id: realization.id,
          title: realization.title,
          slug: realization.slug,
          bike: realization.bike,
          category: realization.category,
          summary: realization.summary,
          description: realization.description,
          coverImage: realization.coverImage,
          featured: realization.featured,
          published: realization.published,
          position: realization.position,
          images: realization.images.map((img) => ({ url: img.url, alt: img.alt ?? "" })),
        }}
      />
    </div>
  );
}
