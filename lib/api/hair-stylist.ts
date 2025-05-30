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
  salaryBase: number;
  status: "active" | "inactive";
  imgAvatar: string;
  invoiceCount: number;
}

export interface UpdateEmployeeParams {
  id: string;
  username: string;
  email: string;
  phone: string;
  salaryBase: number;
  status: "active" | "inactive";
}

export interface PaginatedResponse {
  employees: Employee[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface CreateEmployeeParams {
  username: string;
  email: string;
  phone: string;
  salaryBase: number;
  status: "active" | "inactive";
  password: string;
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

export const updateHairStylist = async (params: UpdateEmployeeParams) => {
  const response = await api.put(`/admin/hair-stylist/${params.id}`, {
    username: params.username,
    email: params.email,
    phone: params.phone,
    salaryBase: params.salaryBase,
    status: params.status,
  });
  return response.data;
};

export const deleteHairStylist = async (id: string) => {
  const response = await api.delete(`/admin/hair-stylist/${id}`);
  return response.data;
};

export const createHairStylist = async (params: CreateEmployeeParams) => {
  const response = await api.post("/admin/hair-stylist", params);
  return response.data;
};

export const getReviewsByStylistId = async ({ id }: { id: string }) => {
  const response = await api.get(`/reviews/hair-stylist/${id}`);
  return response.data;
};
