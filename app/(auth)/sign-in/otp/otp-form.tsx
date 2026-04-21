"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function OtpForm({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Code à 6 chiffres requis.");
      return;
    }
    setLoading(true);
    const result = await authClient.signIn.emailOtp({ email, otp });
    setLoading(false);
    if (result.error) {
      toast.error(result.error.message ?? "Code invalide.");
      return;
    }
    toast.success("Connecté !");
    router.push("/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Code à 6 chiffres">
        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          maxLength={6}
          autoFocus
          className="text-center text-2xl tracking-[0.5em]"
          placeholder="••••••"
        />
      </Field>
      <Button type="submit" loading={loading} className="w-full">
        Valider
      </Button>
    </form>
  );
}
