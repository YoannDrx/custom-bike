"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getRequiredAdmin } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { slugify } from "@/lib/utils";

const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
});

const variantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(80),
  sku: z.string().max(60).optional().nullable(),
  priceCents: z.coerce.number().int().min(0).optional().nullable(),
  stock: z.coerce.number().int().min(0).default(0),
});

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).optional(),
  tagline: z.string().max(160).optional().nullable(),
  description: z.string().min(4),
  priceCents: z.coerce.number().int().min(0),
  compareAtCents: z.coerce.number().int().min(0).optional().nullable(),
  stock: z.coerce.number().int().min(0).default(0),
  trackStock: z.coerce.boolean().default(true),
  weightGrams: z.coerce.number().int().min(0).optional().nullable(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  featured: z.coerce.boolean().default(false),
  categoryId: z.string().optional().nullable(),
  metaTitle: z.string().max(160).optional().nullable(),
  metaDescription: z.string().max(280).optional().nullable(),
  images: z.array(imageSchema).default([]),
  variants: z.array(variantSchema).default([]),
  syncStripe: z.coerce.boolean().default(false),
});

export type ProductFormInput = z.infer<typeof productSchema>;

export async function upsertProduct(input: ProductFormInput) {
  await getRequiredAdmin();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }
  const data = parsed.data;
  const slug = (data.slug && data.slug.length > 0 ? data.slug : slugify(data.name)) || slugify(data.name);

  const existing = data.id
    ? await prisma.product.findUnique({ where: { id: data.id } })
    : null;

  const stripeIds: { stripeProductId?: string; stripePriceId?: string } = {};
  if (data.syncStripe) {
    try {
      const stripe = getStripe();
      if (stripe) {
        const payload = {
          name: data.name,
          description: data.tagline ?? undefined,
          images: data.images.slice(0, 1).map((i) => i.url),
          active: data.status === "ACTIVE",
        };
        const product = existing?.stripeProductId
          ? await stripe.products.update(existing.stripeProductId, payload)
          : await stripe.products.create(payload);
        stripeIds.stripeProductId = product.id;
        if (!existing || existing.priceCents !== data.priceCents || !existing.stripePriceId) {
          const price = await stripe.prices.create({
            product: product.id,
            currency: "eur",
            unit_amount: data.priceCents,
          });
          stripeIds.stripePriceId = price.id;
          if (existing?.stripePriceId) {
            await stripe.prices
              .update(existing.stripePriceId, { active: false })
              .catch(() => undefined);
          }
        }
      }
    } catch (err) {
      console.error("[admin-products] stripe sync", err);
    }
  }

  const product = await prisma.product.upsert({
    where: { id: data.id ?? "___new___" },
    update: {
      name: data.name,
      slug,
      tagline: data.tagline ?? undefined,
      description: data.description,
      priceCents: data.priceCents,
      compareAtCents: data.compareAtCents ?? null,
      stock: data.stock,
      trackStock: data.trackStock,
      weightGrams: data.weightGrams ?? null,
      status: data.status,
      featured: data.featured,
      categoryId: data.categoryId || null,
      metaTitle: data.metaTitle ?? null,
      metaDescription: data.metaDescription ?? null,
      ...stripeIds,
    },
    create: {
      name: data.name,
      slug,
      tagline: data.tagline ?? undefined,
      description: data.description,
      priceCents: data.priceCents,
      compareAtCents: data.compareAtCents ?? null,
      stock: data.stock,
      trackStock: data.trackStock,
      weightGrams: data.weightGrams ?? null,
      status: data.status,
      featured: data.featured,
      categoryId: data.categoryId || null,
      metaTitle: data.metaTitle ?? null,
      metaDescription: data.metaDescription ?? null,
      ...stripeIds,
    },
  });

  await prisma.productImage.deleteMany({ where: { productId: product.id } });
  if (data.images.length > 0) {
    await prisma.productImage.createMany({
      data: data.images.map((img, index) => ({
        productId: product.id,
        url: img.url,
        alt: img.alt ?? null,
        position: index,
      })),
    });
  }

  const currentVariants = await prisma.productVariant.findMany({
    where: { productId: product.id },
  });
  const keptIds = new Set(data.variants.map((v) => v.id).filter(Boolean) as string[]);
  const toDelete = currentVariants.filter((v) => !keptIds.has(v.id));
  if (toDelete.length > 0) {
    await prisma.productVariant.deleteMany({
      where: { id: { in: toDelete.map((v) => v.id) } },
    });
  }
  for (const variant of data.variants) {
    if (variant.id) {
      await prisma.productVariant.update({
        where: { id: variant.id },
        data: {
          name: variant.name,
          sku: variant.sku ?? null,
          priceCents: variant.priceCents ?? null,
          stock: variant.stock,
        },
      });
    } else {
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          name: variant.name,
          sku: variant.sku ?? null,
          priceCents: variant.priceCents ?? null,
          stock: variant.stock,
        },
      });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/boutique");
  revalidatePath(`/boutique/${slug}`);
  return { ok: true as const, id: product.id };
}

export async function deleteProduct(id: string) {
  await getRequiredAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/boutique");
  return { ok: true as const };
}

export async function duplicateProduct(id: string) {
  await getRequiredAdmin();
  const source = await prisma.product.findUnique({
    where: { id },
    include: { images: true, variants: true },
  });
  if (!source) return { ok: false as const, error: "Produit introuvable" };
  const copy = await prisma.product.create({
    data: {
      name: `${source.name} (copie)`,
      slug: `${source.slug}-copie-${Date.now().toString(36).slice(-4)}`,
      tagline: source.tagline,
      description: source.description,
      priceCents: source.priceCents,
      compareAtCents: source.compareAtCents,
      stock: source.stock,
      trackStock: source.trackStock,
      weightGrams: source.weightGrams,
      status: "DRAFT",
      featured: false,
      categoryId: source.categoryId,
      metaTitle: source.metaTitle,
      metaDescription: source.metaDescription,
      images: {
        create: source.images.map((img) => ({
          url: img.url,
          alt: img.alt,
          position: img.position,
        })),
      },
      variants: {
        create: source.variants.map((v) => ({
          name: v.name,
          sku: v.sku,
          priceCents: v.priceCents,
          stock: v.stock,
        })),
      },
    },
  });
  revalidatePath("/admin/products");
  return { ok: true as const, id: copy.id };
}

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(80),
  slug: z.string().optional(),
  description: z.string().max(280).optional().nullable(),
  image: z.string().url().optional().nullable(),
  position: z.coerce.number().int().default(0),
});

export async function upsertCategory(input: z.infer<typeof categorySchema>) {
  await getRequiredAdmin();
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Données invalides" };
  const data = parsed.data;
  const slug = data.slug?.length ? data.slug : slugify(data.name);

  const category = await prisma.category.upsert({
    where: { id: data.id ?? "___new___" },
    update: {
      name: data.name,
      slug,
      description: data.description ?? null,
      image: data.image ?? null,
      position: data.position,
    },
    create: {
      name: data.name,
      slug,
      description: data.description ?? null,
      image: data.image ?? null,
      position: data.position,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/boutique");
  return { ok: true as const, id: category.id };
}

export async function deleteCategory(id: string) {
  await getRequiredAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/boutique");
  return { ok: true as const };
}
