"use client";

import { cn } from "@/lib/utils";
import {
  Calendar1,
  HomeIcon,
  List,
  Settings,
  Settings2,
  Users2,
} from "lucide-react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const dashboardlinks = [
  {
    id: nanoid(),
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: nanoid(),
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2,
  },
  {
    id: nanoid(),
    name: "Scheduler",
    href: "/dashboard/scheduler",
    icon: Calendar1,
  },
  {
    id: nanoid(),
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: List,
  },
  {
    id: nanoid(),
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();
  return (
    <>
      {dashboardlinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
          href={link.href}
          key={link.id}>
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
}
