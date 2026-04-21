"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteCategory, upsertCategory } from "@/app/actions/admin-products";

type Cat = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  position: number;
  productCount: number;
};

export function CategoryManager({ categories }: { categories: Cat[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  const add = () => {
    if (!form.name) return;
    startTransition(async () => {
      const res = await upsertCategory({
        name: form.name,
        slug: form.slug || undefined,
        description: form.description || null,
        position: categories.length,
      });
      if (res.ok) {
        toast.success("Catégorie créée");
        setForm({ name: "", slug: "", description: "" });
        router.refresh();
      } else {
        toast.error(res.error ?? "Erreur");
      }
    });
  };

  const remove = (id: string) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    startTransition(async () => {
      const res = await deleteCategory(id);
      if (res.ok) {
        toast.success("Supprimée");
        router.refresh();
      }
    });
  };

  return (
    <div className="admin-grid admin-grid-2">
      <article className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Nouvelle catégorie
        </h2>
        <div className="admin-form-grid">
          <div className="admin-field">
            <label className="admin-field-label">Nom</label>
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Slug (optionnel)</label>
            <input
              className="admin-input"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Description</label>
            <textarea
              className="admin-textarea"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <button
            type="button"
            className="neo-button neo-button-primary"
            disabled={pending || !form.name}
            onClick={add}
          >
            <span>Ajouter</span>
            <span className="neo-button-mark" />
          </button>
        </div>
      </article>

      <article className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Existantes
        </h2>
        {categories.length === 0 ? (
          <p className="admin-empty">Aucune catégorie.</p>
        ) : (
          <ul className="admin-list">
            {categories.map((c) => (
              <li key={c.id} className="admin-list-row">
                <div>
                  <p className="admin-list-main">{c.name}</p>
                  <p className="admin-list-sub">
                    /{c.slug} · {c.productCount} produit{c.productCount > 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-link"
                  style={{ color: "var(--vice-pink)", background: "transparent", border: "none" }}
                  disabled={pending}
                  onClick={() => remove(c.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}
