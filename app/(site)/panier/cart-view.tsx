"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { removeCartItem, updateCartItem } from "@/app/actions/cart";
import { startCheckout } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

type Item = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  priceCents: number;
  quantity: number;
  maxStock: number;
};

type Totals = { subtotalCents: number; totalCents: number; itemsCount: number };

export function CartView({
  initialItems,
  initialTotals,
  currency,
  userEmail,
}: {
  initialItems: Item[];
  initialTotals: Totals;
  currency: string;
  userEmail: string | null;
}) {
  const [items, setItems] = useState(initialItems);
  const [pending, startTransition] = useTransition();
  const [shippingMethod, setShippingMethod] = useState<
    "PICKUP" | "STANDARD" | "EXPRESS"
  >("PICKUP");
  const [email, setEmail] = useState(userEmail ?? "");

  const subtotal = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );
  const shipping =
    shippingMethod === "STANDARD" ? 890 : shippingMethod === "EXPRESS" ? 1490 : 0;
  const total = subtotal + shipping;

  const handleQuantity = (id: string, nextQty: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(nextQty, item.maxStock)) }
          : item,
      ),
    );
    startTransition(async () => {
      await updateCartItem(id, nextQty);
    });
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    startTransition(async () => {
      await removeCartItem(id);
    });
  };

  const handleCheckout = () => {
    if (!email) {
      toast.error("Renseigne ton email pour la commande.");
      return;
    }
    startTransition(async () => {
      const result = await startCheckout({ email, shippingMethod });
      if (result && "error" in result && result.error) {
        toast.error(result.error);
      }
    });
  };

  void initialTotals;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <Link
              href={`/boutique/${item.slug}`}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-black/40"
            >
              {item.image ? (
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              ) : null}
            </Link>
            <div className="flex flex-1 flex-col justify-between gap-2">
              <div>
                <Link
                  href={`/boutique/${item.slug}`}
                  className="font-semibold text-white hover:text-[color:var(--vice-pink)]"
                >
                  {item.name}
                </Link>
                <div className="mt-1 text-xs text-white/45">
                  {formatPrice(item.priceCents, currency)} l&apos;unité
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 p-1">
                  <button
                    type="button"
                    onClick={() => handleQuantity(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-bebas-neue)] text-xl tracking-widest text-[color:var(--vice-pink)]">
                    {formatPrice(item.priceCents * item.quantity, currency)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="text-xs text-white/40 hover:text-[color:var(--vice-pink)]"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit space-y-5 rounded-3xl border border-[color:var(--vice-pink)]/25 bg-[color:var(--surface)]/70 p-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white placeholder:text-white/30 focus:border-[color:var(--vice-cyan)] focus:outline-none"
            placeholder="toi@exemple.com"
          />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Livraison
          </div>
          {[
            { key: "PICKUP", label: "Retrait atelier", price: 0, sub: "17 rue Voltaire, Montreuil" },
            { key: "STANDARD", label: "Colissimo standard", price: 890, sub: "2 à 4 jours" },
            { key: "EXPRESS", label: "Chronopost express", price: 1490, sub: "24h ouvrés" },
          ].map((opt) => {
            const active = shippingMethod === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() =>
                  setShippingMethod(opt.key as "PICKUP" | "STANDARD" | "EXPRESS")
                }
                className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${active ? "border-[color:var(--vice-pink)] bg-[color:var(--vice-pink)]/10" : "border-white/10 bg-black/20 hover:border-white/25"}`}
              >
                <div>
                  <div className="text-sm font-semibold text-white">{opt.label}</div>
                  <div className="text-[11px] text-white/45">{opt.sub}</div>
                </div>
                <div className="text-sm font-semibold text-[color:var(--vice-cyan)]">
                  {opt.price === 0 ? "Offert" : formatPrice(opt.price, currency)}
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between text-white/60">
            <span>Sous-total</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Livraison</span>
            <span>{shipping === 0 ? "Offerte" : formatPrice(shipping, currency)}</span>
          </div>
          <div className="flex justify-between pt-2 text-lg font-semibold text-white">
            <span>Total</span>
            <span className="text-[color:var(--vice-pink)]">
              {formatPrice(total, currency)}
            </span>
          </div>
        </div>

        <Button onClick={handleCheckout} loading={pending} className="w-full">
          Passer au paiement
        </Button>
        <p className="text-[11px] text-center text-white/40">
          Paiement sécurisé Stripe · CB, Apple Pay, Google Pay
        </p>
      </aside>
    </div>
  );
}
