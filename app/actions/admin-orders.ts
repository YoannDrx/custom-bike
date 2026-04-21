"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getRequiredAdmin } from "@/lib/auth-user";
import { sendEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  id: z.string(),
  status: z
    .enum(["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"])
    .optional(),
  trackingNumber: z.string().max(120).optional().nullable(),
  trackingUrl: z.string().url().optional().nullable().or(z.literal("")),
  notes: z.string().max(600).optional().nullable(),
  notifyCustomer: z.coerce.boolean().default(false),
});

export async function updateOrder(input: z.infer<typeof updateSchema>) {
  await getRequiredAdmin();
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Données invalides" };
  const data = parsed.data;

  const now = new Date();
  const transitions: Record<string, Partial<{ shippedAt: Date; deliveredAt: Date; cancelledAt: Date }>> = {
    SHIPPED: { shippedAt: now },
    DELIVERED: { deliveredAt: now },
    CANCELLED: { cancelledAt: now },
  };

  const updated = await prisma.order.update({
    where: { id: data.id },
    data: {
      ...(data.status ? { status: data.status } : {}),
      ...(data.trackingNumber !== undefined ? { trackingNumber: data.trackingNumber || null } : {}),
      ...(data.trackingUrl !== undefined
        ? { trackingUrl: data.trackingUrl ? data.trackingUrl : null }
        : {}),
      ...(data.notes !== undefined ? { notes: data.notes || null } : {}),
      ...(data.status ? transitions[data.status] ?? {} : {}),
    },
  });

  if (data.notifyCustomer && updated.email) {
    const subject = `Commande ${updated.number} — ${updated.status}`;
    await sendEmail({
      to: updated.email,
      subject,
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.6;max-width:560px"><h2>${subject}</h2><p>Ta commande <strong>${updated.number}</strong> vient d'être mise à jour.</p>${updated.trackingNumber ? `<p>Numéro de suivi : <strong>${updated.trackingNumber}</strong>${updated.trackingUrl ? ` — <a href="${updated.trackingUrl}">suivre</a>` : ""}</p>` : ""}${updated.notes ? `<p>${updated.notes}</p>` : ""}<p>— L&apos;équipe Custom Bike</p></div>`,
    });
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${data.id}`);
  revalidatePath("/compte/commandes");
  return { ok: true as const };
}
