import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL + "/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");
    const token = auth && JSON.parse(auth)?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🚨 401 Unauthorized - Token expired or invalid");

      localStorage.removeItem("auth");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
