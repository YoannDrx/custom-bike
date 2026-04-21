import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1 className="admin-h1">Introuvable</h1>
        <p className="admin-subtitle" style={{ marginTop: 8 }}>
          Cette ressource admin n&apos;existe pas.
        </p>
        <div style={{ marginTop: 16 }}>
          <Link href="/admin" className="neo-button neo-button-primary">
            <span>Retour au dashboard</span>
            <span className="neo-button-mark" />
          </Link>
        </div>
      </div>
    </div>
  );
}
