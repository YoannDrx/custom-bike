import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)]">
        404
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-archivo-black)] text-5xl text-white">
        Cette page a pris la fuite.
      </h1>
      <p className="mt-4 text-white/60">
        Le lien a peut-être changé. Reviens à l&apos;accueil ou explore la boutique.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-[color:var(--vice-pink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
        >
          Accueil
        </Link>
        <Link
          href="/boutique"
          className="rounded-full border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:border-white/40"
        >
          Boutique
        </Link>
      </div>
    </div>
  );
}
