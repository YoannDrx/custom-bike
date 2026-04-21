"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteProduct, duplicateProduct } from "@/app/actions/admin-products";

export function ProductRowActions({
  productId,
  slug,
}: {
  productId: string;
  slug: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
      <Link
        href={`/boutique/${slug}`}
        target="_blank"
        className="admin-link"
        style={{ fontSize: "0.72rem" }}
      >
        Voir
      </Link>
      <Link
        href={`/admin/products/${productId}`}
        className="admin-link"
        style={{ fontSize: "0.72rem" }}
      >
        Éditer
      </Link>
      <button
        type="button"
        className="admin-link"
        style={{ fontSize: "0.72rem", background: "transparent", border: "none" }}
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            const res = await duplicateProduct(productId);
            if (res.ok) {
              toast.success("Produit dupliqué");
              router.refresh();
            } else {
              toast.error(res.error ?? "Erreur");
            }
          });
        }}
      >
        Dupliquer
      </button>
      <button
        type="button"
        className="admin-link"
        style={{ fontSize: "0.72rem", background: "transparent", border: "none", color: "var(--vice-pink)" }}
        disabled={pending}
        onClick={() => {
          if (!confirm("Supprimer ce produit ?")) return;
          startTransition(async () => {
            const res = await deleteProduct(productId);
            if (res.ok) {
              toast.success("Produit supprimé");
              router.refresh();
            } else {
              toast.error("Erreur");
            }
          });
        }}
      >
        Supprimer
      </button>
    </div>
  );
}
