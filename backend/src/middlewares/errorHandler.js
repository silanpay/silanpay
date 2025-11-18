const { HTTP_STATUS } = require("../config/constants");

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Validation Error",
      errors,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Default error
  res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * 404 Not Found Handler
 */
const notFound = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

module.exports = { errorHandler, notFound };
