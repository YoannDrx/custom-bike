import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://custombike.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/compte", "/panier", "/commande", "/sign-in", "/sign-up", "/reset-password", "/forget-password"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
