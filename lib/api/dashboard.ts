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

export async function getRevenue() {
  try {
    const response = await api.get("/admin/dashboard/change-revenue");
    return response.data;
  } catch (error) {
    console.error("Revenue error:", error);
    throw error;
  }
}
