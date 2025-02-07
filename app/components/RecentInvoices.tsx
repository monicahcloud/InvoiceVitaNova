import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "../utlis/prisma";
import { requireUser } from "../utlis/hooks";
import { formatCurrency } from "../utlis/formatCurrency";
import { SeparatorHorizontal } from "lucide-react";

async function getData(userId: string) {
    
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      clientPhone: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}



export async function RecentInvoices() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {data.map((item) => (
          <div className="flex items-center gap-7 mb-5" key={item.id}>
            <Avatar className="hidden sm:flex size-9">
              <AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                {item.clientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.clientEmail}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.clientPhone}
              </p>
            </div>
            <div className="ml-auto font-medium">
              +
              {formatCurrency({
                amount: item.total,
                currency: item.currency as any,
              })}
            </div>
    </div>  
          
        ))}
      </CardContent>
      
    </Card>
    
  );
}
