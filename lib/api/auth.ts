import api from "@/lib/axios";

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}
export interface LoginAdminData {
  email: string;
  password: string;
}

export async function loginAdmin(data: LoginAdminData) {
  try {
    const response = await api.post("/admin/auth/login", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
