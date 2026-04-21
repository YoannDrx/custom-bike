"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("redirect") ?? "/";
  const [loading, setLoading] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: Values) => {
    setLoading(true);
    const result = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: callbackUrl,
    });
    setLoading(false);
    if (result.error) {
      toast.error(result.error.message ?? "Identifiants incorrects.");
      return;
    }
    toast.success("Connecté. Bienvenue !");
    router.push(callbackUrl);
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
    router.push(`/sign-in/otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[color:var(--bg)] px-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
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
  );
}
