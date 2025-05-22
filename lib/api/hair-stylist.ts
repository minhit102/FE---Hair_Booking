import axios from "axios";
import api from "../axios";

interface GetEmployeesParams {
  page?: number;
  limit?: number;
  search?: string;
  position?: string;
  status?: string;
}

interface GetEmployeeParams {
  id: string;
}

export interface Employee {
  id: string;
  username: string;
  email: string;
  phone: string;
  baseSalary: string;
  status: "active" | "inactive";
  imgAvatar: string;
  invoiceCount: number;
}

export interface PaginatedResponse {
  employees: Employee[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export async function getHairStylists({
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
  const response = await api.get("/admin/hair-stylist", {
    params: { page, limit, search, status },
  });
  return response.data;
}

export async function getHairStylistById({ id }: { id: string }) {
  const response = await api.get(`/admin/hair-stylist/${id}/detail`);
  return response.data;
}
