import api from "@/lib/axios";

export async function getCustomers({
  page,
  limit,
  search,
  status,
}: {
  page: number;
  limit: number;
  search: string;
  status: string;
}) {
  try {
    const response = await api.get("/invoices/admin/list-invoice", {
      params: { page, limit, search, status },
    });
    return response.data;
  } catch (error) {
    console.error("Get customers error:", error);
    throw error;
  }
}
