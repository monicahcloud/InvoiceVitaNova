"use client";

import { cn } from "@/lib/utils";
import {
  Calendar1,
  CalendarCheck,
  Clock,
  Settings,
  Users2,
} from "lucide-react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const schedulerlinks = [
  {
    id: nanoid(),
    name: "Event Types",
    href: "/scheduler/eventTypes",
    icon: Clock,
  },
  {
    id: nanoid(),
    name: "Meetings",
    href: "/scheduler/meetings",
    icon: Users2,
  },
  {
    id: nanoid(),
    name: "Availability",
    href: "/scheduler/availability",
    icon: CalendarCheck,
  },
];

export function SchedulerLinks() {
  const pathname = usePathname();
  return (
    <>
      {schedulerlinks.map((link) => (
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
