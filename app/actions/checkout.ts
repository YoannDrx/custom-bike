"use server";

import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth-user";
import { getOrCreateCart } from "@/lib/cart";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { requireStripe } from "@/lib/stripe";

type CheckoutInput = {
  email?: string;
  shippingMethod?: "PICKUP" | "STANDARD" | "EXPRESS";
};

export async function startCheckout(input: CheckoutInput = {}) {
  const stripe = requireStripe();
  const user = await getUser();
  const cart = await getOrCreateCart(user?.id);

  if (cart.items.length === 0) {
    return { ok: false as const, error: "Ton panier est vide." };
  }

  const shippingMethod = input.shippingMethod ?? "PICKUP";
  const shippingCents =
    shippingMethod === "STANDARD" ? 890 : shippingMethod === "EXPRESS" ? 1490 : 0;

  const lineItems = cart.items.map((item) => {
    const name = item.variant
      ? `${item.product.name} — ${item.variant.name}`
      : item.product.name;
    return {
      price_data: {
        currency: "eur" as const,
        unit_amount: item.priceCents,
        product_data: {
          name,
          images: item.product.images[0]?.url
            ? [item.product.images[0].url]
            : undefined,
        },
      },
      quantity: item.quantity,
    };
  });

  if (shippingCents > 0) {
    lineItems.push({
      price_data: {
        currency: "eur" as const,
        unit_amount: shippingCents,
        product_data: {
          name: `Livraison ${shippingMethod === "EXPRESS" ? "express" : "standard"}`,
          images: undefined,
        },
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    customer_email: input.email ?? user?.email ?? undefined,
    success_url: `${env.NEXT_PUBLIC_APP_URL}/commande/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/commande/annulee`,
    shipping_address_collection:
      shippingMethod === "PICKUP"
        ? undefined
        : { allowed_countries: ["FR", "BE", "LU", "CH", "MC"] },
    billing_address_collection: "auto",
    phone_number_collection: { enabled: true },
    metadata: {
      cartId: cart.id,
      userId: user?.id ?? "",
      shippingMethod,
    },
    automatic_tax: { enabled: false },
  });

  if (!session.url) {
    return { ok: false as const, error: "Stripe indisponible." };
  }

  redirect(session.url);
}
