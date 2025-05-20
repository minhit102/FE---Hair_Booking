import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm token vào mỗi request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("salon-auth");
      const parsedToken = user ? JSON.parse(user) : null;
      if (parsedToken) {
        config.headers.Authorization = `Bearer ${parsedToken.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
