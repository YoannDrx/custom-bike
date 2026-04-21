"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getRequiredUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2).max(60),
  phone: z.string().max(30).optional(),
});

export async function updateProfile(input: z.infer<typeof schema>) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Données invalides" };
  const user = await getRequiredUser();
  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone || null,
    },
  });
  revalidatePath("/compte/profil");
  return { ok: true as const };
}
