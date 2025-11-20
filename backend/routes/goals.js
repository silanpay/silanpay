const express = require("express");
const Goal = require("../models/Goal");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Apply auth middleware
router.use(verifyToken);

// Get all goals
router.get("/", async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.json({ success: true, goals });
    } catch (error) {
        console.error("Get goals error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Get single goal
router.get("/:id", async (req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }

        res.json({ success: true, goal });
    } catch (error) {
        console.error("Get goal error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Create new goal
router.post("/", async (req, res) => {
    try {
        const { title, targetAmount, deadline, category, description } = req.body;

        if (!title || !targetAmount || !deadline) {
            return res.status(400).json({ success: false, message: "Title, target amount, and deadline are required" });
        }

        const goal = new Goal({
            userId: req.user.id,
            title,
            targetAmount,
            deadline,
            category: category || "other",
            description,
        });

        await goal.save();

        res.json({ success: true, message: "Goal created successfully", goal });
    } catch (error) {
        console.error("Create goal error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Update goal
router.patch("/:id", async (req, res) => {
    try {
        const { title, targetAmount, currentAmount, deadline, status, category, description } = req.body;

        const goal = await Goal.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }

        if (title) goal.title = title;
        if (targetAmount !== undefined) goal.targetAmount = targetAmount;
        if (currentAmount !== undefined) goal.currentAmount = currentAmount;
        if (deadline) goal.deadline = deadline;
        if (status) goal.status = status;
        if (category) goal.category = category;
        if (description !== undefined) goal.description = description;

        // Auto-complete goal if current amount >= target amount
        if (goal.currentAmount >= goal.targetAmount && goal.status === "active") {
            goal.status = "completed";
        }

        await goal.save();

        res.json({ success: true, message: "Goal updated successfully", goal });
    } catch (error) {
        console.error("Update goal error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Add amount to goal
router.patch("/:id/add-amount", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Valid amount is required" });
        }

        const goal = await Goal.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }

        goal.currentAmount += amount;

        // Auto-complete goal if target reached
        if (goal.currentAmount >= goal.targetAmount && goal.status === "active") {
            goal.status = "completed";
        }

        await goal.save();

        res.json({ success: true, message: "Amount added to goal", goal });
    } catch (error) {
        console.error("Add amount to goal error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Delete goal
router.delete("/:id", async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }

        res.json({ success: true, message: "Goal deleted successfully" });
    } catch (error) {
        console.error("Delete goal error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
