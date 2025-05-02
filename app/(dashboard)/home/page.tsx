import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { prisma } from "@/app/utlis/prisma";
import { requireUser } from "@/app/utlis/hooks";
import { EmptyState } from "@/app/components/EmptyState";
import { DashboardBlocks } from "@/app/components/DashboaordBlocks";
import { InvoiceGraph } from "@/app/components/InvoiceGraph";
import { RecentInvoices } from "@/app/components/RecentInvoices";
export const metadata: Metadata = {
  title: "Dashboard",
};

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });
  return data;
}
export default async function HomeRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          buttontext="Create Invoice"
          description="Create an invoice to view invoice dashboard"
          title="No Invoices Found"
          href="/invoices/create"
        />
      ) : (
        <>
          <Suspense fallback={<Skeleton className="w-fullh-full flex-1" />}>
            <DashboardBlocks />
            <div className="grid gap-4 lg:grid-cols-3 md:gap-4">
              <InvoiceGraph />
              <RecentInvoices />
            </div>
          </Suspense>
        </>
      )}
    </>
  );
}
