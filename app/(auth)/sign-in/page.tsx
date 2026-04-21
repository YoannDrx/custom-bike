import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)]">
          Accès atelier
        </div>
        <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
          Connecte-toi
        </h1>
        <p className="text-sm text-white/60">
          Suis tes commandes, tes messages et les actus atelier depuis ton compte.
        </p>
      </div>
      <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-white/5" />}>
        <SignInForm />
      </Suspense>
      <div className="text-sm text-white/55">
        Nouveau ici ?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-[color:var(--vice-pink)] hover:text-[color:var(--vice-cyan)]"
        >
          Crée un compte
        </Link>
      </div>
    </div>
  );
}
