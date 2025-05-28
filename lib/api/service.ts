import api from "@/lib/axios";

export interface Service {
  _id: string;
  id: number;
  name: string;
  price: number;
  duration: number;
  image: string;
  popular: boolean;
  isActive: boolean;
  category?: string;
}

export interface UpdateServiceParams {
  id: string;
  name: string;
  price: number;
  duration: number;
  image: string;
  popular: boolean;
  isActive: boolean;
}

export async function getService() {
  try {
    const response = await api.get("/admin/service");
    return response.data;
  } catch (error) {
    console.error("Get service error:", error);
    throw error;
  }
}

export const updateService = async (params: UpdateServiceParams) => {
  try {
    const response = await api.put(`/admin/service/${params.id}`, {
      name: params.name,
      price: params.price,
      duration: params.duration,
      popular: params.popular,
      isActive: params.isActive,
      image: params.image,
    });
    return response.data;
  } catch (error) {
    console.error("Update service error:", error);
    throw error;
  }
};

export const deleteService = async (id: string) => {
  try {
    const response = await api.delete(`/admin/service/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete service error:", error);
    throw error;
  }
};
