"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Calendar1, HomeIcon, List, Settings, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { schedulerlinks } from "./SchedulerLinks"; // import your sublinks here

export const dashboardlinks = [
  {
    name: "Dashboard",
    href: "/home",
    icon: HomeIcon,
  },
  {
    name: "Invoices",
    href: "/invoices",
    icon: Users2,
  },
  {
    name: "Scheduler",
    href: "/scheduler",
    icon: Calendar1,
    hasSubMenu: true,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: List,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();

  return (
    <>
      {dashboardlinks.map((link) => {
        const isActive = pathname.startsWith(link.href);

        const baseClasses = cn(
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground",
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
        );

        if (link.hasSubMenu) {
          return (
            <DropdownMenu key={link.name}>
              <DropdownMenuTrigger asChild>
                <div className={baseClasses}>
                  <link.icon className="size-4" />
                  {link.name}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 space-y-1 mt-2 ml-2 p-2">
                {schedulerlinks.map((sublink) => (
                  <DropdownMenuItem key={sublink.id} asChild>
                    <Link
                      href={sublink.href}
                      className="flex items-center gap-2 rounded-md px-2 py-1 text-lg hover:bg-muted">
                      <sublink.icon className="size-4 text-muted-foreground" />
                      {sublink.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Link href={link.href} key={link.name} className={baseClasses}>
            <link.icon className="size-4" />
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
