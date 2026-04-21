import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[color:var(--vice-pink)]/20 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-[32rem] w-[32rem] rounded-full bg-[color:var(--vice-cyan)]/20 blur-3xl" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col px-6 py-10">
        <header className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-[0.2em] text-white"
          >
            CUSTOM <span className="text-[color:var(--vice-pink)]">BIKE</span>
          </Link>
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.18em] text-white/50 hover:text-white"
          >
            Retour au site
          </Link>
        </header>
        <main className="mx-auto flex w-full max-w-md flex-1 items-center">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
