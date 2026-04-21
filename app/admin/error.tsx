"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin]", error);
  }, [error]);

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1 className="admin-h1">Une erreur est survenue</h1>
        <p className="admin-subtitle" style={{ marginTop: 8 }}>
          {error.message}
        </p>
        {error.digest ? (
          <p className="admin-field-hint" style={{ marginTop: 6 }}>
            Référence : {error.digest}
          </p>
        ) : null}
        <div style={{ marginTop: 16 }}>
          <button type="button" className="neo-button neo-button-primary" onClick={reset}>
            <span>Réessayer</span>
            <span className="neo-button-mark" />
          </button>
        </div>
      </div>
    </div>
  );
}
