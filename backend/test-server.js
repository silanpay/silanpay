const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.post("/api/auth/register/step1", (req, res) => {
  console.log("✅ Request received:", req.body);
  res.json({
    success: true,
    message: "Test successful",
    email: req.body.email,
  });
});

app.get("/test", (req, res) => {
  res.json({ message: "Server is running" });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🧪 Test server running on port ${PORT}`);
});
