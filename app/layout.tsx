import type { Metadata } from "next";
import {
  Archivo_Black,
  Bebas_Neue,
  Fugaz_One,
  IBM_Plex_Mono,
  Monoton,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const monoton = Monoton({
  variable: "--font-monoton",
  subsets: ["latin"],
  weight: "400",
});

const fugazOne = Fugaz_One({
  variable: "--font-fugaz",
  subsets: ["latin"],
  weight: "400",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Custom Bike | Atelier moto & scooter premium — Montreuil",
    template: "%s | Custom Bike",
  },
  description:
    "Custom Bike, atelier moto et scooter à Montreuil. Révisions, réparations, LED sur mesure, accessoires, dossiers assurance, vente et location. Du 50cc à la 1800cc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${archivoBlack.variable} ${plexMono.variable} ${bebasNeue.variable} ${monoton.variable} ${fugazOne.variable} h-full antialiased`}
    >
      <body className="site-body min-h-full">{children}</body>
    </html>
  );
}
