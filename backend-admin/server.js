require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const adminRoutes = require("./routes/admin");
const verificationRoutes = require("./routes/verification");

const app = express();

// Security Middleware
app.use(helmet());

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 1000),
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// Body Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected (Admin Backend)"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/verification", verificationRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SilanPay Admin API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Root
app.get("/", (req, res) => {
  res.json({
    name: "SilanPay Admin API",
    version: process.env.APP_VERSION || "1.0.0",
    status: "running",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start Server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log("");
  console.log("============================================");
  console.log(`   SilanPay Admin Backend - Port ${PORT}`);
  console.log("============================================");
  console.log("");
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log("");
  console.log("API Endpoints:");
  console.log("  POST   /api/admin/login");
  console.log("  GET    /api/admin/me");
  console.log("  GET    /api/admin/stats");
  console.log("  GET    /api/admin/users");
  console.log("  GET    /api/admin/users/:id");
  console.log("  PATCH  /api/admin/users/:id");
  console.log("  PATCH  /api/admin/users/:id/toggle-status");
  console.log("  DELETE /api/admin/users/:id");
  console.log("");
  console.log("============================================");
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
});

module.exports = app;
