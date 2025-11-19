require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const verifyApiKey = require("./middlewares/verifyApiKey");

const app = express();

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
  message: "Too many requests, please try again later.",
});
app.use("/api/", limiter);

// Body Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", verifyApiKey, adminRoutes);

// Health Check
app.get("/api/health", (req, res) =>
  res.json({
    success: true,
    message: "SilanPay API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  })
);

// Root Route
app.get("/", (req, res) =>
  res.json({
    name: "SilanPay API",
    version: "1.0.0",
    status: "active",
  })
);

// 404 Handler
app.use((req, res) =>
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  })
);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log("🚀 SilanPay API Server");
  console.log("=".repeat(50));
  console.log(`📍 Running on: http://${HOST}:${PORT}`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`✅ Health Check: http://${HOST}:${PORT}/api/health`);
  console.log(`📡 Auth API: http://${HOST}:${PORT}/api/auth/*`);
  console.log(`👨‍💼 Admin API: http://${HOST}:${PORT}/api/admin/*`);
  console.log("=".repeat(50) + "\n");
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  app.close(() => {
    console.log("HTTP server closed");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
});

module.exports = app;
