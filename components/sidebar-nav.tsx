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
    title: "Customers",
    href: "/customers",
    icon: UserRound,
    label: "Thống kê đơn hàng",
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
    <>
      <div className="fixed top-0 left-0 flex h-screen border-r bg-blue-900">
        <div className="flex w-64 flex-col">
          <div className="sticky top-0 flex h-14 items-center border-b border-blue-950 px-4 bg-slate-950">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-slate-100"
            >
              <Scissors className="h-6 w-6 text-blue-400" />
              <span>Salon Manager</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-2">
            <nav className="grid gap-1 px-2">
              {sidebarNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={
                    pathname.startsWith(item.href) ? "secondary" : "ghost"
                  }
                  className={cn(
                    "flex h-10 justify-start gap-2 text-white",
                    pathname.startsWith(item.href)
                      ? "bg-blue-700 text-white hover:bg-blue-600"
                      : "hover:bg-blue-800 hover:text-white"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon
                      className={cn(
                        "h-4 w-4",
                        pathname.startsWith(item.href)
                          ? "text-blue-200"
                          : "text-blue-300"
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
            </nav>
          </ScrollArea>
          <div className="mt-auto border-t border-blue-800 p-4 bg-blue-950">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 hover:bg-blue-800 p-2 rounded-md">
                  <div className="h-8 w-8 rounded-full bg-blue-700" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {user?.name || "Admin"}
                    </span>
                    <span className="text-xs text-blue-300">
                      {user?.branchName || "AdminAdmin"}
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
      <div className="pl-64">{/* Main content will be rendered here */}</div>
    </>
  );
}
