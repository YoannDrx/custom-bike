"use client";

import { FormEvent, startTransition, useState } from "react";
import { motion } from "motion/react";
import { business } from "@/lib/site-content";

const serviceOptions = [
  {
    label: "Revision / entretien",
    detail: "Forfait atelier, controle general et suivi mecanique lisible.",
  },
  {
    label: "Reparation / diagnostic",
    detail: "Panne, remise en etat ou besoin de lecture technique claire.",
  },
  {
    label: "LED / custom",
    detail: "Logos LED, feux additionnels, signature visuelle, sellerie ou covering.",
  },
  {
    label: "Accessoires / electronique",
    detail: "CarPlay, Quad Lock, instrumentation, dashcam et accessoires utiles.",
  },
  {
    label: "Vente / location",
    detail: "Disponibilite, besoin de mobilite ou vehicule relais atelier.",
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
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines = [
      `Nom: ${form.lastName}`,
      `Prenom: ${form.firstName}`,
      `Telephone: ${form.phone}`,
      `E-mail: ${form.email}`,
      `Vehicule: ${form.vehicle || "Non precise"}`,
      `Service: ${form.service}`,
      "",
      form.message,
    ];

    const params = new URLSearchParams({
      subject: `Demande site Custom Bike - ${form.service}`,
      body: lines.join("\n"),
    });

    startTransition(() => setStatus("ready"));
    window.location.href = `${business.emailHref}?${params.toString()}`;
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="contact-form-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="contact-field">
              <span>Prenom</span>
              <input
                value={form.firstName}
                onChange={(event) =>
                  setForm((current) => ({ ...current, firstName: event.target.value }))
                }
                placeholder="Nadia"
                required
              />
            </label>

            <label className="contact-field">
              <span>Nom</span>
              <input
                value={form.lastName}
                onChange={(event) =>
                  setForm((current) => ({ ...current, lastName: event.target.value }))
                }
                placeholder="Bensaid"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="contact-field">
              <span>Telephone</span>
              <input
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="06 00 00 00 00"
                required
              />
            </label>

            <label className="contact-field">
              <span>E-mail</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="vous@email.com"
                required
              />
            </label>
          </div>

          <label className="contact-field">
            <span>Vehicule</span>
            <input
              value={form.vehicle}
              onChange={(event) =>
                setForm((current) => ({ ...current, vehicle: event.target.value }))
              }
              placeholder="BMW RT 1250, Honda Integra, Tmax..."
            />
          </label>

          <label className="contact-field">
            <span>Message</span>
            <textarea
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              placeholder="Le besoin, l'etat du vehicule, la contrainte de temps et ce que vous voulez changer."
              rows={7}
              required
            />
          </label>
        </div>

        <div className="grid gap-4">
          <div className="neo-panel neo-panel-dark p-5 md:p-6">
            <p className="neo-kicker text-white/62">Selection rapide</p>
            <p className="display-font mt-3 text-[2rem] leading-[0.92] md:text-[2.6rem]">
              Le bon sujet
              <span className="block text-white/60">des le premier message.</span>
            </p>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Le formulaire reste simple, mais la demande doit etre bien cadree pour accelerer la
              reponse atelier.
            </p>

            <div className="mt-5 grid gap-3">
              {serviceOptions.map((option, index) => {
                const active = form.service === option.label;

                return (
                  <motion.button
                    key={option.label}
                    type="button"
                    aria-pressed={active}
                    className={`service-option ${active ? "service-option-active" : ""}`}
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        service: option.label,
                      }))
                    }
                    whileHover={{ y: -4, x: index % 2 === 0 ? 2 : -2 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    <span className="service-option-title">{option.label}</span>
                    <span className="service-option-copy">{option.detail}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="neo-panel p-5 md:p-6">
            <p className="neo-kicker text-[var(--ink-faint)]">Resume</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="neo-chip neo-chip-soft">{form.service}</div>
              <div className="neo-chip">{form.vehicle || "Vehicule a preciser"}</div>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
              L&apos;envoi ouvre votre application e-mail avec un message deja structure pour
              l&apos;atelier.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="neo-button neo-button-primary cursor-pointer">
                <span>Preparer l&apos;e-mail</span>
                <span className="neo-button-mark" />
              </button>

              <a href={business.emailHref} className="contact-inline-link">
                {business.email}
              </a>
            </div>

            {status === "ready" ? (
              <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                Le brouillon est pret a partir dans votre application e-mail.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </motion.form>
  );
}
