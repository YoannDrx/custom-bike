"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteRealization } from "@/app/actions/admin-realizations";

export function RealizationRowActions({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
      <Link
        href={`/admin/realisations/${id}`}
        className="admin-link"
        style={{ fontSize: "0.72rem" }}
      >
        Éditer
      </Link>
      <button
        type="button"
        className="admin-link"
        style={{ fontSize: "0.72rem", background: "transparent", border: "none", color: "var(--vice-pink)" }}
        disabled={pending}
        onClick={() => {
          if (!confirm("Supprimer cette réalisation ?")) return;
          startTransition(async () => {
            const res = await deleteRealization(id);
            if (res.ok) {
              toast.success("Supprimée");
              router.refresh();
            }
          });
        }}
      >
        Supprimer
      </button>
    </div>
  );
}
