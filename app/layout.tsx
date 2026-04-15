import type { Metadata } from "next";
import { Sora, Teko } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Custom Bike | Garage moto & scooter premium a Montreuil",
  description:
    "Custom Bike, atelier moto et scooter a Montreuil. Revisions, reparations, accessoires, covering, LED, dossiers assurance et projets custom multi-marques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${sora.variable} ${teko.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
