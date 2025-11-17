const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const verifyApiKey = require("./middlewares/verifyApiKey");

const app = express();

// Security + CORS
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.FRONTEND_URL, process.env.ADMIN_URL]
        : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Rate Limiter for /api
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes); // public auth routes (login, register, admin-login)
app.use("/api/admin", verifyApiKey, adminRoutes); // protected admin routes require x-api-key and JWT via middlewares inside adminRoutes

// Root hidden
app.get("/", (req, res) => res.status(404).json({ message: "Not Found" }));

// Health (secured by API key)
app.get("/health", verifyApiKey, (req, res) =>
  res.json({ status: "OK", timestamp: new Date().toISOString(), uptime: process.uptime() })
);

// 404
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
