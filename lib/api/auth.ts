import axios from "axios";

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export async function registerUser(data: RegisterUserData) {
  const response = await axios.post("/auth/register", data);
  return response.data;
}
