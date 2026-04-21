import { getRequiredUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";

import { ProfileForm } from "./profile-form";
import { SignOutButton } from "./sign-out-button";

export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const session = await getRequiredUser();
  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return null;
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-widest text-white">
          Profil
        </h2>
        <p className="text-sm text-white/55">
          Mets à jour tes infos ou déconnecte-toi.
        </p>
      </div>
      <ProfileForm
        initial={{
          name: user.name,
          email: user.email,
          phone: user.phone ?? "",
        }}
      />
      <div className="border-t border-white/10 pt-6">
        <SignOutButton />
      </div>
    </div>
  );
}
