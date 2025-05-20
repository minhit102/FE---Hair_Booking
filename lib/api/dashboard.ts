import api from "@/lib/axios";

export async function getDashboardData() {
  try {
    const response = await api.get("/admin/dashboard");
    return response.data;
  } catch (error) {
    console.error("Dashboard data error:", error);
    throw error;
  }
}
