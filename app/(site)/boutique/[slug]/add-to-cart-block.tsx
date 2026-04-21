"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { addToCart } from "@/app/actions/cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

type Variant = {
  id: string;
  name: string;
  priceCents: number | null;
  stock: number;
};

export function AddToCartBlock({
  productId,
  variants,
  basePriceCents,
  currency,
  outOfStock,
}: {
  productId: string;
  variants: Variant[];
  basePriceCents: number;
  currency: string;
  outOfStock: boolean;
}) {
  const router = useRouter();
  const [variantId, setVariantId] = useState<string | null>(
    variants[0]?.id ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [pending, startTransition] = useTransition();

  const handleAdd = (goToCart = false) => {
    startTransition(async () => {
      const result = await addToCart(productId, variantId, quantity);
      if (!result.ok) {
        toast.error(result.error ?? "Ajout impossible.");
        return;
      }
      toast.success("Ajouté au panier.");
      if (goToCart) router.push("/panier");
      else router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      {variants.length > 0 ? (
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Variante
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const price = v.priceCents ?? basePriceCents;
              const active = variantId === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  disabled={v.stock <= 0}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition disabled:opacity-40 ${active ? "border-[color:var(--vice-pink)] bg-[color:var(--vice-pink)]/20 text-white" : "border-white/10 text-white/60 hover:border-white/30"}`}
                >
                  {v.name} · {formatPrice(price, currency)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-white/60 hover:bg-white/10"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold text-white">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-white/60 hover:bg-white/10"
          >
            +
          </button>
        </div>
        <Button
          onClick={() => handleAdd(false)}
          loading={pending}
          disabled={outOfStock}
          className="flex-1"
        >
          {outOfStock ? "Rupture" : "Ajouter au panier"}
        </Button>
      </div>
      <Button
        variant="secondary"
        onClick={() => handleAdd(true)}
        loading={pending}
        disabled={outOfStock}
        className="w-full"
      >
        Acheter maintenant
      </Button>
    </div>
  );
}
