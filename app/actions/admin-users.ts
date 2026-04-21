"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getRequiredAdmin } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  userId: z.string(),
  role: z.enum(["user", "admin"]).optional(),
  banned: z.coerce.boolean().optional(),
  banReason: z.string().max(280).optional().nullable(),
});

export async function updateUser(input: z.infer<typeof schema>) {
  const admin = await getRequiredAdmin();
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Données invalides" };
  const data = parsed.data;

  if (data.userId === admin.id && data.role && data.role !== "admin") {
    return { ok: false as const, error: "Tu ne peux pas retirer ton propre rôle admin" };
  }

  await prisma.user.update({
    where: { id: data.userId },
    data: {
      ...(data.role !== undefined ? { role: data.role } : {}),
      ...(data.banned !== undefined ? { banned: data.banned } : {}),
      ...(data.banReason !== undefined ? { banReason: data.banReason || null } : {}),
    },
  });

  revalidatePath("/admin/customers");
  return { ok: true as const };
}
