import * as React from "react";

import { cn } from "@/lib/utils";

export function Field({
  label,
  error,
  hint,
  children,
  className,
}: {
  label?: React.ReactNode;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
          {label}
        </div>
      ) : null}
      {children}
      {error ? (
        <p className="text-xs text-[color:var(--vice-pink)] font-medium">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-white/45">{hint}</p>
      ) : null}
    </div>
  );
}
