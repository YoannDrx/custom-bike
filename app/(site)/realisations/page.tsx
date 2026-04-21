import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { RealisationsPage } from "@/components/realisations-page";

export const metadata: Metadata = {
  title: "Réalisations | Custom Bike",
  description:
    "Galerie des projets atelier Custom Bike : LED, covering, crashbar, CarPlay. Montreuil.",
};

export const dynamic = "force-dynamic";

export default async function RealisationsRoute() {
  const items = await prisma.realization.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { position: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      bike: true,
      category: true,
      summary: true,
      coverImage: true,
    },
    take: 18,
  });

  return <RealisationsPage customRealizations={items} />;
}
