import api from "@/lib/axios";

interface Appointment {
  id: string;
  username: string;
  phone: string;
  date: string;
  service: string;
  status: string;
  notes: string;
}

interface PaginatedResponse {
  appointments: Appointment[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export async function getAppointments({
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
  const response = await api.get("/admin/appointments", {
    params: { page, limit, search, status },
  });
  return response.data;
}

export async function updateAppointmentStatus(id: string, status: string) {
  const response = await api.put(`/admin/appointments/${id}/status`, {
    status,
  });
  return response.data;
}
