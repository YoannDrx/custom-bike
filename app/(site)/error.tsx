"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[site]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-pink)]">
        Erreur
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-archivo-black)] text-4xl text-white">
        On est tombé sur un pépin.
      </h1>
      <p className="mt-4 text-white/60">
        Réessaie ou reviens à l&apos;accueil — on a déjà été alerté de l&apos;incident.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[color:var(--vice-pink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-full border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:border-white/40"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
