const express = require("express");
const Verification = require("../models/Verification");
const User = require("../models/User");
// Assuming there is some admin auth middleware, if not I'll skip for now or use a placeholder
// const verifyAdmin = require("../middlewares/verifyAdmin"); 

const router = express.Router();

// Get all pending verification requests
router.get("/requests", async (req, res) => {
    try {
        // Find verifications where at least one step is 'submitted'
        const pendingVerifications = await Verification.find({
            "steps.status": "submitted"
        }).populate("userId", "name email");

        res.json({ success: true, requests: pendingVerifications });
    } catch (error) {
        console.error("Get verification requests error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Get specific verification details for a user
router.get("/requests/:userId", async (req, res) => {
    try {
        const verification = await Verification.findOne({ userId: req.params.userId })
            .populate("userId", "name email phone");

        if (!verification) {
            return res.status(404).json({ success: false, message: "Verification record not found" });
        }

        res.json({ success: true, verification });
    } catch (error) {
        console.error("Get verification details error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Approve or Reject a step
router.patch("/verify/:userId/:stepNumber", async (req, res) => {
    try {
        const { userId, stepNumber } = req.params;
        const { status, rejectionReason } = req.body; // status: 'verified' or 'rejected'

        if (!["verified", "rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const verification = await Verification.findOne({ userId });

        if (!verification) {
            return res.status(404).json({ success: false, message: "Verification record not found" });
        }

        const stepIndex = verification.steps.findIndex((s) => s.stepNumber === parseInt(stepNumber));

        if (stepIndex === -1) {
            return res.status(404).json({ success: false, message: "Step not found" });
        }

        verification.steps[stepIndex].status = status;

        if (status === "verified") {
            verification.steps[stepIndex].verificationDate = new Date();

            // Update specific flags
            switch (parseInt(stepNumber)) {
                case 1: verification.emailVerified = true; break;
                case 2: verification.businessPanVerified = true; break;
                case 3: verification.businessDetailsVerified = true; break;
                case 4: verification.registrationDetailsVerified = true; break;
                case 5: verification.signatoryDetailsVerified = true; break;
                case 6: verification.bankDetailsVerified = true; break;
                case 7: verification.documentsUploaded = true; break;
                case 8: verification.websiteDetailsVerified = true; break;
                case 9: verification.additionalDetailsVerified = true; break;
            }

            // Logic to move user to next step is handled in User backend, 
            // but here we just mark this step as verified. 
            // The User backend logic checks "currentStep" based on completion.
            // We should probably update currentStep here too if we want to be consistent.

            if (verification.currentStep === parseInt(stepNumber) && verification.currentStep < 9) {
                verification.currentStep += 1;
            }

            if (verification.steps.every((s) => s.status === "verified")) {
                verification.kycCompleted = true;
            }

        } else if (status === "rejected") {
            verification.steps[stepIndex].rejectionReason = rejectionReason;
            // If rejected, we might want to reset the step data? 
            // For now, keep it so user can see what they submitted.
        }

        await verification.save();

        res.json({ success: true, message: `Step ${status}`, verification });
    } catch (error) {
        console.error("Admin verify step error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
