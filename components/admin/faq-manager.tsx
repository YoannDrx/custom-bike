"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteFaq, upsertFaq } from "@/app/actions/admin-content";

type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  position: number;
  published: boolean;
};

export function FaqManager({ faqs }: { faqs: Faq[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({ question: "", answer: "", category: "" });

  const add = () => {
    if (!form.question || !form.answer) return;
    startTransition(async () => {
      const res = await upsertFaq({
        question: form.question,
        answer: form.answer,
        category: form.category || null,
        position: faqs.length,
        published: true,
      });
      if (res.ok) {
        toast.success("FAQ ajoutée");
        setForm({ question: "", answer: "", category: "" });
        router.refresh();
      }
    });
  };

  const remove = (id: string) => {
    if (!confirm("Supprimer ?")) return;
    startTransition(async () => {
      await deleteFaq(id);
      router.refresh();
    });
  };

  return (
    <section className="admin-card">
      <h2 className="admin-h2" style={{ marginBottom: 16 }}>
        FAQ
      </h2>
      <div className="admin-form-grid" style={{ marginBottom: 20 }}>
        <div className="admin-field">
          <label className="admin-field-label">Question</label>
          <input
            className="admin-input"
            value={form.question}
            onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
          />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Réponse</label>
          <textarea
            className="admin-textarea"
            value={form.answer}
            onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
          />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Catégorie (optionnel)</label>
          <input
            className="admin-input"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          />
        </div>
        <div>
          <button
            type="button"
            className="neo-button neo-button-primary"
            disabled={pending}
            onClick={add}
          >
            <span>Ajouter</span>
            <span className="neo-button-mark" />
          </button>
        </div>
      </div>

      <ul className="admin-list">
        {faqs.map((faq) => (
          <li key={faq.id} className="admin-list-row">
            <div>
              <p className="admin-list-main">{faq.question}</p>
              <p className="admin-list-sub">{faq.answer}</p>
            </div>
            <button
              type="button"
              className="admin-link"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--vice-pink)",
              }}
              disabled={pending}
              onClick={() => remove(faq.id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
