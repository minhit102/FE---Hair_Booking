import type React from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <SidebarNav />
        <main className="flex-1 overflow-y-auto bg-muted/20 pb-16">
          <div className="container py-6 md:py-8">{children}</div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
