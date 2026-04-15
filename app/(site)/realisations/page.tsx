import type { Metadata } from "next";
import { RealisationsPage } from "@/components/realisations-page";

export const metadata: Metadata = {
  title: "Réalisations | Custom Bike",
};

export default function RealisationsRoute() {
  return <RealisationsPage />;
}
