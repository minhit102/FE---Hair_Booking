import api from "@/lib/axios";

interface AppointmentData {
  branchId: string;
  serviceId: string;
  phone: string;
  date: Date;
  notes?: string;
  username?: string;
}

export const statusAppointment = {
  ALL: "all",
  ACCEPTED: "accepted",
  CANCELLED: "cancelled",
  UPCOMING: "upcoming",
};

export const createAppointment = async (data: AppointmentData) => {
  const response = await api.post("/appointments", data);
  return response;
};

export const getAppointments = async ({ status }: { status: string }) => {
  const response = await api.get("/appointments", {
    params: {
      status: status,
    },
  });
  return response;
};
