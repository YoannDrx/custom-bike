import { cookies } from "next/headers";
import { nanoid } from "nanoid";

import { prisma } from "./prisma";

const COOKIE_NAME = "cb_cart_session";

export const getCartSessionId = async (readonly = false) => {
  const jar = await cookies();
  const existing = jar.get(COOKIE_NAME)?.value;
  if (existing) return existing;
  if (readonly) return null;
  const fresh = nanoid(24);
  jar.set(COOKIE_NAME, fresh, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
  });
  return fresh;
};

export const getOrCreateCart = async (userId?: string | null) => {
  const sessionId = await getCartSessionId();
  if (!sessionId) throw new Error("No cart session");

  const existing = await prisma.cart.findFirst({
    where: userId ? { OR: [{ userId }, { sessionId }] } : { sessionId },
    include: {
      items: {
        include: { product: { include: { images: { orderBy: { position: "asc" }, take: 1 } } }, variant: true },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  if (existing) {
    if (userId && !existing.userId) {
      return prisma.cart.update({
        where: { id: existing.id },
        data: { userId },
        include: {
          items: {
            include: {
              product: { include: { images: { orderBy: { position: "asc" }, take: 1 } } },
              variant: true,
            },
            orderBy: { createdAt: "asc" },
          },
        },
      });
    }
    return existing;
  }

  return prisma.cart.create({
    data: { sessionId, userId: userId ?? undefined },
    include: {
      items: {
        include: {
          product: { include: { images: { orderBy: { position: "asc" }, take: 1 } } },
          variant: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
};

export const cartTotals = (
  items: Array<{ priceCents: number; quantity: number }>,
) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );
  return {
    subtotalCents: subtotal,
    totalCents: subtotal,
    itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

export const getCartItemCount = async () => {
  const sessionId = await getCartSessionId(true);
  if (!sessionId) return 0;
  const cart = await prisma.cart.findFirst({
    where: { sessionId },
    include: { items: true },
  });
  if (!cart) return 0;
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
};
