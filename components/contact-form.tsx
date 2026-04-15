"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { business } from "@/lib/site-content";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  service: "Révision / entretien",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines = [
      `Nom: ${form.lastName}`,
      `Prénom: ${form.firstName}`,
      `Téléphone: ${form.phone}`,
      `E-mail: ${form.email}`,
      `Service: ${form.service}`,
      "",
      form.message,
    ];

    const params = new URLSearchParams({
      subject: `Demande site Custom Bike - ${form.service}`,
      body: lines.join("\n"),
    });

    window.location.href = `${business.emailHref}?${params.toString()}`;
    setStatus("ready");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="contact-form-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.7 }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="contact-field">
          <span>Prénom</span>
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
            placeholder="Bensaïd"
            required
          />
        </label>

        <label className="contact-field">
          <span>Téléphone</span>
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

      <label className="contact-field mt-4">
        <span>Service souhaité</span>
        <select
          value={form.service}
          onChange={(event) =>
            setForm((current) => ({ ...current, service: event.target.value }))
          }
        >
          <option>Révision / entretien</option>
          <option>Réparation / diagnostic</option>
          <option>LED / logos / feux additionnels</option>
          <option>Accessoires / CarPlay / Quad Lock</option>
          <option>Covering / sellerie</option>
          <option>Assurance / remise en état</option>
          <option>Vente / location</option>
        </select>
      </label>

      <label className="contact-field mt-4">
        <span>Message</span>
        <textarea
          value={form.message}
          onChange={(event) =>
            setForm((current) => ({ ...current, message: event.target.value }))
          }
          placeholder="Décrivez votre besoin, votre véhicule et le délai souhaité."
          rows={6}
          required
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-7 text-black/52">
          Le formulaire prépare un e-mail complet vers l&apos;atelier pour garder une prise de
          contact simple et immédiate.
        </p>

        <button type="submit" className="button-premium button-premium-dark cursor-pointer">
          <span>Envoyer la demande</span>
          <span className="button-premium-mark" />
        </button>
      </div>

      {status === "ready" ? (
        <p className="mt-4 text-sm leading-7 text-[#111111]">
          Votre message est prêt à partir dans votre application e-mail.
        </p>
      ) : null}
    </motion.form>
  );
}
