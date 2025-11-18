const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/auth");

// Public routes
router.post("/register/step1", authController.registerStep1);
router.post("/register/verify-otp", authController.verifyOTP);
router.post("/register/resend-otp", authController.resendOTP);
router.post("/register/complete", authController.completeRegistration);

router.post("/login", authController.login);
router.post("/admin-login", authController.adminLogin);

router.post("/forgot-password", authController.forgotPassword);
router.post("/forgot-password/verify-otp", authController.verifyResetOTP);
router.post("/reset-password", authController.resetPassword);

// Protected routes
router.get("/me", verifyToken, authController.getCurrentUser);
router.get("/verify", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
