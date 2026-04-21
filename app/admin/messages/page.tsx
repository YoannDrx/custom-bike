import { prisma } from "@/lib/prisma";

import { MessageList } from "@/components/admin/message-list";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const filter = params.status;

  const messages = await prisma.contactMessage.findMany({
    where: filter && ["NEW", "READ", "REPLIED", "ARCHIVED"].includes(filter)
      ? { status: filter as "NEW" | "READ" | "REPLIED" | "ARCHIVED" }
      : {},
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-h1">Messages</h1>
          <p className="admin-subtitle">
            {messages.length} message{messages.length > 1 ? "s" : ""}
          </p>
        </div>
      </header>
      <MessageList
        messages={messages.map((m) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          phone: m.phone,
          subject: m.subject,
          message: m.message,
          status: m.status,
          createdAt: m.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
