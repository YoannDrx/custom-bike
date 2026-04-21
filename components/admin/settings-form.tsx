"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { upsertSetting } from "@/app/actions/admin-content";

const FIELDS = [
  { key: "shop.banner", label: "Bannière boutique", placeholder: "Livraison gratuite dès 80€" },
  { key: "shop.free_shipping_threshold", label: "Seuil livraison offerte (€)", type: "number" },
  { key: "shop.standard_price_cents", label: "Prix livraison standard (cents)", type: "number" },
  { key: "shop.express_price_cents", label: "Prix livraison express (cents)", type: "number" },
  { key: "contact.phone", label: "Téléphone atelier" },
  { key: "contact.email", label: "Email atelier" },
  { key: "contact.instagram", label: "URL Instagram" },
  { key: "contact.tiktok", label: "URL TikTok" },
];

export function SettingsForm({ initial }: { initial: Record<string, unknown> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    for (const f of FIELDS) {
      const val = initial[f.key];
      out[f.key] = val != null ? String(val) : "";
    }
    return out;
  });

  const save = (key: string) => {
    startTransition(async () => {
      const raw = state[key] ?? "";
      const field = FIELDS.find((f) => f.key === key);
      const value: string | number | null = field?.type === "number"
        ? raw === ""
          ? null
          : Number(raw)
        : raw === ""
          ? null
          : raw;
      const res = await upsertSetting({ key, value });
      if (res.ok) {
        toast.success("Enregistré");
        router.refresh();
      } else {
        toast.error(res.error ?? "Erreur");
      }
    });
  };

  return (
    <section className="admin-card">
      <div className="admin-form-grid admin-form-grid-2">
        {FIELDS.map((field) => (
          <div key={field.key} className="admin-field">
            <label className="admin-field-label">{field.label}</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                className="admin-input"
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                value={state[field.key] ?? ""}
                onChange={(e) =>
                  setState((s) => ({ ...s, [field.key]: e.target.value }))
                }
              />
              <button
                type="button"
                className="neo-button neo-button-secondary"
                disabled={pending}
                onClick={() => save(field.key)}
              >
                <span>OK</span>
                <span className="neo-button-mark" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
