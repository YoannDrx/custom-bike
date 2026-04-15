import type { Metadata } from "next";
import { VenteLocationPage } from "@/components/vente-location-page";

export const metadata: Metadata = {
  title: "Vente & location | Custom Bike",
};

export default function VenteLocationRoute() {
  return <VenteLocationPage />;
}
