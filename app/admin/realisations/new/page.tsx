import { RealizationForm } from "@/components/admin/realization-form";

export const dynamic = "force-dynamic";

export default function NewRealizationPage() {
  return (
    <div className="admin-page">
      <header>
        <h1 className="admin-h1">Nouvelle réalisation</h1>
        <p className="admin-subtitle">Ajoute des photos avant / après pour ta galerie.</p>
      </header>
      <RealizationForm />
    </div>
  );
}
