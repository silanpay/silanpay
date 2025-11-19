// API Configuration
const DEFAULT_API_URL = "http://localhost:5000";

const rawApiUrl = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).trim();
const trimmedApiUrl = rawApiUrl.replace(/\/+$/, "");
const apiSuffixRegex = /\/api$/i;
const hasApiSuffix = apiSuffixRegex.test(trimmedApiUrl);

const API_HOST_URL = hasApiSuffix ? trimmedApiUrl.replace(apiSuffixRegex, "") : trimmedApiUrl;
const API_BASE_URL = hasApiSuffix ? trimmedApiUrl : `${trimmedApiUrl}/api`;

export const API_URL = API_HOST_URL;
export const API_BASE = API_BASE_URL;

export const buildApiUrl = (path = "") => {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `${API_BASE}${cleanPath}`;
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER_STEP1: buildApiUrl("/auth/register/step1"),
    REGISTER_VERIFY_OTP: buildApiUrl("/auth/register/verify-otp"),
    REGISTER_RESEND_OTP: buildApiUrl("/auth/register/resend-otp"),
    REGISTER_COMPLETE: buildApiUrl("/auth/register/complete"),
    LOGIN: buildApiUrl("/auth/login"),
    ADMIN_LOGIN: buildApiUrl("/auth/admin-login"),
    FORGOT_PASSWORD: buildApiUrl("/auth/forgot-password"),
    FORGOT_PASSWORD_VERIFY: buildApiUrl("/auth/forgot-password/verify-otp"),
    RESET_PASSWORD: buildApiUrl("/auth/reset-password"),
    ME: buildApiUrl("/auth/me"),
    VERIFY: buildApiUrl("/auth/verify"),
  },
  HEALTH: buildApiUrl("/health"),
};

export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || "SilanPay",
  VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
};

export default { API_URL, API_BASE, API_ENDPOINTS, APP_CONFIG, buildApiUrl };
