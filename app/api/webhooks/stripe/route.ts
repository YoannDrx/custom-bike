import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

import { env } from "@/lib/env";
import { sendEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { requireStripe } from "@/lib/stripe";
import { randomOrderNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const stripe = requireStripe();
  const sig = req.headers.get("stripe-signature");
  const secret = env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("[stripe-webhook] signature error", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
    } else if (event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId =
        typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
      if (paymentIntentId) {
        await prisma.order.updateMany({
          where: { stripePaymentIntentId: paymentIntentId },
          data: { status: "REFUNDED", paymentStatus: "REFUNDED" },
        });
      }
    }
  } catch (err) {
    console.error("[stripe-webhook] handler error", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const existing = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
  });
  if (existing) return;

  const cartId = session.metadata?.cartId;
  const userId = session.metadata?.userId || null;
  const shippingMethod =
    (session.metadata?.shippingMethod as "PICKUP" | "STANDARD" | "EXPRESS") ?? "PICKUP";

  const cart = cartId
    ? await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
          items: {
            include: { product: { include: { images: { orderBy: { position: "asc" }, take: 1 } } }, variant: true },
          },
        },
      })
    : null;

  const customer = session.customer_details;
  const shippingAddress = customer?.address
    ? await prisma.address.create({
        data: {
          userId: userId ?? undefined,
          firstName: (customer.name ?? "").split(" ")[0] ?? "",
          lastName: (customer.name ?? "").split(" ").slice(1).join(" "),
          line1: customer.address.line1 ?? "",
          line2: customer.address.line2 ?? undefined,
          postalCode: customer.address.postal_code ?? "",
          city: customer.address.city ?? "",
          country: customer.address.country ?? "FR",
          phone: customer.phone ?? undefined,
        },
      })
    : null;

  const subtotal = cart
    ? cart.items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0)
    : session.amount_subtotal ?? 0;
  const shipping =
    shippingMethod === "STANDARD" ? 890 : shippingMethod === "EXPRESS" ? 1490 : 0;
  const total = session.amount_total ?? subtotal + shipping;

  const order = await prisma.order.create({
    data: {
      number: randomOrderNumber(),
      userId: userId ?? undefined,
      email: session.customer_details?.email ?? "",
      phone: session.customer_details?.phone ?? undefined,
      status: "PAID",
      paymentStatus: "PAID",
      subtotalCents: subtotal,
      shippingCents: shipping,
      taxCents: 0,
      totalCents: total,
      currency: (session.currency ?? "eur").toLowerCase(),
      shippingMethod,
      stripeSessionId: session.id,
      stripePaymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id,
      shippingAddressId: shippingAddress?.id,
      paidAt: new Date(),
      items: {
        create:
          cart?.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            name: item.variant
              ? `${item.product.name} — ${item.variant.name}`
              : item.product.name,
            image: item.product.images[0]?.url,
            quantity: item.quantity,
            priceCents: item.priceCents,
            totalCents: item.priceCents * item.quantity,
          })) ?? [],
      },
    },
    include: { items: true },
  });

  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    for (const item of cart.items) {
      const data: { stock?: { decrement: number } } = {};
      if (item.product.trackStock) {
        data.stock = { decrement: item.quantity };
      }
      if (Object.keys(data).length > 0) {
        await prisma.product.update({ where: { id: item.productId }, data });
      }
    }
  }

  await sendEmail({
    to: env.EMAIL_CONTACT,
    subject: `[Commande payée] ${order.number} — ${session.customer_details?.email ?? ""}`,
    html: `<div style="font-family:system-ui,sans-serif;line-height:1.6"><h2>Nouvelle commande</h2><p><strong>${order.number}</strong> — ${(total / 100).toFixed(2)} €</p><p>Client : ${session.customer_details?.email} · ${session.customer_details?.phone ?? ""}</p><p>Livraison : ${shippingMethod}</p><ul>${order.items.map((i) => `<li>${i.quantity} × ${i.name} — ${(i.totalCents / 100).toFixed(2)} €</li>`).join("")}</ul></div>`,
  });

  if (session.customer_details?.email) {
    await sendEmail({
      to: session.customer_details.email,
      subject: `Commande confirmée — ${order.number}`,
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.6;max-width:560px"><h2>Merci pour ta commande !</h2><p>Numéro : <strong>${order.number}</strong></p><p>Total : <strong>${(total / 100).toFixed(2)} €</strong></p><p>On te tient au courant dès que ta commande est expédiée ou prête à être récupérée à l'atelier.</p><p>— L'équipe Custom Bike</p></div>`,
    });
  }
}
