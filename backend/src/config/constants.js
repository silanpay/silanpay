module.exports = {
  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  },

  // User Roles
  USER_ROLES: {
    USER: "user",
    ADMIN: "admin",
  },

  // KYC Status
  KYC_STATUS: {
    PENDING: "pending",
    VERIFIED: "verified",
    REJECTED: "rejected",
  },

  // OTP Settings
  OTP: {
    LENGTH: 6,
    EXPIRY: parseInt(process.env.OTP_EXPIRY) || 300000, // 5 minutes
    MAX_ATTEMPTS: parseInt(process.env.OTP_MAX_ATTEMPTS) || 3,
  },

  // Regex Patterns
  REGEX: {
    EMAIL: /^\S+@\S+\.\S+$/,
    PHONE: /^\d{10}$/,
    AADHAR: /^\d{12}$/,
    PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    PASSWORD: /^.{6,}$/, // Minimum 6 characters
  },

  // JWT
  JWT: {
    EXPIRY: process.env.JWT_EXPIRY || "30d",
    REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "90d",
  },
};
