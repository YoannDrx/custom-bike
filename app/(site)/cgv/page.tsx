import type { Metadata } from "next";

import { business } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "CGV Custom Bike : commandes, paiement, livraison, rétractation, garanties.",
};

export default function CgvPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 text-white/80">
      <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
        Conditions générales de vente
      </h1>
      <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[color:var(--vice-cyan)]">
        Boutique en ligne Custom Bike
      </p>

      <Section title="1 · Objet">
        Les présentes CGV régissent toute commande passée sur la boutique Custom Bike. Le client
        reconnaît en avoir pris connaissance avant validation de son panier.
      </Section>
      <Section title="2 · Prix">
        Les prix sont affichés en euros TTC. Les frais de port sont indiqués au panier avant
        paiement. Retrait atelier gratuit, livraison standard ou express selon option.
      </Section>
      <Section title="3 · Paiement">
        Paiement 100% sécurisé via Stripe (carte bancaire). La commande n&apos;est validée
        qu&apos;après confirmation du paiement.
      </Section>
      <Section title="4 · Livraison">
        Expédition sous 2 à 5 jours ouvrés après validation du paiement vers la France
        métropolitaine, Belgique, Luxembourg, Suisse et Monaco. Un email de suivi est envoyé
        dès l&apos;expédition.
      </Section>
      <Section title="5 · Droit de rétractation">
        Le client dispose de 14 jours à compter de la réception pour se rétracter, sans avoir à
        justifier de motifs. Les frais de retour sont à la charge du client. Les articles
        personnalisés (ex : logos LED sur mesure) ne sont pas éligibles à la rétractation.
      </Section>
      <Section title="6 · Garanties">
        Les produits neufs bénéficient de la garantie légale de conformité (24 mois) et de la
        garantie contre les vices cachés.
      </Section>
      <Section title="7 · SAV">
        Toute réclamation peut être adressée à{" "}
        <a href={business.emailHref} className="text-[color:var(--vice-pink)]">
          {business.email}
        </a>{" "}
        ou au {business.phoneDisplay}.
      </Section>
      <Section title="8 · Droit applicable">
        Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable
        sera recherchée avant toute action judiciaire.
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 space-y-3">
      <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest text-white">
        {title}
      </h2>
      <p>{children}</p>
    </section>
  );
}
