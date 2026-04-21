"use client";

import { useRouter } from "next/navigation";
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
  name: z.string().min(2, "Ton nom complet").max(60),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
});

type Values = z.infer<typeof schema>;

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: Values) => {
    setLoading(true);
    const result = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: "/",
    });
    setLoading(false);
    if (result.error) {
      toast.error(result.error.message ?? "Inscription impossible.");
      return;
    }
    toast.success("Compte créé. Bienvenue !");
    router.push("/");
    router.refresh();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Nom complet" error={form.formState.errors.name?.message}>
        <Input autoComplete="name" {...form.register("name")} />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <Input
          type="email"
          autoComplete="email"
          {...form.register("email")}
        />
      </Field>
      <Field
        label="Mot de passe"
        hint="8 caractères minimum."
        error={form.formState.errors.password?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          {...form.register("password")}
        />
      </Field>
      <Button type="submit" loading={loading} className="w-full">
        Créer mon compte
      </Button>
      <p className="text-[11px] leading-relaxed text-white/40">
        En continuant tu acceptes nos conditions et notre politique de confidentialité.
      </p>
    </form>
  );
}
