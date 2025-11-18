const jwt = require("jsonwebtoken");
const { HTTP_STATUS } = require("../config/constants");

/**
 * Verify JWT Token Middleware
 */
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Invalid token.",
      });
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Token verification failed.",
    });
  }
};

/**
 * Admin Only Middleware
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
};

/**
 * Verify API Key Middleware
 */
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "API key is required",
    });
  }

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
};

module.exports = { verifyToken, adminOnly, verifyApiKey };
