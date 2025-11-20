const express = require("express");
const Transaction = require("../models/Transaction");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Apply auth middleware
router.use(verifyToken);

// Get all transactions with filters
router.get("/", async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10, status, type, category, search, startDate, endDate } = req.query;

        const query = { userId };

        // Apply filters
        if (status) query.status = status;
        if (type) query.type = type;
        if (category) query.category = category;
        if (search) {
            query.$or = [
                { description: { $regex: search, $options: "i" } },
                { recipientName: { $regex: search, $options: "i" } },
                { recipientEmail: { $regex: search, $options: "i" } },
            ];
        }
        if (startDate || endDate) {
            query.transactionDate = {};
            if (startDate) query.transactionDate.$gte = new Date(startDate);
            if (endDate) query.transactionDate.$lte = new Date(endDate);
        }

        const transactions = await Transaction.find(query)
            .sort({ transactionDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate("cardId", "last4 cardType");

        const count = await Transaction.countDocuments(query);

        res.json({
            success: true,
            transactions,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            totalTransactions: count,
        });
    } catch (error) {
        console.error("Get transactions error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Get single transaction
router.get("/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user.id,
        }).populate("cardId", "last4 cardType label");

        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        res.json({ success: true, transaction });
    } catch (error) {
        console.error("Get transaction error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Create new transaction
router.post("/", async (req, res) => {
    try {
        const { type, amount, description, category, recipientName, recipientEmail, cardId } = req.body;

        if (!type || !amount || !description) {
            return res.status(400).json({ success: false, message: "Type, amount, and description are required" });
        }

        const transaction = new Transaction({
            userId: req.user.id,
            type,
            amount,
            description,
            category,
            recipientName,
            recipientEmail,
            cardId,
            status: "success", // In real app, this would be 'pending' initially
        });

        await transaction.save();

        res.json({ success: true, message: "Transaction created successfully", transaction });
    } catch (error) {
        console.error("Create transaction error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Update transaction
router.patch("/:id", async (req, res) => {
    try {
        const { description, category, metadata } = req.body;

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        if (description) transaction.description = description;
        if (category) transaction.category = category;
        if (metadata) transaction.metadata = { ...transaction.metadata, ...metadata };

        await transaction.save();

        res.json({ success: true, message: "Transaction updated successfully", transaction });
    } catch (error) {
        console.error("Update transaction error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Delete transaction
router.delete("/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        res.json({ success: true, message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Delete transaction error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
