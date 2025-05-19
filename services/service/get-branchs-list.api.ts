import api from "@/lib/axios";

export const getBranchsList = async () => {
  try {
    const response = await api.get("/branchs");
    return response.data;
  } catch (error) {
    console.error("Get branchs list error:", error);
    throw error;
  }
};
