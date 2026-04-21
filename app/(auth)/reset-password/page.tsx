import type { Metadata } from "next";

import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = {
  title: "Nouveau mot de passe",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="space-y-4">
        <h1 className="font-[family-name:var(--font-archivo-black)] text-3xl text-white">
          Lien invalide
        </h1>
        <p className="text-sm text-white/60">
          Ce lien a expiré ou n&apos;est plus valide. Redemande un nouveau lien depuis la page de connexion.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)]">
          Nouveau mot de passe
        </div>
        <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
          Réinitialise
        </h1>
        <p className="text-sm text-white/60">
          Choisis un nouveau mot de passe pour ton compte.
        </p>
      </div>
      <ResetPasswordForm token={token} />
    </div>
  );
}
