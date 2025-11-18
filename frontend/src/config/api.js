// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER_STEP1: `${API_URL}/api/auth/register/step1`,
    REGISTER_VERIFY_OTP: `${API_URL}/api/auth/register/verify-otp`,
    REGISTER_RESEND_OTP: `${API_URL}/api/auth/register/resend-otp`,
    REGISTER_COMPLETE: `${API_URL}/api/auth/register/complete`,
    LOGIN: `${API_URL}/api/auth/login`,
    ADMIN_LOGIN: `${API_URL}/api/auth/admin-login`,
    FORGOT_PASSWORD: `${API_URL}/api/auth/forgot-password`,
    FORGOT_PASSWORD_VERIFY: `${API_URL}/api/auth/forgot-password/verify-otp`,
    RESET_PASSWORD: `${API_URL}/api/auth/reset-password`,
    ME: `${API_URL}/api/auth/me`,
    VERIFY: `${API_URL}/api/auth/verify`,
  },
  // Health check
  HEALTH: `${API_URL}/api/health`,
};

export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || "SilanPay",
  VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
};

export default { API_URL, API_ENDPOINTS, APP_CONFIG };
