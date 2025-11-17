const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "Name, email and password are required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Email already registered" });

    const user = new User({ name, email, password, phone, role: "user" });
    if (user.generateApiKey) user.generateApiKey();
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({ success: true, message: "Registration successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Login (user)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
    if (!user.isActive) return res.status(403).json({ success: false, message: "Account is deactivated" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.json({ success: true, message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Admin Login (public route)
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password, adminCode } = req.body;
    if (!email || !password || !adminCode) return res.status(400).json({ success: false, message: "All fields are required" });

    // Use ADMIN_SECRET env var
    if (adminCode !== process.env.ADMIN_SECRET) return res.status(403).json({ message: "Invalid admin secret code" });

    const admin = await User.findOne({ email, role: "admin" }).select("+password");
    if (!admin) return res.status(401).json({ success: false, message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({ success: true, message: "Admin login successful", token, user: { id: admin._1d, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Get current user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Verify token
router.get("/verify", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.error("Verify Token Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
