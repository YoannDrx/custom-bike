"use client";

import { FormEvent, useState, useTransition } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { submitContact } from "@/app/actions/contact";
import { business } from "@/lib/site-content";

const serviceOptions = [
  {
    label: "Révision / entretien",
    detail: "Forfait atelier, contrôle général et suivi mécanique.",
  },
  {
    label: "Réparation / diagnostic",
    detail: "Panne, remise en état ou lecture technique claire.",
  },
  {
    label: "LED / custom",
    detail: "Logos LED, feux additionnels, sellerie ou covering.",
  },
  {
    label: "Accessoires / électronique",
    detail: "CarPlay, Quad Lock, instrumentation, dashcam.",
  },
  {
    label: "Vente / location",
    detail: "Disponibilité, mobilité ou véhicule relais atelier.",
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  vehicle: "",
  service: serviceOptions[0].label,
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await submitContact({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        vehicle: form.vehicle || undefined,
        service: form.service,
        message: form.message,
        source: "contact-page",
      });

      if (!result.ok) {
        toast.error(result.error ?? "Envoi impossible.");
        return;
      }

      toast.success("Message envoyé. On te recontacte vite.");
      setStatus("sent");
      setForm(initialState);
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="contact-form-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Choix de prestation */}
      <div className="cf-section">
        <p className="cf-section-label">Prestation</p>
        <div className="cf-service-grid">
          {serviceOptions.map((option) => {
            const active = form.service === option.label;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={active}
                className={`cf-service-btn ${active ? "cf-service-btn-active" : ""}`}
                onClick={() => setForm((c) => ({ ...c, service: option.label }))}
              >
                <span className="cf-service-dot" />
                <span className="cf-service-label">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Identité */}
      <div className="cf-section">
        <p className="cf-section-label">Vos coordonnées</p>
        <div className="cf-row">
          <label className="cf-field">
            <span className="cf-label">Prénom</span>
            <input
              className="cf-input"
              value={form.firstName}
              onChange={(e) => setForm((c) => ({ ...c, firstName: e.target.value }))}
              placeholder="Jean"
              required
            />
          </label>
          <label className="cf-field">
            <span className="cf-label">Nom</span>
            <input
              className="cf-input"
              value={form.lastName}
              onChange={(e) => setForm((c) => ({ ...c, lastName: e.target.value }))}
              placeholder="Dupont"
              required
            />
          </label>
        </div>
        <div className="cf-row">
          <label className="cf-field">
            <span className="cf-label">Téléphone</span>
            <input
              className="cf-input"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((c) => ({ ...c, phone: e.target.value }))}
              placeholder="06 12 34 56 78"
              required
            />
          </label>
          <label className="cf-field">
            <span className="cf-label">E-mail</span>
            <input
              className="cf-input"
              type="email"
              value={form.email}
              onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))}
              placeholder="vous@email.com"
              required
            />
          </label>
        </div>
      </div>

      {/* Véhicule + message */}
      <div className="cf-section">
        <p className="cf-section-label">Votre machine &amp; demande</p>
        <label className="cf-field">
          <span className="cf-label">Véhicule</span>
          <input
            className="cf-input"
            value={form.vehicle}
            onChange={(e) => setForm((c) => ({ ...c, vehicle: e.target.value }))}
            placeholder="Marque, modèle, année…"
          />
        </label>
        <label className="cf-field">
          <span className="cf-label">Message</span>
          <textarea
            className="cf-input cf-textarea"
            value={form.message}
            onChange={(e) => setForm((c) => ({ ...c, message: e.target.value }))}
            placeholder="Décrivez le besoin, l'état du véhicule, vos contraintes…"
            rows={5}
            required
          />
        </label>
      </div>

      {/* Résumé + envoi */}
      <div className="cf-footer">
        <div className="cf-summary">
          <span className="cf-summary-tag">{form.service}</span>
          {form.vehicle && <span className="cf-summary-tag">{form.vehicle}</span>}
        </div>

        <div className="cf-actions">
          <button
            type="submit"
            disabled={pending}
            className="neo-button neo-button-primary cursor-pointer disabled:opacity-60"
          >
            <span>{pending ? "Envoi…" : "Envoyer ma demande"}</span>
            <span className="neo-button-mark" />
          </button>
          <a href={business.emailHref} className="cf-email-link">
            {business.email}
          </a>
        </div>

        {status === "sent" && (
          <p className="cf-confirm">
            Message reçu. On te recontacte par email ou téléphone sous 24h.
          </p>
        )}
      </div>
    </motion.form>
  );
}
