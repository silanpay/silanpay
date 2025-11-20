const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: ["payment", "spending", "transfer"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "INR",
        },
        status: {
            type: String,
            enum: ["success", "pending", "failed"],
            default: "pending",
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["food", "shopping", "bills", "transfer", "subscription", "other"],
            default: "other",
        },
        recipientName: String,
        recipientEmail: String,
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
        },
        transactionDate: {
            type: Date,
            default: Date.now,
        },
        metadata: {
            type: Object,
            default: {},
        },
    },
    { timestamps: true }
);

// Indexes for better query performance
TransactionSchema.index({ userId: 1, transactionDate: -1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ type: 1 });

module.exports = mongoose.model("Transaction", TransactionSchema);
