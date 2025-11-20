const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        targetAmount: {
            type: Number,
            required: true,
        },
        currentAmount: {
            type: Number,
            default: 0,
        },
        deadline: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "completed", "cancelled"],
            default: "active",
        },
        category: {
            type: String,
            enum: ["savings", "investment", "purchase", "education", "travel", "other"],
            default: "other",
        },
        description: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// Virtual for progress percentage
GoalSchema.virtual("progress").get(function () {
    return Math.min((this.currentAmount / this.targetAmount) * 100, 100);
});

GoalSchema.set("toJSON", { virtuals: true });
GoalSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Goal", GoalSchema);
