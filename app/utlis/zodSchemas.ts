import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),
  address: z.string().min(2, "Address is required"),
  phone: z
    .string()
    .regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in the format xxx-xxx-xxxx"),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice name is required"),
  total: z.number().min(1, "$1 is minmum amount"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.number().min(0, "DueDate is required"),
  fromName: z.string().min(1, "Your name is required"),
  fromEmail: z.string().email("Invalid Email Address"),
  fromAddress: z.string().min(1, "Your address is required"),
  fromPhone: z
    .string()
    .regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in the format xxx-xxx-xxxx"),
  clientName: z.string().min(1, "Client Name is required"),
  clientEmail: z.string().email("Invalid Email Address"),
  clientAddress: z.string().min(1, "Client address is required"),
  clientPhone: z
    .string()
    .regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in the format xxx-xxx-xxxx"),
  invoiceNumber: z.number().min(1, "Minmum invoice number of 1"),
  currency: z.string().min(1, "Currency is required"),
  note: z.string().optional(),
  invoiceItemDescription: z.string().min(1, "Description is required"),
  invoiceItemQuantity: z.number().min(1, "Quanitity min 1"),
  invoiceItemRate: z.number().min(1, "Rate min 1"),
});
