import type { Metadata } from "next";

import { business } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Custom Bike collecte, utilise et protège tes données personnelles. Droits RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 text-white/80">
      <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
        Politique de confidentialité
      </h1>
      <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[color:var(--vice-cyan)]">
        RGPD & traitement de tes données
      </p>

      <Section title="Données collectées">
        Nom, email, téléphone, adresse de livraison, historique de commandes. Ces données sont
        nécessaires pour traiter tes commandes et te recontacter.
      </Section>
      <Section title="Finalités">
        Gestion des commandes, envoi d&apos;emails transactionnels (via Resend), suivi atelier,
        obligations comptables et légales.
      </Section>
      <Section title="Paiement">
        Les informations bancaires sont traitées directement par Stripe. Custom Bike ne stocke
        aucune donnée de carte.
      </Section>
      <Section title="Durée de conservation">
        Les données commerciales sont conservées 5 ans à partir de la dernière commande. Les
        comptes utilisateurs inactifs plus de 3 ans sont supprimés.
      </Section>
      <Section title="Tes droits">
        Accès, rectification, suppression, portabilité, opposition : écris à{" "}
        <a href={business.emailHref} className="text-[color:var(--vice-pink)]">
          {business.email}
        </a>
        . Réponse sous 30 jours.
      </Section>
      <Section title="Cookies">
        Cookies techniques uniquement (session, panier). Pas de tracking publicitaire par défaut.
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
