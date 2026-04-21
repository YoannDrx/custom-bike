import { prisma } from "@/lib/prisma";

import { TestimonialsManager } from "@/components/admin/testimonials-manager";
import { FaqManager } from "@/components/admin/faq-manager";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const [testimonials, faqs] = await Promise.all([
    prisma.testimonial.findMany({ orderBy: [{ position: "asc" }, { createdAt: "desc" }] }),
    prisma.faqItem.findMany({ orderBy: [{ position: "asc" }, { createdAt: "desc" }] }),
  ]);
  return (
    <div className="admin-page">
      <header>
        <h1 className="admin-h1">Contenu éditorial</h1>
        <p className="admin-subtitle">Témoignages et FAQ visibles sur le site.</p>
      </header>
      <TestimonialsManager testimonials={testimonials} />
      <FaqManager faqs={faqs} />
    </div>
  );
}
