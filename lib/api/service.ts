import api from "@/lib/axios";

export async function getService() {
  try {
    const response = await api.get("/admin/service");
    return response.data;
  } catch (error) {
    console.error("Get service error:", error);
    throw error;
  }
}
