import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Archivo_Black,
  Bebas_Neue,
  Fugaz_One,
  IBM_Plex_Mono,
  Monoton,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://custombike.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Custom Bike | Atelier moto & scooter premium — Montreuil",
    template: "%s | Custom Bike",
  },
  description:
    "Custom Bike, atelier moto et scooter à Montreuil. Révisions, réparations, LED sur mesure, accessoires, dossiers assurance, vente et location. Du 50cc à la 1800cc.",
  keywords: [
    "atelier moto Montreuil",
    "LED moto sur mesure",
    "révision moto",
    "custom bike",
    "covering moto",
    "crashbar",
    "CarPlay moto",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Custom Bike",
    title: "Custom Bike | Atelier moto & scooter premium — Montreuil",
    description:
      "Atelier moto et scooter à Montreuil. LED sur mesure, covering, crashbars, CarPlay, révisions premium.",
    images: [{ url: "/media/custombike-logo.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Bike — Atelier moto premium",
    description:
      "LED sur mesure, covering, crashbars, CarPlay, révisions. Montreuil.",
    images: ["/media/custombike-logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${archivoBlack.variable} ${plexMono.variable} ${bebasNeue.variable} ${monoton.variable} ${fugazOne.variable} h-full antialiased`}
    >
      <body className="site-body min-h-full" suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
