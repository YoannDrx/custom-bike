import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paiement annulé",
  description:
    "Ta commande n'a pas été finalisée. Ton panier est conservé, tu peux reprendre quand tu veux.",
  robots: { index: false, follow: false },
};

export default function OrderCancelledPage() {
  return (
    <article className="mx-auto max-w-xl px-6 py-20 text-center text-white/80">
      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)]">
        Paiement interrompu
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-archivo-black)] text-4xl text-white">
        Ta commande n&apos;a pas été finalisée
      </h1>
      <p className="mt-4 text-white/65">
        Pas de panique — rien n&apos;a été débité et ton panier est intact. Tu peux reprendre la
        commande quand tu veux, ou nous écrire si tu as une question.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/panier"
          className="rounded-full bg-[color:var(--vice-pink)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-110"
        >
          Reprendre mon panier
        </Link>
        <Link
          href="/boutique"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-[color:var(--vice-cyan)]"
        >
          Retour boutique
        </Link>
      </div>

      <p className="mt-10 text-sm text-white/50">
        Un souci de paiement ? Écris-nous à{" "}
        <a href="mailto:contact@custombike.fr" className="text-[color:var(--vice-pink)]">
          contact@custombike.fr
        </a>
        , on t&apos;aide.
      </p>
    </article>
  );
}
