const mongoose = require("mongoose");
const crypto = require("crypto");

const CardSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        cardType: {
            type: String,
            enum: ["debit", "credit", "virtual"],
            required: true,
        },
        cardNumber: {
            type: String,
            required: true,
            select: false, // Don't return in queries by default
        },
        last4: {
            type: String,
            required: true,
        },
        cardHolder: {
            type: String,
            required: true,
        },
        expiryDate: {
            type: String,
            required: true,
        },
        cvv: {
            type: String,
            required: true,
            select: false, // Don't return in queries by default
        },
        balance: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["active", "disabled", "frozen"],
            default: "active",
        },
        limit: {
            type: Number,
            default: 100000,
        },
        label: {
            type: String,
            default: "My Card",
        },
    },
    { timestamps: true }
);

// Encrypt card number before saving
CardSchema.pre("save", function (next) {
    if (this.isModified("cardNumber") && this.cardNumber) {
        // Simple encryption - in production use proper encryption
        const cipher = crypto.createCipher("aes-256-cbc", process.env.CARD_ENCRYPTION_KEY || "secret-key");
        let encrypted = cipher.update(this.cardNumber, "utf8", "hex");
        encrypted += cipher.final("hex");
        this.cardNumber = encrypted;
    }
    next();
});

// Method to decrypt card number
CardSchema.methods.getDecryptedCardNumber = function () {
    try {
        const decipher = crypto.createDecipher("aes-256-cbc", process.env.CARD_ENCRYPTION_KEY || "secret-key");
        let decrypted = decipher.update(this.cardNumber, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    } catch (error) {
        return null;
    }
};

module.exports = mongoose.model("Card", CardSchema);
