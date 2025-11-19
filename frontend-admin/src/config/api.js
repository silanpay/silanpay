// Admin Frontend API Configuration
const DEFAULT_API_URL = "http://localhost:5001";

const rawApiUrl = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).trim();
const trimmedApiUrl = rawApiUrl.replace(/\/+$/, "");
const apiSuffixRegex = /\/api$/i;
const hasApiSuffix = apiSuffixRegex.test(trimmedApiUrl);

export const API_BASE = hasApiSuffix ? trimmedApiUrl : `${trimmedApiUrl}/api`;

export const buildAdminApiUrl = (path = "") => {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `${API_BASE}${cleanPath}`;
};

// Admin API Key from environment
export const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY || "";

// Admin Credentials (for reference only)
export const ADMIN_CONFIG = {
  SECRET: import.meta.env.VITE_ADMIN_SECRET || "",
  EMAIL: import.meta.env.VITE_ADMIN_EMAIL || "",
  USERNAME: import.meta.env.VITE_ADMIN_USERNAME || "admin",
};

export default { API_BASE, buildAdminApiUrl, ADMIN_API_KEY, ADMIN_CONFIG };
