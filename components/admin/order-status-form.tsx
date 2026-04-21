"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateOrder } from "@/app/actions/admin-orders";

type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export function OrderStatusForm({
  order,
}: {
  order: {
    id: string;
    status: OrderStatus;
    trackingNumber: string;
    trackingUrl: string;
    notes: string;
  };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState({
    status: order.status,
    trackingNumber: order.trackingNumber,
    trackingUrl: order.trackingUrl,
    notes: order.notes,
    notifyCustomer: false,
  });

  const submit = () => {
    startTransition(async () => {
      const res = await updateOrder({
        id: order.id,
        status: state.status,
        trackingNumber: state.trackingNumber || null,
        trackingUrl: state.trackingUrl || "",
        notes: state.notes || null,
        notifyCustomer: state.notifyCustomer,
      });
      if (res.ok) {
        toast.success("Commande mise à jour");
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
        Gestion
      </h2>
      <div className="admin-form-grid admin-form-grid-2">
        <div className="admin-field">
          <label className="admin-field-label">Statut</label>
          <select
            className="admin-select"
            value={state.status}
            onChange={(e) => setState((s) => ({ ...s, status: e.target.value as OrderStatus }))}
          >
            {(
              [
                "PENDING",
                "PAID",
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED",
                "REFUNDED",
              ] as OrderStatus[]
            ).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Numéro de suivi</label>
          <input
            className="admin-input"
            value={state.trackingNumber}
            onChange={(e) =>
              setState((s) => ({ ...s, trackingNumber: e.target.value }))
            }
          />
        </div>
        <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
          <label className="admin-field-label">URL de suivi</label>
          <input
            className="admin-input"
            type="url"
            value={state.trackingUrl}
            placeholder="https://…"
            onChange={(e) => setState((s) => ({ ...s, trackingUrl: e.target.value }))}
          />
        </div>
        <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
          <label className="admin-field-label">Notes internes / message au client</label>
          <textarea
            className="admin-textarea"
            value={state.notes}
            onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
          />
        </div>
        <label
          className="admin-field"
          style={{ flexDirection: "row", alignItems: "center", gap: 10, gridColumn: "1 / -1" }}
        >
          <input
            type="checkbox"
            checked={state.notifyCustomer}
            onChange={(e) =>
              setState((s) => ({ ...s, notifyCustomer: e.target.checked }))
            }
          />
          <span className="admin-field-label" style={{ margin: 0 }}>
            Envoyer un email au client avec la mise à jour
          </span>
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
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
