"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateUser } from "@/app/actions/admin-users";

export function CustomerActions({
  user,
}: {
  user: { id: string; role: "user" | "admin"; banned: boolean; banReason: string };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState(user);

  const submit = () => {
    startTransition(async () => {
      const res = await updateUser({
        userId: state.id,
        role: state.role,
        banned: state.banned,
        banReason: state.banReason || null,
      });
      if (res.ok) {
        toast.success("Utilisateur mis à jour");
        router.refresh();
      } else {
        toast.error(res.error ?? "Erreur");
      }
    });
  };

  return (
    <form
      className="admin-card"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2 className="admin-h2" style={{ marginBottom: 16 }}>
        Rôle et accès
      </h2>
      <div className="admin-form-grid admin-form-grid-2">
        <div className="admin-field">
          <label className="admin-field-label">Rôle</label>
          <select
            className="admin-select"
            value={state.role}
            onChange={(e) =>
              setState((s) => ({ ...s, role: e.target.value as "user" | "admin" }))
            }
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <label
          className="admin-field"
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <input
            type="checkbox"
            checked={state.banned}
            onChange={(e) => setState((s) => ({ ...s, banned: e.target.checked }))}
          />
          <span className="admin-field-label" style={{ margin: 0 }}>
            Compte banni
          </span>
        </label>
        {state.banned ? (
          <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-field-label">Raison du bannissement</label>
            <input
              className="admin-input"
              value={state.banReason}
              onChange={(e) => setState((s) => ({ ...s, banReason: e.target.value }))}
            />
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <button type="submit" className="neo-button neo-button-primary" disabled={pending}>
          <span>{pending ? "Enregistrement…" : "Enregistrer"}</span>
          <span className="neo-button-mark" />
        </button>
      </div>
    </form>
  );
}
