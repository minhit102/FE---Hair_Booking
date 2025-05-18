"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { loginAdmin } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await loginAdmin({
        email: formData.email,
        password: formData.password,
      });

      if (response.statusCode == 200) {
        // Set mock auth token in localStorage
        localStorage.setItem(
          "salon-auth",
          JSON.stringify({
            user: {
              id: response.data?.id,
              name: response.data?.username,
              email: formData.email,
              role: "Admin",
              branchId: response.data?.branchId,
              branchName: response.data?.branchName,
            },
            token: response.data?.accessToken,
          })
        );
        document.cookie = `salon-auth=true; path=/; max-age=${
          60 * 60 * 24 * 7
        }`;

        toast.success("Đăng nhập thành công", {
          description: "Chào mừng bạn quay trở lại hệ thống quản lý salon.  ",
        });

        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 300);
      } else {
        toast.error("Đăng nhập thất bại", {
          description: "Email hoặc mật khẩu không chính xác. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi", {
        description: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Scissors className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Salon Manager</h1>
          <p className="text-muted-foreground">
            Hệ thống quản lý salon chuyên nghiệp
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Đăng nhập</CardTitle>
            <CardDescription>
              Nhập thông tin đăng nhập để truy cập hệ thống
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Chưa có tài khoản?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Liên hệ quản trị viên
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
