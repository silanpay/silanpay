const express = require("express");
const Verification = require("../models/Verification");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Apply auth middleware
router.use(verifyToken);

// Get user verification status
router.get("/status", async (req, res) => {
    try {
        let verification = await Verification.findOne({ userId: req.user.id });

        if (!verification) {
            verification = new Verification({ userId: req.user.id });
            await verification.save();
        }

        res.json({ success: true, verification });
    } catch (error) {
        console.error("Get verification status error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Submit data for a step (User Action)
router.post("/submit/:stepNumber", async (req, res) => {
    try {
        const { stepNumber } = req.params;
        const { data } = req.body;

        const verification = await Verification.findOne({ userId: req.user.id });

        if (!verification) {
            return res.status(404).json({ success: false, message: "Verification record not found" });
        }

        const stepIndex = verification.steps.findIndex((s) => s.stepNumber === parseInt(stepNumber));

        if (stepIndex === -1) {
            return res.status(404).json({ success: false, message: "Step not found" });
        }

        // Update step with submitted data and change status to 'submitted'
        verification.steps[stepIndex].data = data;
        verification.steps[stepIndex].status = "submitted";
        verification.steps[stepIndex].submissionDate = new Date();
        verification.steps[stepIndex].rejectionReason = null; // Clear any previous rejection

        await verification.save();

        res.json({
            success: true,
            message: "Step submitted for verification",
            verification
        });
    } catch (error) {
        console.error("Submit verification step error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Admin Verify Step (Simulated for now, normally would be in admin routes)
router.patch("/admin/verify/:userId/:stepNumber", async (req, res) => {
    try {
        const { userId, stepNumber } = req.params;
        const { status, rejectionReason } = req.body; // status: 'verified' or 'rejected'

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

            // Move to next step if verified
            if (verification.currentStep === parseInt(stepNumber) && verification.currentStep < 9) {
                verification.currentStep += 1;
            }

            // Check if all steps verified
            if (verification.steps.every((s) => s.status === "verified")) {
                verification.kycCompleted = true;
            }
        } else if (status === "rejected") {
            verification.steps[stepIndex].rejectionReason = rejectionReason;
        }

        await verification.save();

        res.json({ success: true, message: `Step ${status}`, verification });
    } catch (error) {
        console.error("Admin verify step error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
