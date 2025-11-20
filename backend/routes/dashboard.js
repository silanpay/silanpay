const express = require("express");
const Transaction = require("../models/Transaction");
const Card = require("../models/Card");
const Goal = require("../models/Goal");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Apply auth middleware to all routes
router.use(verifyToken);

// Get Dashboard Overview Stats
router.get("/stats", async (req, res) => {
    try {
        const userId = req.user.id;

        // Get total balance from all active cards
        const cards = await Card.find({ userId, status: "active" });
        const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);

        // Get current month transactions
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const monthlyTransactions = await Transaction.find({
            userId,
            transactionDate: { $gte: startOfMonth, $lte: endOfMonth },
            status: "success",
        });

        const monthlySpending = monthlyTransactions
            .filter((t) => t.type === "spending")
            .reduce((sum, t) => sum + t.amount, 0);

        const monthlyIncome = monthlyTransactions
            .filter((t) => t.type === "payment")
            .reduce((sum, t) => sum + t.amount, 0);

        // Get active goals
        const activeGoals = await Goal.countDocuments({ userId, status: "active" });

        // Calculate changes (mock data for now - can be calculated from previous month)
        const stats = {
            balance: totalBalance,
            balanceChange: 8.2,
            spending: monthlySpending,
            spendingChange: -2.1,
            income: monthlyIncome,
            incomeChange: 12.5,
            goals: activeGoals,
            goalsChange: 3,
        };

        res.json({ success: true, stats });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Get Analytics Data
router.get("/analytics", async (req, res) => {
    try {
        const userId = req.user.id;
        const { range = "month" } = req.query;

        let startDate;
        if (range === "year") {
            startDate = new Date(new Date().getFullYear(), 0, 1);
        } else {
            startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        }

        const transactions = await Transaction.find({
            userId,
            transactionDate: { $gte: startDate },
            status: "success",
        }).sort({ transactionDate: 1 });

        // Group by month
        const monthlyData = {};
        transactions.forEach((t) => {
            const month = new Date(t.transactionDate).getMonth();
            if (!monthlyData[month]) {
                monthlyData[month] = { earnings: 0, expenses: 0 };
            }
            if (t.type === "payment") {
                monthlyData[month].earnings += t.amount;
            } else if (t.type === "spending") {
                monthlyData[month].expenses += t.amount;
            }
        });

        // Category breakdown
        const categoryBreakdown = {};
        transactions
            .filter((t) => t.type === "spending")
            .forEach((t) => {
                categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + t.amount;
            });

        res.json({
            success: true,
            analytics: {
                monthlyData,
                categoryBreakdown,
                totalEarnings: transactions.filter((t) => t.type === "payment").reduce((sum, t) => sum + t.amount, 0),
                totalExpenses: transactions.filter((t) => t.type === "spending").reduce((sum, t) => sum + t.amount, 0),
            },
        });
    } catch (error) {
        console.error("Analytics error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Get Recent Activity
router.get("/recent-activity", async (req, res) => {
    try {
        const userId = req.user.id;
        const limit = parseInt(req.query.limit) || 5;

        const recentTransactions = await Transaction.find({ userId })
            .sort({ transactionDate: -1 })
            .limit(limit)
            .select("type description amount transactionDate status");

        res.json({ success: true, transactions: recentTransactions });
    } catch (error) {
        console.error("Recent activity error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
