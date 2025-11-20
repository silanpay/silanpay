const express = require("express");
const Card = require("../models/Card");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Apply auth middleware
router.use(verifyToken);

// Get all user cards
router.get("/", async (req, res) => {
    try {
        const cards = await Card.find({ userId: req.user.id }).select("-cardNumber -cvv");

        res.json({ success: true, cards });
    } catch (error) {
        console.error("Get cards error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Get single card
router.get("/:id", async (req, res) => {
    try {
        const card = await Card.findOne({
            _id: req.params.id,
            userId: req.user.id,
        }).select("-cardNumber -cvv");

        if (!card) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }

        res.json({ success: true, card });
    } catch (error) {
        console.error("Get card error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Add new card
router.post("/", async (req, res) => {
    try {
        const { cardType, cardNumber, cardHolder, expiryDate, cvv, label, balance, limit } = req.body;

        if (!cardType || !cardNumber || !cardHolder || !expiryDate || !cvv) {
            return res.status(400).json({ success: false, message: "All card fields are required" });
        }

        // Validate card number (basic validation)
        if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
            return res.status(400).json({ success: false, message: "Invalid card number" });
        }

        const last4 = cardNumber.slice(-4);

        const card = new Card({
            userId: req.user.id,
            cardType,
            cardNumber: cardNumber.replace(/\s/g, ""),
            last4,
            cardHolder,
            expiryDate,
            cvv,
            label: label || "My Card",
            balance: balance || 0,
            limit: limit || 100000,
        });

        await card.save();

        // Return card without sensitive data
        const cardResponse = card.toObject();
        delete cardResponse.cardNumber;
        delete cardResponse.cvv;

        res.json({ success: true, message: "Card added successfully", card: cardResponse });
    } catch (error) {
        console.error("Add card error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Update card
router.patch("/:id", async (req, res) => {
    try {
        const { label, limit, balance } = req.body;

        const card = await Card.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!card) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }

        if (label) card.label = label;
        if (limit !== undefined) card.limit = limit;
        if (balance !== undefined) card.balance = balance;

        await card.save();

        const cardResponse = card.toObject();
        delete cardResponse.cardNumber;
        delete cardResponse.cvv;

        res.json({ success: true, message: "Card updated successfully", card: cardResponse });
    } catch (error) {
        console.error("Update card error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Toggle card status (activate/disable/freeze)
router.patch("/:id/toggle-status", async (req, res) => {
    try {
        const { status } = req.body;

        if (!["active", "disabled", "frozen"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const card = await Card.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!card) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }

        card.status = status;
        await card.save();

        const cardResponse = card.toObject();
        delete cardResponse.cardNumber;
        delete cardResponse.cvv;

        res.json({ success: true, message: `Card ${status} successfully`, card: cardResponse });
    } catch (error) {
        console.error("Toggle card status error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Delete card
router.delete("/:id", async (req, res) => {
    try {
        const card = await Card.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!card) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }

        res.json({ success: true, message: "Card deleted successfully" });
    } catch (error) {
        console.error("Delete card error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
