"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getRequiredAdmin } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(2).max(140),
  slug: z.string().optional(),
  bike: z.string().max(80).optional().nullable(),
  category: z.string().max(60).optional().nullable(),
  summary: z.string().max(280).optional().nullable(),
  description: z.string().optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  position: z.coerce.number().int().default(0),
  images: z
    .array(z.object({ url: z.string().url(), alt: z.string().optional() }))
    .default([]),
});

export async function upsertRealization(input: z.infer<typeof schema>) {
  await getRequiredAdmin();
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Données invalides" };
  const data = parsed.data;
  const slug = data.slug?.length ? data.slug : slugify(data.title);

  const realization = await prisma.realization.upsert({
    where: { id: data.id ?? "___new___" },
    update: {
      title: data.title,
      slug,
      bike: data.bike ?? null,
      category: data.category ?? null,
      summary: data.summary ?? null,
      description: data.description ?? null,
      coverImage: data.coverImage ?? null,
      featured: data.featured,
      published: data.published,
      position: data.position,
    },
    create: {
      title: data.title,
      slug,
      bike: data.bike ?? null,
      category: data.category ?? null,
      summary: data.summary ?? null,
      description: data.description ?? null,
      coverImage: data.coverImage ?? null,
      featured: data.featured,
      published: data.published,
      position: data.position,
    },
  });

  await prisma.realizationImage.deleteMany({ where: { realizationId: realization.id } });
  if (data.images.length > 0) {
    await prisma.realizationImage.createMany({
      data: data.images.map((img, index) => ({
        realizationId: realization.id,
        url: img.url,
        alt: img.alt ?? null,
        position: index,
      })),
    });
  }

  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
  return { ok: true as const, id: realization.id };
}

export async function deleteRealization(id: string) {
  await getRequiredAdmin();
  await prisma.realization.delete({ where: { id } });
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
  return { ok: true as const };
}
