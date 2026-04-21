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

const schema = z
  .object({
    password: z.string().min(8, "8 caractères minimum"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  });

type Values = z.infer<typeof schema>;

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });

  const onSubmit = async (values: Values) => {
    setLoading(true);
    const result = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });
    setLoading(false);
    if (result.error) {
      toast.error(result.error.message ?? "Lien expiré ou invalide.");
      return;
    }
    toast.success("Mot de passe mis à jour. Connecte-toi maintenant.");
    router.push("/sign-in");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Field
        label="Nouveau mot de passe"
        error={form.formState.errors.password?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          {...form.register("password")}
        />
      </Field>
      <Field
        label="Confirmer"
        error={form.formState.errors.confirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          {...form.register("confirm")}
        />
      </Field>
      <Button type="submit" loading={loading} className="w-full">
        Mettre à jour
      </Button>
    </form>
  );
}
