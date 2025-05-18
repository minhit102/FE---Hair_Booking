"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAdmin } from "@/lib/api/auth";

// Define the type for the user
type User = {
  name: string;
  email: string;
  role: "super_admin" | "admin" | "assistant" | "staff";
  branchId: string;
  branchName: string;
};

// Define the type for the auth context
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if the user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Get the auth data from localStorage
        const authData = localStorage.getItem("salon-auth");

        if (authData) {
          const { user } = JSON.parse(authData);
          setUser(user);

          // Set a cookie for the middleware to use
          document.cookie = `salon-auth=true; path=/; max-age=${
            60 * 60 * 24 * 7
          }`; // 7 days
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await loginAdmin({
        email,
        password,
      });
      if (response.statusCode === 200) {
        // Set mock auth token in localStorage
        localStorage.setItem(
          "salon-auth",
          JSON.stringify({
            user: {
              id: response.data?.data?.id,
              name: response.data?.data?.username,
              email: email,
              role: "Admin",
              branch: response.data?.data?.branchName,
              branchId: response.data?.data?.branchId,
            },
            token: response.data?.accessToken,
          })
        );
        document.cookie = `salon-auth=true; path=/; max-age=${
          60 * 60 * 24 * 7
        }`; // 7 days

        toast.success("Đăng nhập thành công", {
          description: "Chào mừng bạn quay trở lại hệ thống quản lý salon.",
        });

        return true;
      } else {
        toast.error("Đăng nhập thất bại", {
          description: "Email hoặc mật khẩu không chính xác. Vui lòng thử lại.",
        });
        return false;
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi", {
        description: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear user from state
    setUser(null);

    // Clear auth data from localStorage
    localStorage.removeItem("salon-auth");

    // Clear the cookie
    document.cookie = "salon-auth=; path=/; max-age=0";

    // Redirect to login page
    router.push("/login");

    toast.success("Đăng xuất thành công", {
      description: "Bạn đã đăng xuất khỏi hệ thống.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
