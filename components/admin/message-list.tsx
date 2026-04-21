"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteMessage, updateMessageStatus } from "@/app/actions/admin-messages";

type Status = "NEW" | "READ" | "REPLIED" | "ARCHIVED";
type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: Status;
  createdAt: string;
};

const STATUSES: Status[] = ["NEW", "READ", "REPLIED", "ARCHIVED"];

export function MessageList({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [openId, setOpenId] = useState<string | null>(messages[0]?.id ?? null);

  const changeStatus = (id: string, status: Status) => {
    startTransition(async () => {
      const res = await updateMessageStatus({ id, status });
      if (res.ok) {
        toast.success("Statut mis à jour");
        router.refresh();
      }
    });
  };

  const remove = (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    startTransition(async () => {
      const res = await deleteMessage(id);
      if (res.ok) {
        toast.success("Supprimé");
        router.refresh();
      }
    });
  };

  return (
    <section className="admin-grid" style={{ gridTemplateColumns: "1fr 1.5fr", gap: 16 }}>
      <div className="admin-card" style={{ padding: 0, maxHeight: "70vh", overflowY: "auto" }}>
        {messages.length === 0 ? (
          <p className="admin-empty" style={{ padding: "1.5rem" }}>
            Aucun message.
          </p>
        ) : (
          messages.map((msg) => (
            <button
              key={msg.id}
              type="button"
              onClick={() => setOpenId(msg.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "0.85rem 1rem",
                background: openId === msg.id ? "rgba(255,30,110,0.08)" : "transparent",
                borderLeft:
                  openId === msg.id ? "3px solid var(--vice-pink)" : "3px solid transparent",
                color: "white",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{msg.name}</span>
                <span
                  className={`admin-pill admin-pill-${
                    msg.status === "NEW" ? "warn" : "neutral"
                  }`}
                >
                  {msg.status}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {msg.subject ? `${msg.subject} — ` : ""}
                {msg.message}
              </p>
            </button>
          ))
        )}
      </div>

      <article className="admin-card">
        {openId ? (
          <MessageDetail
            message={messages.find((m) => m.id === openId) ?? null}
            onStatusChange={changeStatus}
            onDelete={remove}
            pending={pending}
          />
        ) : (
          <p className="admin-empty">Sélectionne un message.</p>
        )}
      </article>
    </section>
  );
}

function MessageDetail({
  message,
  onStatusChange,
  onDelete,
  pending,
}: {
  message: Message | null;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
  pending: boolean;
}) {
  if (!message) return <p className="admin-empty">Introuvable.</p>;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="admin-h2">{message.subject ?? "Sans objet"}</h2>
          <p className="admin-list-sub">
            {message.name} · {message.email}
            {message.phone ? ` · ${message.phone}` : ""}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              className={`admin-pill ${
                message.status === s ? "admin-pill-info" : ""
              }`}
              style={{ cursor: "pointer", background: "transparent" }}
              disabled={pending || message.status === s}
              onClick={() => onStatusChange(message.id, s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, marginTop: 20 }}>
        {message.message}
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
        <a
          href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(
            message.subject ?? "Ta demande Custom Bike",
          )}`}
          className="neo-button neo-button-primary"
        >
          <span>Répondre par email</span>
          <span className="neo-button-mark" />
        </a>
        {message.phone ? (
          <a href={`tel:${message.phone}`} className="neo-button neo-button-secondary">
            <span>Appeler</span>
            <span className="neo-button-mark" />
          </a>
        ) : null}
        <button
          type="button"
          className="neo-button neo-button-ghost"
          disabled={pending}
          onClick={() => onDelete(message.id)}
        >
          <span>Supprimer</span>
          <span className="neo-button-mark" />
        </button>
      </div>
    </div>
  );
}
