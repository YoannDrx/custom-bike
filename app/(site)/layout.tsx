import type { ReactNode } from "react";
import { SiteLayout } from "@/components/site-layout";
import { business } from "@/lib/site-content";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://custombike.fr";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: business.name,
  url: BASE_URL,
  image: `${BASE_URL}/media/custombike-logo.jpg`,
  telephone: business.phoneDisplay,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "17 rue Voltaire",
    postalCode: "93100",
    addressLocality: "Montreuil",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8607,
    longitude: 2.4411,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  sameAs: [business.socials.instagram, business.socials.tiktok],
  priceRange: "€€",
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <SiteLayout>{children}</SiteLayout>
    </>
  );
}
