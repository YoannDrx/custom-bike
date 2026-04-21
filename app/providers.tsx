"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(13, 18, 34, 0.95)",
            border: "1px solid rgba(255, 30, 110, 0.3)",
            color: "#f5f6ff",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </>
  );
}
