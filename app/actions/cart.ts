"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth-user";
import { getOrCreateCart } from "@/lib/cart";
import { prisma } from "@/lib/prisma";

export async function addToCart(
  productId: string,
  variantId?: string | null,
  quantity = 1,
) {
  const user = await getUser();
  const cart = await getOrCreateCart(user?.id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { variants: true },
  });
  if (!product || product.status !== "ACTIVE") {
    return { ok: false as const, error: "Produit indisponible." };
  }

  const variant = variantId
    ? product.variants.find((v) => v.id === variantId)
    : null;

  const priceCents = variant?.priceCents ?? product.priceCents;
  const stock = variant ? variant.stock : product.stock;
  const safeQty = Math.max(1, Math.min(quantity, product.trackStock ? stock : 99));

  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId, variantId: variant?.id ?? null },
  });

  if (existing) {
    const newQty = Math.min(
      existing.quantity + safeQty,
      product.trackStock ? stock : 99,
    );
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: newQty, priceCents },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        variantId: variant?.id,
        quantity: safeQty,
        priceCents,
      },
    });
  }

  revalidatePath("/panier");
  revalidatePath("/boutique");
  return { ok: true as const };
}

export async function updateCartItem(itemId: string, quantity: number) {
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: itemId } }).catch(() => null);
  } else {
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { product: true, variant: true },
    });
    if (!item) return { ok: false as const, error: "Introuvable." };
    const stock = item.variant?.stock ?? item.product.stock;
    const safeQty = item.product.trackStock
      ? Math.min(quantity, stock)
      : quantity;
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: safeQty },
    });
  }
  revalidatePath("/panier");
  return { ok: true as const };
}

export async function removeCartItem(itemId: string) {
  await prisma.cartItem.delete({ where: { id: itemId } }).catch(() => null);
  revalidatePath("/panier");
  return { ok: true as const };
}

export async function clearCart() {
  const user = await getUser();
  const cart = await getOrCreateCart(user?.id);
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  revalidatePath("/panier");
  return { ok: true as const };
}
