
import { DashboardBlocks } from "../components/DashboaordBlocks";
import { InvoiceGraph } from "../components/InvoiceGraph";
import { RecentInvoices } from "../components/RecentInvoices";
import { signOut } from "../utlis/auth";
import { requireUser } from "../utlis/hooks";

export default async function DashboardRoute() {

const session = await requireUser()

    return (
      <>
        <DashboardBlocks/>
        <div className='grid gap-4 lg:grid-cols-3 md:gap-4'>
          <InvoiceGraph/>
          <RecentInvoices/>
        </div>
      </>
    );
}


