const express = require("express");
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");
const adminOnly = require("../middlewares/adminOnly");

const router = express.Router();

// Apply middleware to all admin routes
router.use(verifyToken);
router.use(adminOnly);

// Get All Users
router.get("/users", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", role = "" } = req.query;
    const query = {};
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];
    }
    if (role) query.role = role;

    const users = await User.find(query).select("-password").sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit).exec();
    const count = await User.countDocuments(query);

    res.json({ users, totalPages: Math.ceil(count / limit), currentPage: Number(page), totalUsers: count });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get Dashboard Stats
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const activeUsers = await User.countDocuments({ role: "user", isActive: true });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsers = await User.countDocuments({ role: "user", createdAt: { $gte: thirtyDaysAgo } });

    const recentUsers = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 }).limit(5);

    const sixMonthsAgo = new Date(); sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const usersByMonth = await User.aggregate([
      { $match: { role: "user", createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json({ totalUsers, activeUsers, totalAdmins, newUsers, recentUsers, usersByMonth });
  } catch (error) {
    console.error("Get Stats Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get Single User
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Toggle User Status
router.patch("/users/:id/toggle-status", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user._id.toString() === req.user.id) return res.status(400).json({ message: "Cannot deactivate your own account" });

    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: `User ${user.isActive ? "activated" : "deactivated"} successfully`, user: { id: user._id, name: user.name, email: user.email, isActive: user.isActive } });
  } catch (error) {
    console.error("Toggle Status Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete User
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user._id.toString() === req.user.id) return res.status(400).json({ message: "Cannot delete your own account" });
    if (user.role === "admin") return res.status(403).json({ message: "Cannot delete admin accounts" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update User
router.patch("/users/:id", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role && ["user", "admin"].includes(role)) {
      if (user._id.toString() === req.user.id) return res.status(400).json({ message: "Cannot change your own role" });
      user.role = role;
    }

    await user.save();
    res.json({ message: "User updated successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
