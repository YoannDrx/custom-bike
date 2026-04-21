"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
});

type Values = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const onSubmit = async (values: Values) => {
    setLoading(true);
    const result = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
    });
    setLoading(false);
    if (result.error) {
      toast.error(result.error.message ?? "Identifiants incorrects.");
      return;
    }
    toast.success("Connecté. Bienvenue !");
    onClose();
    router.refresh();
  };

  const sendMagicLink = async () => {
    const email = form.getValues("email");
    const parsed = z.string().email().safeParse(email);
    if (!parsed.success) {
      toast.error("Saisis ton email d'abord.");
      return;
    }
    setLoading(true);
    const result = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    setLoading(false);
    if (result.error) {
      toast.error(result.error.message ?? "Envoi impossible.");
      return;
    }
    toast.success("Code envoyé, vérifie ta boîte mail.");
    onClose();
    router.push(`/sign-in/otp?email=${encodeURIComponent(email)}`);
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div className="login-modal-overlay" role="dialog" aria-modal="true" aria-label="Connexion">
      <button
        type="button"
        className="login-modal-backdrop"
        aria-label="Fermer"
        onClick={onClose}
      />
      <div className="login-modal-panel">
        <button
          type="button"
          className="login-modal-close"
          aria-label="Fermer"
          onClick={onClose}
        >
          ×
        </button>

        <div className="login-modal-head">
          <p className="login-modal-kicker">Accès atelier</p>
          <h2 className="login-modal-title">Connecte-toi</h2>
          <p className="login-modal-sub">
            Suis tes commandes et messages atelier depuis ton compte.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Email" error={form.formState.errors.email?.message}>
            <Input
              type="email"
              autoComplete="email"
              placeholder="toi@exemple.com"
              {...form.register("email")}
            />
          </Field>
          <Field
            label={
              <div className="flex items-center justify-between">
                <span>Mot de passe</span>
                <Link
                  href="/forget-password"
                  onClick={onClose}
                  className="text-[10px] font-medium normal-case tracking-normal text-white/50 hover:text-[color:var(--vice-cyan)]"
                >
                  Oublié ?
                </Link>
              </div>
            }
            error={form.formState.errors.password?.message}
          >
            <Input
              type="password"
              autoComplete="current-password"
              {...form.register("password")}
            />
          </Field>
          <Button type="submit" loading={loading} className="w-full">
            Connexion
          </Button>
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[color:var(--surface,#0a0d18)] px-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
                ou
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={sendMagicLink}
            loading={loading}
            className="w-full"
          >
            Recevoir un code email
          </Button>
        </form>

        <p className="login-modal-footer">
          Nouveau ici ?{" "}
          <Link
            href="/sign-up"
            onClick={onClose}
            className="font-semibold text-[color:var(--vice-pink)] hover:text-[color:var(--vice-cyan)]"
          >
            Crée un compte
          </Link>
        </p>
      </div>
    </div>,
    document.body,
  );
}
