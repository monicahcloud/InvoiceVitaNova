import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import img from "@/public/paid.svg"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SubmitButtons from "@/app/components/SubmitButtons";
import { markAsPaid } from "@/app/actions";
import { prisma } from "@/app/utlis/prisma";
import { redirect } from "next/navigation";
import { requireUser } from "@/app/utlis/hooks";

async function Authorize(invoiceId:string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
      ,  }
    })
    if(!data) {
        return redirect("/dashboard/invoices")
    }
}
type Params = Promise<{invoiceId: string}>

export default async function MarkAsPaid({params} : {params: Params}) {
    const session = await requireUser()
    const {invoiceId} =await params  
    await Authorize(invoiceId, session.user?.id as string)
    
    return (
    <div className="flex flex-1 justify-center items-center ">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Mark ad Paid?</CardTitle>
          <CardDescription className="text-center">
            Are you sure you want to mark this invoice as paid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={img} alt="Mark as Paid" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await markAsPaid(invoiceId);
            }}
          >
            <SubmitButtons text="Mark as Paid" variant={"default"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
