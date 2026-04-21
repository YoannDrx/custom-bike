"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getRequiredAdmin } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  id: z.string(),
  status: z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]),
});

export async function updateMessageStatus(input: z.infer<typeof schema>) {
  await getRequiredAdmin();
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Données invalides" };
  await prisma.contactMessage.update({
    where: { id: parsed.data.id },
    data: {
      status: parsed.data.status,
      readAt: parsed.data.status !== "NEW" ? new Date() : null,
    },
  });
  revalidatePath("/admin/messages");
  return { ok: true as const };
}

export async function deleteMessage(id: string) {
  await getRequiredAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  return { ok: true as const };
}
