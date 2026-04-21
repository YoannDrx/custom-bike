"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { upsertRealization } from "@/app/actions/admin-realizations";
import { ImageUploader, type UploadedImage } from "@/components/admin/image-uploader";

type Initial = {
  id?: string;
  title?: string;
  slug?: string | null;
  bike?: string | null;
  category?: string | null;
  summary?: string | null;
  description?: string | null;
  coverImage?: string | null;
  featured?: boolean;
  published?: boolean;
  position?: number;
  images?: UploadedImage[];
};

export function RealizationForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    bike: initial?.bike ?? "",
    category: initial?.category ?? "",
    summary: initial?.summary ?? "",
    description: initial?.description ?? "",
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
    position: initial?.position ?? 0,
  });
  const [images, setImages] = useState<UploadedImage[]>(initial?.images ?? []);

  const submit = () => {
    startTransition(async () => {
      const res = await upsertRealization({
        id: initial?.id,
        title: state.title,
        slug: state.slug || undefined,
        bike: state.bike || null,
        category: state.category || null,
        summary: state.summary || null,
        description: state.description || null,
        coverImage: images[0]?.url ?? null,
        featured: state.featured,
        published: state.published,
        position: state.position,
        images,
      });
      if (res.ok) {
        toast.success("Réalisation enregistrée");
        router.push(`/admin/realisations/${res.id}`);
        router.refresh();
      } else {
        toast.error(res.error ?? "Erreur");
      }
    });
  };

  return (
    <form
      className="admin-page"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Détails
        </h2>
        <div className="admin-form-grid admin-form-grid-2">
          <div className="admin-field">
            <label className="admin-field-label">Titre</label>
            <input
              className="admin-input"
              value={state.title}
              onChange={(e) => setState((s) => ({ ...s, title: e.target.value }))}
              required
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Slug (optionnel)</label>
            <input
              className="admin-input"
              value={state.slug ?? ""}
              onChange={(e) => setState((s) => ({ ...s, slug: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Moto</label>
            <input
              className="admin-input"
              value={state.bike ?? ""}
              placeholder="BMW R1250GS"
              onChange={(e) => setState((s) => ({ ...s, bike: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Catégorie</label>
            <input
              className="admin-input"
              value={state.category ?? ""}
              placeholder="Covering · LED · Crashbar…"
              onChange={(e) => setState((s) => ({ ...s, category: e.target.value }))}
            />
          </div>
          <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-field-label">Résumé</label>
            <input
              className="admin-input"
              value={state.summary ?? ""}
              onChange={(e) => setState((s) => ({ ...s, summary: e.target.value }))}
            />
          </div>
          <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-field-label">Description longue (HTML autorisé)</label>
            <textarea
              className="admin-textarea"
              rows={6}
              value={state.description ?? ""}
              onChange={(e) => setState((s) => ({ ...s, description: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Galerie
        </h2>
        <ImageUploader value={images} onChange={setImages} max={10} />
      </div>

      <div className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Publication
        </h2>
        <div className="admin-form-grid admin-form-grid-2">
          <label
            className="admin-field"
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <input
              type="checkbox"
              checked={state.published}
              onChange={(e) => setState((s) => ({ ...s, published: e.target.checked }))}
            />
            <span className="admin-field-label" style={{ margin: 0 }}>
              Publier
            </span>
          </label>
          <label
            className="admin-field"
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <input
              type="checkbox"
              checked={state.featured}
              onChange={(e) => setState((s) => ({ ...s, featured: e.target.checked }))}
            />
            <span className="admin-field-label" style={{ margin: 0 }}>
              Mettre en avant
            </span>
          </label>
          <div className="admin-field">
            <label className="admin-field-label">Position</label>
            <input
              className="admin-input"
              type="number"
              value={state.position}
              onChange={(e) =>
                setState((s) => ({ ...s, position: parseInt(e.target.value || "0", 10) }))
              }
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button
          type="button"
          className="neo-button neo-button-ghost"
          onClick={() => router.push("/admin/realisations")}
        >
          <span>Annuler</span>
          <span className="neo-button-mark" />
        </button>
        <button
          type="submit"
          className="neo-button neo-button-primary"
          disabled={pending}
        >
          <span>{pending ? "Enregistrement…" : "Enregistrer"}</span>
          <span className="neo-button-mark" />
        </button>
      </div>
    </form>
  );
}
