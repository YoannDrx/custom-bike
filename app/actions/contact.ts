"use server";

import { z } from "zod";

import { env } from "@/lib/env";
import { sendEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  firstName: z.string().min(1).max(60),
  lastName: z.string().min(1).max(60),
  email: z.string().email(),
  phone: z.string().min(5).max(30),
  vehicle: z.string().max(120).optional(),
  service: z.string().max(60),
  message: z.string().min(10).max(4000),
  source: z.string().max(60).optional(),
});

export type ContactInput = z.infer<typeof schema>;

export async function submitContact(input: ContactInput) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "Informations incomplètes." };
  }

  const ip = await getClientIp();
  const limit = rateLimit(`contact:${ip}`, 5, 600);
  if (!limit.ok) {
    return {
      ok: false as const,
      error: `Trop de demandes envoyées. Réessaie dans ${Math.ceil(limit.retryAfterSeconds / 60)} min.`,
    };
  }

  const data = parsed.data;
  const name = `${data.firstName} ${data.lastName}`.trim();

  const saved = await prisma.contactMessage.create({
    data: {
      name,
      email: data.email,
      phone: data.phone,
      subject: `${data.service}${data.vehicle ? ` — ${data.vehicle}` : ""}`,
      message: data.message,
      source: data.source ?? "contact-page",
    },
  });

  const adminBody = `
    <p><strong>${name}</strong> — <a href="mailto:${data.email}">${data.email}</a> · <a href="tel:${data.phone}">${data.phone}</a></p>
    <p><strong>Prestation :</strong> ${data.service}</p>
    ${data.vehicle ? `<p><strong>Véhicule :</strong> ${data.vehicle}</p>` : ""}
    <p style="white-space:pre-wrap">${data.message}</p>
    <p style="font-size:12px;color:#6b7280">ID message : ${saved.id}</p>
  `;

  await sendEmail({
    to: env.EMAIL_CONTACT,
    replyTo: data.email,
    subject: `[Contact] ${data.service} — ${name}`,
    html: `<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">${adminBody}</div>`,
  });

  await sendEmail({
    to: data.email,
    subject: "On a bien reçu ta demande — Custom Bike",
    html: `<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111;max-width:520px">
      <p>Salut ${data.firstName},</p>
      <p>On a bien reçu ta demande pour <strong>${data.service}</strong>. Un membre de l'atelier revient vers toi rapidement.</p>
      <p>Pour toute urgence : 01 48 37 66 37 — 17 rue Voltaire, 93100 Montreuil.</p>
      <p>L'équipe Custom Bike</p>
    </div>`,
  });

  return { ok: true as const, id: saved.id };
}
