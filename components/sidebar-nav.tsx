"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Scissors,
  Users,
  UserRound,
  Clock,
  UserPlus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/components/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Tổng quan",
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
    label: "Lịch hẹn",
  },
  {
    title: "CustomerRegistration",
    href: "/customer-registration",
    icon: UserPlus,
    label: "Đăng ký khách hàng",
  },
  {
    title: "Employees",
    href: "/employees",
    icon: Users,
    label: "Nhân viên",
  },
  {
    title: "Services",
    href: "/services",
    icon: Scissors,
    label: "Dịch vụ",
  },
  {
    title: "Revenue",
    href: "/revenue",
    icon: CreditCard,
    label: "Doanh thu",
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Clock,
    label: "Lịch làm việc",
  },
  {
    title: "Customers",
    href: "/customers",
    icon: UserRound,
    label: "Khách hàng",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    label: "Cài đặt",
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen border-r bg-background">
      <div className="flex w-64 flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Scissors className="h-6 w-6" />
            <span>Salon Manager</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                className={cn(
                  "flex h-10 justify-start gap-2",
                  pathname.startsWith(item.href)
                    ? "bg-secondary"
                    : "hover:bg-muted"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {user?.name || "Admin"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.branch || "Chi nhánh Quận 1"}
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Cài đặt tài khoản</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
