import type { Metadata } from "next";
import Link from "next/link";

import { ForgetPasswordForm } from "./forget-password-form";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
};

export default function ForgetPasswordPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)]">
          Récupération
        </div>
        <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
          Mot de passe oublié ?
        </h1>
        <p className="text-sm text-white/60">
          Entre ton email, on t&apos;envoie un lien de réinitialisation.
        </p>
      </div>
      <ForgetPasswordForm />
      <Link
        href="/sign-in"
        className="text-sm text-white/60 hover:text-[color:var(--vice-cyan)]"
      >
        ← Retour à la connexion
      </Link>
    </div>
  );
}
