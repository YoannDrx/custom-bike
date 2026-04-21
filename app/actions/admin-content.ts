"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getRequiredAdmin } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";

const testimonialSchema = z.object({
  id: z.string().optional(),
  author: z.string().min(2).max(80),
  bike: z.string().max(80).optional().nullable(),
  content: z.string().min(4).max(600),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  published: z.coerce.boolean().default(true),
  position: z.coerce.number().int().default(0),
});

export async function upsertTestimonial(input: z.infer<typeof testimonialSchema>) {
  await getRequiredAdmin();
  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Données invalides" };
  const data = parsed.data;
  await prisma.testimonial.upsert({
    where: { id: data.id ?? "___new___" },
    update: {
      author: data.author,
      bike: data.bike ?? null,
      content: data.content,
      rating: data.rating,
      published: data.published,
      position: data.position,
    },
    create: {
      author: data.author,
      bike: data.bike ?? null,
      content: data.content,
      rating: data.rating,
      published: data.published,
      position: data.position,
    },
  });
  revalidatePath("/admin/content");
  revalidatePath("/");
  return { ok: true as const };
}

export async function deleteTestimonial(id: string) {
  await getRequiredAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/content");
  revalidatePath("/");
  return { ok: true as const };
}

const faqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(4).max(180),
  answer: z.string().min(4).max(1200),
  category: z.string().max(60).optional().nullable(),
  position: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(true),
});

export async function upsertFaq(input: z.infer<typeof faqSchema>) {
  await getRequiredAdmin();
  const parsed = faqSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Données invalides" };
  const data = parsed.data;
  await prisma.faqItem.upsert({
    where: { id: data.id ?? "___new___" },
    update: {
      question: data.question,
      answer: data.answer,
      category: data.category ?? null,
      position: data.position,
      published: data.published,
    },
    create: {
      question: data.question,
      answer: data.answer,
      category: data.category ?? null,
      position: data.position,
      published: data.published,
    },
  });
  revalidatePath("/admin/content");
  revalidatePath("/");
  return { ok: true as const };
}

export async function deleteFaq(id: string) {
  await getRequiredAdmin();
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/admin/content");
  revalidatePath("/");
  return { ok: true as const };
}

const settingSchema = z.object({
  key: z.string().min(1),
  value: z.any(),
});

export async function upsertSetting(input: z.infer<typeof settingSchema>) {
  await getRequiredAdmin();
  const parsed = settingSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Données invalides" };
  await prisma.siteSetting.upsert({
    where: { key: parsed.data.key },
    update: { value: parsed.data.value },
    create: { key: parsed.data.key, value: parsed.data.value },
  });
  revalidatePath("/admin/settings");
  return { ok: true as const };
}
