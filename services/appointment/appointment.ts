import api from "@/lib/axios";

interface AppointmentData {
  branchId: string;
  serviceId: string;
  phone: string;
  date: Date;
  notes?: string;
  username?: string;
}
export const createAppointment = async (data: AppointmentData) => {
  const response = await api.post("/appointments", data);
  return response;
};

export const getAppointments = async () => {
  try {
    const response = await api.get("/appointments");
    return response.data;
  } catch (error) {
    console.error("Get appointments error:", error);
    throw error;
  }
};
