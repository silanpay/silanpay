const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        kycCompleted: {
            type: Boolean,
            default: false,
        },
        currentStep: {
            type: Number,
            default: 1,
            min: 1,
            max: 9,
        },
        steps: {
            type: [
                {
                    stepNumber: Number,
                    stepName: String,
                    status: {
                        type: String,
                        enum: ["pending", "submitted", "verified", "rejected"],
                        default: "pending",
                    },
                    submissionDate: Date,
                    verificationDate: Date,
                    rejectionReason: String,
                    data: mongoose.Schema.Types.Mixed, // Store submitted data for that step
                },
            ],
            default: [
                { stepNumber: 1, stepName: "Email Verification", status: "pending" },
                { stepNumber: 2, stepName: "Business PAN", status: "pending" },
                { stepNumber: 3, stepName: "Business Details", status: "pending" },
                { stepNumber: 4, stepName: "Business Registration Details", status: "pending" },
                { stepNumber: 5, stepName: "Authorised Signatory Details", status: "pending" },
                { stepNumber: 6, stepName: "Bank Account Details", status: "pending" },
                { stepNumber: 7, stepName: "Upload Business Documents", status: "pending" },
                { stepNumber: 8, stepName: "Website Details", status: "pending" },
                { stepNumber: 9, stepName: "Additional details", status: "pending" },
            ],
        },
    },
    { timestamps: true }
);

// Virtual for completion percentage
VerificationSchema.virtual("completionPercent").get(function () {
    const verifiedSteps = this.steps.filter((s) => s.status === "verified").length;
    return Math.round((verifiedSteps / this.steps.length) * 100);
});

VerificationSchema.set("toJSON", { virtuals: true });
VerificationSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Verification", VerificationSchema);
