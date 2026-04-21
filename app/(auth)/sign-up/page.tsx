import type { Metadata } from "next";
import Link from "next/link";

import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = {
  title: "Créer un compte",
};

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)]">
          Bienvenue
        </div>
        <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
          Crée ton compte
        </h1>
        <p className="text-sm text-white/60">
          Suivi de commandes, factures, adresses et messages atelier — tout depuis ton espace.
        </p>
      </div>
      <SignUpForm />
      <div className="text-sm text-white/55">
        Déjà inscrit ?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-[color:var(--vice-pink)] hover:text-[color:var(--vice-cyan)]"
        >
          Connecte-toi
        </Link>
      </div>
    </div>
  );
}
