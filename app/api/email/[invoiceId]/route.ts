import { requireUser } from "@/app/utlis/hooks";
import { emailClient } from "@/app/utlis/mailtrap";
import { prisma } from "@/app/utlis/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    const sender = {
      email: "hello@vitanovadesigns.cloud",
      name: "VitaNova Designs and Marketing LLC",
    };

    const recipients = [
      {
        email: invoiceData.clientEmail,
      },
    ];

    emailClient.send({
      from: sender,
      to: recipients,
      template_uuid: "7d282baf-9312-47e8-9445-6140aca74779",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Vita Nova Designs",
        company_info_phone: invoiceData.fromPhone,
        company_info_address: invoiceData.fromAddress,
        company_info_city: "Dallas",
        company_info_zip_code: "30157",
        company_info_country: "United States",
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email reminder" },
      { status: 500 }
    );
  }
}
