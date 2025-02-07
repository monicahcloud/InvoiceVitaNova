'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import SubmitButtons from "./SubmitButtons";
import { formatCurrency } from "../utlis/formatCurrency";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utlis/zodSchemas";
import { editInvoice } from "../actions";
import { Prisma } from "@prisma/client";

interface iAppProps {
    data: Prisma.InvoiceGetPayload<{}>
  
}

export function EditInvoice({ data}: iAppProps) {

     const [selectedDate, setSelectedDate] = useState(data.date);
      const [rate, setRate] = useState(data.invoiceItemRate.toString());
      const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString());
      const [currency, setCurrency] = useState(data.currency);
    
      const calcualteTotal = (Number(quantity) || 0) * (Number(rate) || 0);
      

     const [lastResult, action] = useActionState(editInvoice, undefined);
       const [form, fields] = useForm({
         lastResult,
         onValidate({ formData }) {
           return parseWithZod(formData, {
             schema: invoiceSchema,
           });
         },
         shouldValidate: "onBlur",
         shouldRevalidate: "onInput",
       }); 
  return (
    <>
      <Card className="w-full max-w-4xl mx-auto ">
        <CardContent className="p-6">
          <form
            id={form.id}
            action={action}
            onSubmit={form.onSubmit}
            noValidate
          >
            <input
              type="hidden"
              name={fields.date.name}
              value={selectedDate.toISOString()}
            />
            <input
            type='hidden'
            name='id'
            value={data.id}
             />

            <input
              type="hidden"
              name={fields.total.name}
              value={calcualteTotal}
            />
            <div className="flex flex-col gap-1 w-fit">
              <div className="flex items-center gap-4 mb-6">
                <Badge className="" variant="secondary">
                  Draft
                </Badge>
                <Input
                  name={fields.invoiceName.name}
                  key={fields.invoiceName.key}
                  defaultValue={data.invoiceName}
                  placeholder="test123"
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceName.errors}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="">
                <Label>Invoice No.</Label>
                <div className="flex ">
                  <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                    #
                  </span>
                  <Input
                    name={fields.invoiceNumber.name}
                    key={fields.invoiceNumber.key}
                    defaultValue={data.invoiceNumber}
                    className="rounded-l-none"
                    placeholder="5"
                  />
                </div>
                <p className="text-sm text-red-500">
                  {fields.invoiceNumber.errors}
                </p>
              </div>
              <div>
                <Label>Currency</Label>
                <Select
                  defaultValue="USD"
                  name={fields.currency.name}
                  key={fields.currency.key}
                  onValueChange={(value) => setCurrency(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">
                      United States Dollar -- USD
                    </SelectItem>
                    <SelectItem value="EUR">Euro -- EUR</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-500">{fields.currency.errors}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label>From</Label>
                <Input
                  placeholder="Your Name"
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={data.fromName}
                />
                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={data.fromEmail}
                />
                <p className="text-sm text-red-500">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={data.fromAddress}
                />
                <p className="text-sm text-red-500">
                  {fields.fromAddress.errors}
                </p>
                <Input
                  placeholder="Your Phone Number"
                  name={fields.fromPhone.name}
                  key={fields.fromPhone.key}
                  defaultValue={data.fromPhone}
                />
                <p className="text-sm text-red-500">
                  {fields.fromPhone.errors}
                </p>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Input
                  placeholder="Client Name"
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={data.clientName}
                />
                <p className="text-sm text-red-500">
                  {fields.clientName.errors}
                </p>
                <Input
                  placeholder="Client Email"
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={data.clientEmail}
                />
                <p className="text-sm text-red-500">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  placeholder="Client Address"
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={data.clientAddress}
                />
                <p className="text-sm text-red-500">
                  {fields.clientAddress.errors}
                </p>
                <Input
                  placeholder="Client Phone Number"
                  name={fields.clientPhone.name}
                  key={fields.clientPhone.key}
                  defaultValue={data.clientPhone}
                />
                <p className="text-sm text-red-500">
                  {fields.clientPhone.errors}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div>
                  <Label>Date</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[280px] text-left justify-start"
                    >
                      <CalendarIcon />
                      {selectedDate ? (
                        new Intl.DateTimeFormat("en-US", {
                          dateStyle: "long",
                        }).format(selectedDate)
                      ) : (
                        <span>Pick a Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => setSelectedDate(date || new Date())}
                      fromDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-red-500">{fields.date.errors}</p>
              </div>
              <div>
                <Label>Invoice Due</Label>
                <Select
                  name={fields.dueDate.name}
                  key={fields.dueDate.key}
                  defaultValue={data.dueDate.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Due Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Due on Reciept</SelectItem>
                    <SelectItem value="15">Net 15</SelectItem>
                    <SelectItem value="30">Net 30</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                <p className="col-span-6">Description</p>
                <p className="col-span-2">Quantity</p>
                <p className="col-span-2">Rate</p>
                <p className="col-span-2">Amount</p>
              </div>
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-6">
                  <Textarea
                    placeholder="Item name and description"
                    name={fields.invoiceItemDescription.name}
                    key={fields.invoiceItemDescription.key}
                    defaultValue={data.invoiceItemDescription}
                  />
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemDescription.errors}
                  </p>
                </div>

                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="0"
                    name={fields.invoiceItemQuantity.name}
                    key={fields.invoiceItemQuantity.key}
                    defaultValue={fields.invoiceItemQuantity.initialValue}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemQuantity.errors}
                  </p>
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="0"
                    name={fields.invoiceItemRate.name}
                    key={fields.invoiceItemRate.key}
                    defaultValue={fields.invoiceItemRate.initialValue}
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemRate.errors}
                  </p>
                </div>
                <div className="col-span-2">
                  <Input
                    disabled
                    value={formatCurrency({
                      amount: calcualteTotal,
                      currency: currency as any,
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-1/3">
                <div className="flex justify-between py-2">
                  <span>Subtotal</span>
                  <span>
                    {" "}
                    {formatCurrency({
                      amount: calcualteTotal,
                      currency: currency as any,
                    })}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <span>Total ({currency})</span>
                  <span className="font-medium underline underline-offest-2">
                    {formatCurrency({
                      amount: calcualteTotal,
                      currency: currency as any,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                placeholder="Additional Notes"
                name={fields.note.name}
                key={fields.note.key}
                defaultValue={data.note ?? undefined}
              />
            </div>
            <p className="text-sm text-red-500">{fields.note.errors}</p>
            <div className="flex items-center justify-end mt-6">
              <div>
                <SubmitButtons text="Update Invoice" />
              </div>
            </div>
          </form>{" "}
        </CardContent>
      </Card>
    </>
  );
}
