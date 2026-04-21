import type { Metadata } from "next";

import { business } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales Custom Bike — éditeur, hébergeur, responsabilité.",
};

export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 text-white/80">
      <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
        Mentions légales
      </h1>
      <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[color:var(--vice-cyan)]">
        Dernière mise à jour : avril 2026
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest text-white">
          Éditeur
        </h2>
        <p>
          Custom Bike — {business.address}. <br />
          Téléphone : {business.phoneDisplay} · Email :{" "}
          <a href={business.emailHref} className="text-[color:var(--vice-pink)]">
            {business.email}
          </a>
        </p>
        <p className="text-sm text-white/55">
          Raison sociale, SIRET, numéro de TVA, directeur de publication : à compléter avec les
          informations officielles du Kbis.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest text-white">
          Hébergement
        </h2>
        <p>
          Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA —{" "}
          <a href="https://vercel.com" className="text-[color:var(--vice-cyan)]">
            vercel.com
          </a>
          .
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest text-white">
          Propriété intellectuelle
        </h2>
        <p>
          L&apos;ensemble du contenu (textes, images, vidéos, code) est la propriété de Custom
          Bike ou de ses partenaires. Toute reproduction sans autorisation est interdite.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest text-white">
          Responsabilité
        </h2>
        <p>
          Les informations affichées sur le site sont indicatives. Custom Bike ne saurait être
          tenu responsable d&apos;éventuelles erreurs ou de l&apos;indisponibilité temporaire du
          service.
        </p>
      </section>
    </article>
  );
}
