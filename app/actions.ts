"use server";

import { requireUser } from "./utlis/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchemaValidation } from "./utlis/zodSchemas";
import { prisma } from "./utlis/prisma";
import { redirect } from "next/navigation";
import { emailClient } from "./utlis/mailtrap";
import { formatCurrency } from "./utlis/formatCurrency";

export async function onboardUser(prevState: any, formData: FormData) {
  console.log("Form submission received");

  const session = await requireUser();
  console.log("Session:", session);

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });
        console.log("Username uniqueness check:", !existingUsername);
        return !existingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    console.log("Validation failed:", submission.reply());
    return submission.reply(); // will include error messages for form
  }

  const data = await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
      phone: submission.value.phone,
      name: submission.value.fullName,
      userName: submission.value.userName,
    },
  });

  console.log("User updated:", data);
  return redirect("/home");
}

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      clientPhone: submission.value.clientPhone,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      fromPhone: submission.value.fromPhone,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id,
    },
  });

  const sender = {
    email: "hello@vitanovadesigns.cloud",
    name: "VitaNova Designs and Marketing LLC",
  };

  const recipients = [
    {
      email: submission.value.clientEmail,
    },
  ];

  emailClient.send({
    from: sender,
    to: recipients,
    template_uuid: "3c628527-9aa1-4402-bf17-9ba2e0833f46",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(submission.value.date)
      ),
      totalAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink:
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/api/invoice/${data.id}`
          : `https://vitanovabusinesshub.netlify.app/api/invoice/${data.id}`,
    },
  });
  return redirect("/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      clientPhone: submission.value.clientPhone,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      fromPhone: submission.value.fromPhone,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    },
  });
  const sender = {
    email: "hello@vitanovadesigns.cloud",
    name: "VitaNova Designs and Marketing LLC",
  };

  const recipients = [
    {
      email: submission.value.clientEmail,
    },
  ];

  emailClient.send({
    from: sender,
    to: recipients,
    template_uuid: "6d1f0ddc-dd9a-45a9-89e7-efa33b7c2f8f",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(submission.value.date)
      ),
      totalAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink:
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/api/invoice/${data.id}`
          : `https://launchwithnova.com/api/invoice/${data.id}`,
    },
  });
  return redirect("/invoices");
}

export async function deleteInvoice(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
  });
  return redirect("/invoices");
}

export async function markAsPaid(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
    data: {
      status: "PAID",
    },
  });
  return redirect("/invoices");
}
