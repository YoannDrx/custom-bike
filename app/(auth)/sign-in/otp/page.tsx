import type { Metadata } from "next";

import { OtpForm } from "./otp-form";

export const metadata: Metadata = {
  title: "Code de connexion",
};

export default async function OtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--vice-cyan)]">
          Code envoyé
        </div>
        <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl text-white">
          Entre le code
        </h1>
        <p className="text-sm text-white/60">
          Un code à 6 chiffres a été envoyé à{" "}
          <span className="text-white">{email ?? "ton email"}</span>.
        </p>
      </div>
      <OtpForm email={email ?? ""} />
    </div>
  );
}
