require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, postman, etc.)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ============================================
// ROUTES
// ============================================

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION,
  });
});

// API routes
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: `Welcome to ${process.env.APP_NAME || "SilanPay"} API`,
    version: process.env.APP_VERSION || "1.0.0",
    docs: "/api/health",
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ============================================
// SERVER START
// ============================================

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log("\n" + "=".repeat(60));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔒 Environment: ${process.env.NODE_ENV}`);
      console.log(`📍 API URL: http://${HOST}:${PORT}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
      console.log(`👨‍💼 Admin URL: ${process.env.ADMIN_URL}`);
      console.log("=".repeat(60) + "\n");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;
