import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider"; // 👈 Thêm AuthProvider ở đây
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hair Salon Management",
  description: "A modern hair salon management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {" "}
          {/* 👈 Bọc children ở đây */}
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
