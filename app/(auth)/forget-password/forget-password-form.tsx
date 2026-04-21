"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const schema = z.object({ email: z.string().email("Email invalide") });

export function ForgetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<{ email: string }>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: { email: string }) => {
    setLoading(true);
    const result = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });
    setLoading(false);
    if (result.error) {
      toast.error(result.error.message ?? "Envoi impossible.");
      return;
    }
    setSent(true);
    toast.success("Email envoyé si le compte existe.");
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-[color:var(--vice-cyan)]/30 bg-[color:var(--vice-cyan)]/5 p-5 text-sm text-white/80">
        Regarde ta boîte mail. Si un compte est associé à cette adresse, tu recevras un lien de réinitialisation dans quelques instants.
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Email" error={form.formState.errors.email?.message}>
        <Input
          type="email"
          autoComplete="email"
          {...form.register("email")}
        />
      </Field>
      <Button type="submit" loading={loading} className="w-full">
        Envoyer le lien
      </Button>
    </form>
  );
}
