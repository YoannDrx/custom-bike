"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(2).max(60),
  phone: z.string().max(30).optional(),
});

type Values = z.infer<typeof schema>;

export function ProfileForm({
  initial,
}: {
  initial: { name: string; email: string; phone: string };
}) {
  const [pending, startTransition] = useTransition();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: initial.name, phone: initial.phone },
  });

  const onSubmit = (values: Values) => {
    startTransition(async () => {
      const res = await updateProfile(values);
      if (!res.ok) toast.error(res.error ?? "Erreur");
      else toast.success("Profil mis à jour.");
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
      <Field label="Nom complet" error={form.formState.errors.name?.message}>
        <Input {...form.register("name")} />
      </Field>
      <Field label="Email">
        <Input value={initial.email} disabled />
      </Field>
      <Field label="Téléphone">
        <Input {...form.register("phone")} placeholder="06 ..." />
      </Field>
      <Button type="submit" loading={pending}>
        Enregistrer
      </Button>
    </form>
  );
}
