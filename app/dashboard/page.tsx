import { Suspense } from "react";
import { DashboardBlocks } from "../components/DashboaordBlocks";
import { EmptyState } from "../components/EmptyState";
import { InvoiceGraph } from "../components/InvoiceGraph";
import { RecentInvoices } from "../components/RecentInvoices";
import { requireUser } from "../utlis/hooks";
import { prisma } from "../utlis/prisma";
import { Skeleton } from "@/components/ui/skeleton";

import { Metadata } from "next";
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
export default async function DashboardRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          buttontext="Create Invoice"
          description="Create an invoice to view invoice dashboard"
          title="No Invoices Found"
          href="/dashboard/invoices/create"
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
