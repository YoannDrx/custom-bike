import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "Custom Bike | Garage moto, scooter et custom premium à Montreuil",
};

export default function Home() {
  return <HomePage />;
}
