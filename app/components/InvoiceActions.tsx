"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  CheckCircle,
  DownloadCloud,
  Mail,
  MoreHorizontal,
  PencilIcon,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface iAppProps {
  id: string;
  status: string;
}
export function InvoiceActions({ id, status }: iAppProps) {
  const handleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending reminder email...",
        success: "Reminder email sent successfully",
        error: "Failed to send remainder email.",
      }
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/invoices/${id}`}>
            <PencilIcon className="size-4 mr-2" />
            Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <DownloadCloud className="size-4 mr-2" />
            Download
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Mail className="size-4 mr-2" />
          Reminder Email
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/invoices/${id}/delete`}>
            <Trash className="size-4 mr-2" />
            Delete Invoice
          </Link>
        </DropdownMenuItem>
        {status !== "PAID" && (
          <DropdownMenuItem asChild>
            <Link href={`/invoices/${id}/paid`}>
              <CheckCircle className="size-4 mr-2" />
              Mark as Paid
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
