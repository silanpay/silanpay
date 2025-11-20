import axios from "axios";
import { API_BASE } from "../config/api";
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token and API key
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add API key for admin routes
    if (config.url.includes("/admin/") && ADMIN_API_KEY) {
      config.headers["x-api-key"] = ADMIN_API_KEY;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/admin/login", credentials),
  getMe: () => api.get("/admin/me"),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get("/admin/stats"),
  getUsers: (params) => api.get("/admin/users", { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.patch(`/admin/users/${id}`, data),
  toggleUserStatus: (id) => api.patch(`/admin/users/${id}/toggle-status`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

// Verification API
export const verificationAPI = {
  getRequests: () => api.get("/admin/verification/requests"),
  getUserVerification: (userId) => api.get(`/admin/verification/requests/${userId}`),
  verifyStep: (userId, stepNumber, data) =>
    api.patch(`/admin/verification/verify/${userId}/${stepNumber}`, data),
};

export default api;
