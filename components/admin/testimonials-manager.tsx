"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteTestimonial, upsertTestimonial } from "@/app/actions/admin-content";

type Testimonial = {
  id: string;
  author: string;
  bike: string | null;
  content: string;
  rating: number;
  published: boolean;
  position: number;
};

export function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({ author: "", bike: "", content: "", rating: 5 });

  const add = () => {
    if (!form.author || !form.content) return;
    startTransition(async () => {
      const res = await upsertTestimonial({
        author: form.author,
        bike: form.bike || null,
        content: form.content,
        rating: form.rating,
        position: testimonials.length,
        published: true,
      });
      if (res.ok) {
        toast.success("Témoignage ajouté");
        setForm({ author: "", bike: "", content: "", rating: 5 });
        router.refresh();
      }
    });
  };

  const togglePublish = (t: Testimonial) => {
    startTransition(async () => {
      await upsertTestimonial({
        id: t.id,
        author: t.author,
        bike: t.bike,
        content: t.content,
        rating: t.rating,
        position: t.position,
        published: !t.published,
      });
      router.refresh();
    });
  };

  const remove = (id: string) => {
    if (!confirm("Supprimer ?")) return;
    startTransition(async () => {
      await deleteTestimonial(id);
      router.refresh();
    });
  };

  return (
    <section className="admin-card">
      <h2 className="admin-h2" style={{ marginBottom: 16 }}>
        Témoignages
      </h2>
      <div className="admin-form-grid admin-form-grid-2" style={{ marginBottom: 20 }}>
        <div className="admin-field">
          <label className="admin-field-label">Auteur</label>
          <input
            className="admin-input"
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
          />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Moto</label>
          <input
            className="admin-input"
            value={form.bike}
            onChange={(e) => setForm((f) => ({ ...f, bike: e.target.value }))}
          />
        </div>
        <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
          <label className="admin-field-label">Contenu</label>
          <textarea
            className="admin-textarea"
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Note (1-5)</label>
          <input
            className="admin-input"
            type="number"
            min={1}
            max={5}
            value={form.rating}
            onChange={(e) =>
              setForm((f) => ({ ...f, rating: parseInt(e.target.value || "5", 10) }))
            }
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button
            type="button"
            className="neo-button neo-button-primary"
            onClick={add}
            disabled={pending}
          >
            <span>Ajouter</span>
            <span className="neo-button-mark" />
          </button>
        </div>
      </div>

      <ul className="admin-list">
        {testimonials.map((t) => (
          <li key={t.id} className="admin-list-row">
            <div>
              <p className="admin-list-main">
                {"★".repeat(t.rating)} — {t.author}
                {t.bike ? ` · ${t.bike}` : ""}
              </p>
              <p className="admin-list-sub">{t.content}</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className="admin-link"
                style={{ background: "transparent", border: "none" }}
                disabled={pending}
                onClick={() => togglePublish(t)}
              >
                {t.published ? "Dépublier" : "Publier"}
              </button>
              <button
                type="button"
                className="admin-link"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--vice-pink)",
                }}
                disabled={pending}
                onClick={() => remove(t.id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
