"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { upsertProduct, type ProductFormInput } from "@/app/actions/admin-products";
import { ImageUploader, type UploadedImage } from "@/components/admin/image-uploader";

type Variant = {
  id?: string;
  name: string;
  sku?: string | null;
  priceCents?: number | null;
  stock: number;
};

export function ProductForm({
  categories,
  initial,
}: {
  categories: Array<{ id: string; name: string }>;
  initial?: Partial<ProductFormInput> & { id?: string };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    tagline: initial?.tagline ?? "",
    description: initial?.description ?? "",
    priceEuros: initial?.priceCents != null ? (initial.priceCents / 100).toString() : "",
    compareAtEuros:
      initial?.compareAtCents != null ? (initial.compareAtCents / 100).toString() : "",
    stock: (initial?.stock ?? 0).toString(),
    trackStock: initial?.trackStock ?? true,
    weightGrams: initial?.weightGrams != null ? String(initial.weightGrams) : "",
    status: (initial?.status ?? "DRAFT") as "DRAFT" | "ACTIVE" | "ARCHIVED",
    featured: initial?.featured ?? false,
    categoryId: initial?.categoryId ?? "",
    metaTitle: initial?.metaTitle ?? "",
    metaDescription: initial?.metaDescription ?? "",
    syncStripe: false,
  });
  const [images, setImages] = useState<UploadedImage[]>(
    (initial?.images as UploadedImage[]) ?? [],
  );
  const [variants, setVariants] = useState<Variant[]>(
    (initial?.variants as Variant[]) ?? [],
  );

  const submit = () => {
    startTransition(async () => {
      const priceCents = Math.round(parseFloat(state.priceEuros || "0") * 100);
      const compareAtCents = state.compareAtEuros
        ? Math.round(parseFloat(state.compareAtEuros) * 100)
        : null;
      const res = await upsertProduct({
        id: initial?.id,
        name: state.name,
        slug: state.slug,
        tagline: state.tagline || null,
        description: state.description,
        priceCents,
        compareAtCents,
        stock: parseInt(state.stock || "0", 10),
        trackStock: state.trackStock,
        weightGrams: state.weightGrams ? parseInt(state.weightGrams, 10) : null,
        status: state.status,
        featured: state.featured,
        categoryId: state.categoryId || null,
        metaTitle: state.metaTitle || null,
        metaDescription: state.metaDescription || null,
        images,
        variants: variants.map((v) => ({
          id: v.id,
          name: v.name,
          sku: v.sku,
          priceCents: v.priceCents,
          stock: v.stock,
        })),
        syncStripe: state.syncStripe,
      });
      if (res.ok) {
        toast.success("Produit enregistré");
        router.push(`/admin/products/${res.id}`);
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
          Informations
        </h2>
        <div className="admin-form-grid admin-form-grid-2">
          <div className="admin-field">
            <label className="admin-field-label">Nom</label>
            <input
              className="admin-input"
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
              required
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Slug (optionnel)</label>
            <input
              className="admin-input"
              value={state.slug}
              placeholder="auto-généré si vide"
              onChange={(e) => setState((s) => ({ ...s, slug: e.target.value }))}
            />
          </div>
          <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-field-label">Accroche</label>
            <input
              className="admin-input"
              value={state.tagline ?? ""}
              onChange={(e) => setState((s) => ({ ...s, tagline: e.target.value }))}
            />
          </div>
          <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-field-label">Description (HTML autorisé)</label>
            <textarea
              className="admin-textarea"
              value={state.description}
              onChange={(e) => setState((s) => ({ ...s, description: e.target.value }))}
              rows={8}
              required
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Images
        </h2>
        <ImageUploader value={images} onChange={setImages} max={8} label="Galerie produit" />
      </div>

      <div className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Prix et stock
        </h2>
        <div className="admin-form-grid admin-form-grid-2">
          <div className="admin-field">
            <label className="admin-field-label">Prix (€)</label>
            <input
              className="admin-input"
              type="number"
              step="0.01"
              value={state.priceEuros}
              onChange={(e) => setState((s) => ({ ...s, priceEuros: e.target.value }))}
              required
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Prix barré (€)</label>
            <input
              className="admin-input"
              type="number"
              step="0.01"
              value={state.compareAtEuros}
              onChange={(e) =>
                setState((s) => ({ ...s, compareAtEuros: e.target.value }))
              }
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Stock</label>
            <input
              className="admin-input"
              type="number"
              value={state.stock}
              onChange={(e) => setState((s) => ({ ...s, stock: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Poids (g) — livraison</label>
            <input
              className="admin-input"
              type="number"
              value={state.weightGrams}
              onChange={(e) => setState((s) => ({ ...s, weightGrams: e.target.value }))}
            />
          </div>
          <label className="admin-field" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <input
              type="checkbox"
              checked={state.trackStock}
              onChange={(e) => setState((s) => ({ ...s, trackStock: e.target.checked }))}
            />
            <span className="admin-field-label" style={{ margin: 0 }}>
              Suivre le stock
            </span>
          </label>
          <label className="admin-field" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <input
              type="checkbox"
              checked={state.featured}
              onChange={(e) => setState((s) => ({ ...s, featured: e.target.checked }))}
            />
            <span className="admin-field-label" style={{ margin: 0 }}>
              Mettre en avant
            </span>
          </label>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Variantes
        </h2>
        {variants.length === 0 ? (
          <p className="admin-empty">Aucune variante. Ajoute des options (taille, couleur…).</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {variants.map((v, i) => (
              <div
                key={v.id ?? i}
                className="admin-form-grid admin-form-grid-2"
                style={{ alignItems: "end" }}
              >
                <div className="admin-field">
                  <label className="admin-field-label">Nom variante</label>
                  <input
                    className="admin-input"
                    value={v.name}
                    onChange={(e) => {
                      const next = [...variants];
                      next[i] = { ...next[i], name: e.target.value };
                      setVariants(next);
                    }}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">SKU</label>
                  <input
                    className="admin-input"
                    value={v.sku ?? ""}
                    onChange={(e) => {
                      const next = [...variants];
                      next[i] = { ...next[i], sku: e.target.value || null };
                      setVariants(next);
                    }}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">Prix variante (€) — optionnel</label>
                  <input
                    className="admin-input"
                    type="number"
                    step="0.01"
                    value={v.priceCents != null ? v.priceCents / 100 : ""}
                    onChange={(e) => {
                      const next = [...variants];
                      const val = e.target.value;
                      next[i] = {
                        ...next[i],
                        priceCents: val ? Math.round(parseFloat(val) * 100) : null,
                      };
                      setVariants(next);
                    }}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">Stock</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      className="admin-input"
                      type="number"
                      value={v.stock}
                      onChange={(e) => {
                        const next = [...variants];
                        next[i] = { ...next[i], stock: parseInt(e.target.value || "0", 10) };
                        setVariants(next);
                      }}
                    />
                    <button
                      type="button"
                      className="admin-image-remove"
                      style={{ position: "static", width: "2.25rem", height: "2.25rem" }}
                      aria-label="Supprimer"
                      onClick={() => setVariants(variants.filter((_, j) => j !== i))}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          className="neo-button neo-button-secondary"
          style={{ marginTop: 16 }}
          onClick={() =>
            setVariants((prev) => [...prev, { name: "", stock: 0, sku: null, priceCents: null }])
          }
        >
          <span>Ajouter une variante</span>
          <span className="neo-button-mark" />
        </button>
      </div>

      <div className="admin-card">
        <h2 className="admin-h2" style={{ marginBottom: 16 }}>
          Publication
        </h2>
        <div className="admin-form-grid admin-form-grid-2">
          <div className="admin-field">
            <label className="admin-field-label">Statut</label>
            <select
              className="admin-select"
              value={state.status}
              onChange={(e) =>
                setState((s) => ({ ...s, status: e.target.value as "DRAFT" | "ACTIVE" | "ARCHIVED" }))
              }
            >
              <option value="DRAFT">Brouillon</option>
              <option value="ACTIVE">Actif</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Catégorie</label>
            <select
              className="admin-select"
              value={state.categoryId ?? ""}
              onChange={(e) => setState((s) => ({ ...s, categoryId: e.target.value }))}
            >
              <option value="">Sans catégorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label className="admin-field-label">SEO — Titre</label>
            <input
              className="admin-input"
              value={state.metaTitle ?? ""}
              onChange={(e) => setState((s) => ({ ...s, metaTitle: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">SEO — Description</label>
            <input
              className="admin-input"
              value={state.metaDescription ?? ""}
              onChange={(e) => setState((s) => ({ ...s, metaDescription: e.target.value }))}
            />
          </div>
          <label
            className="admin-field"
            style={{ flexDirection: "row", alignItems: "center", gap: 10, gridColumn: "1 / -1" }}
          >
            <input
              type="checkbox"
              checked={state.syncStripe}
              onChange={(e) => setState((s) => ({ ...s, syncStripe: e.target.checked }))}
            />
            <span className="admin-field-label" style={{ margin: 0 }}>
              Synchroniser avec Stripe à l&apos;enregistrement
            </span>
          </label>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button
          type="button"
          className="neo-button neo-button-ghost"
          onClick={() => router.push("/admin/products")}
          disabled={pending}
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
