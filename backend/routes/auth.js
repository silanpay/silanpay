// server/routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Configure nodemailer
// Accept either EMAIL_PASS or EMAIL_PASSWORD env names
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || "your-app-password",
  },
});

// In-memory OTP store (DEV only — use Redis in production)
const otpStore = new Map();

const normalizeEmail = (email) => (typeof email === "string" ? email.trim().toLowerCase() : "");
const getResetOtpKey = (email) => `reset_${normalizeEmail(email)}`;

/* ---------------- Step 1: Initial Registration - Send OTP ---------------- */
router.post("/register/step1", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash password before storing in OTP store (do not store plaintext)
    const passwordHash = await bcrypt.hash(password, 10);

    // Store OTP with 5 minute expiry and hashed password
    otpStore.set(email, {
      otp,
      passwordHash, // hashed password
      expiresAt: Date.now() + 5 * 60 * 1000,
      verified: false,
    });

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@silanpay.com",
      to: email,
      subject: "SilanPay - Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #228DCE;">Welcome to SilanPay!</h2>
          <p>Your One-Time Password (OTP) for email verification is:</p>
          <div style="background: #f5f5f5; padding: 15px; text-align: center; margin: 20px 0;">
            <h1 style="color: #228DCE; font-size: 36px; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 5 minutes.</p>
          <p style="color: #666;">If you didn't request this, please ignore this email.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px; text-align: center;">© 2025 SilanPay. All rights reserved.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ success: true, message: "OTP sent to your email", email });
    } catch (emailError) {
      console.error("Email send error:", emailError);
      // Dev fallback: return OTP in response (remove in production)
      return res.json({ success: true, message: `OTP sent (dev mode)`, email, devOtp: otp });
    }
  } catch (error) {
    console.error("Step 1 registration error:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

/* ---------------- Step 2: Verify OTP ---------------- */
router.post("/register/verify-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.status(400).json({ success: false, message: "OTP expired or invalid" });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Mark as verified
    storedData.verified = true;
    otpStore.set(email, storedData);

    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});

/* ---------------- Resend OTP ---------------- */
router.post("/register/resend-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.status(400).json({ success: false, message: "No pending registration found" });
    }

    // Generate new OTP and update expiry (keep the hashed password)
    const otp = crypto.randomInt(100000, 999999).toString();
    storedData.otp = otp;
    storedData.expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(email, storedData);

    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@silanpay.com",
      to: email,
      subject: "SilanPay - Email Verification OTP (Resent)",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #228DCE;">SilanPay Email Verification</h2>
          <p>Your new One-Time Password (OTP) is:</p>
          <div style="background: #f5f5f5; padding: 15px; text-align: center; margin: 20px 0;">
            <h1 style="color: #228DCE; font-size: 36px; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ success: true, message: "New OTP sent to your email" });
    } catch (emailError) {
      console.error("Email send error:", emailError);
      return res.json({ success: true, message: `New OTP sent (dev mode)`, devOtp: otp });
    }
  } catch (error) {
    console.error("Resend OTP error:", error);
    return res.status(500).json({ success: false, message: "Failed to resend OTP" });
  }
});

/* ---------------- Step 3: Complete Registration with Full Profile ---------------- */
router.post("/register/complete", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const {
      firstName,
      lastName,
      phone,
      aadharNumber,
      panNumber,
      businessName,
      businessType,
      address,
      city,
      state,
      pincode,
      photo,
    } = req.body;

    // Validate OTP was verified
    const storedData = otpStore.get(email);
    if (!storedData || !storedData.verified) {
      return res.status(400).json({ success: false, message: "Email not verified" });
    }

    // Validate required fields
    if (!firstName || !lastName || !phone || !aadharNumber || !panNumber) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    // Validate Aadhar (12 digits)
    if (!/^\d{12}$/.test(aadharNumber)) {
      return res.status(400).json({ success: false, message: "Invalid Aadhar number. Must be 12 digits" });
    }

    // Validate PAN
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
      return res.status(400).json({ success: false, message: "Invalid PAN number format" });
    }

    // Validate phone
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Invalid phone number. Must be 10 digits" });
    }

    // Ensure email still not registered (race)
    const existing = await User.findOne({ email });
    if (existing) {
      otpStore.delete(email);
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Create user using hashed password stored earlier
    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: storedData.passwordHash, // hashed password
      phone,
      role: "user",
      profile: {
        firstName,
        lastName,
        aadharNumber,
        panNumber,
        businessName,
        businessType,
        address,
        city,
        state,
        pincode,
        photo,
        isKYCVerified: false,
        kycStatus: "pending",
      },
    });

    user.$locals = user.$locals || {};
    user.$locals.passwordAlreadyHashed = true;

    if (typeof user.generateApiKey === "function") user.generateApiKey();
    await user.save();

    // Clean up OTP
    otpStore.delete(email);

    // Generate token
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" });

    return res.json({
      success: true,
      message: "Registration completed successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        apiKey: user.apiKey,
      },
      token,
    });
  } catch (error) {
    console.error("Complete registration error:", error);
    return res.status(500).json({ success: false, message: "Registration failed" });
  }
});

/* ---------------- Forgot Password - Send OTP ---------------- */
router.post("/forgot-password", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "Email not registered" });

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore.set(getResetOtpKey(email), { otp, expiresAt: Date.now() + 5 * 60 * 1000, verified: false });

    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@silanpay.com",
      to: email,
      subject: "SilanPay - Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #228DCE;">Password Reset Request</h2>
          <p>Your One-Time Password (OTP) for password reset is:</p>
          <div style="background: #f5f5f5; padding: 15px; text-align: center; margin: 20px 0;">
            <h1 style="color: #228DCE; font-size: 36px; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ success: true, message: "OTP sent to your email" });
    } catch (emailError) {
      console.error("Email send error:", emailError);
      return res.json({ success: true, message: `OTP sent (dev mode)`, devOtp: otp });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

/* ---------------- Verify Reset OTP ---------------- */
router.post("/forgot-password/verify-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required" });

    const storedData = otpStore.get(getResetOtpKey(email));
    if (!storedData) return res.status(400).json({ success: false, message: "OTP expired or invalid" });

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(getResetOtpKey(email));
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (storedData.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });

    storedData.verified = true;
    otpStore.set(getResetOtpKey(email), storedData);
    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});

/* ---------------- Reset Password ---------------- */
router.post("/reset-password", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { newPassword } = req.body;
    if (!email || !newPassword) return res.status(400).json({ success: false, message: "Email and new password are required" });

    const storedData = otpStore.get(getResetOtpKey(email));
    if (!storedData || !storedData.verified) return res.status(400).json({ success: false, message: "OTP not verified" });

    if (newPassword.length < 6) return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.$locals = user.$locals || {};
    user.$locals.passwordAlreadyHashed = true;
    await user.save();

    otpStore.delete(getResetOtpKey(email));
    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ success: false, message: "Failed to reset password" });
  }
});

/* ---------------- Login (user) ---------------- */
router.post("/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
    if (user.isActive === false) return res.status(403).json({ success: false, message: "Account is deactivated" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" });

    return res.json({ success: true, message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

/* ---------------- Admin Login (public route) ---------------- */
router.post("/admin-login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { password, adminCode } = req.body;
    if (!email || !password || !adminCode) return res.status(400).json({ success: false, message: "All fields are required" });

    if (adminCode !== process.env.ADMIN_SECRET) return res.status(403).json({ success: false, message: "Invalid admin secret code" });

    const admin = await User.findOne({ email, role: "admin" }).select("+password");
    if (!admin) return res.status(401).json({ success: false, message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return res.json({ success: true, message: "Admin login successful", token, user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

/* ---------------- Protected user endpoints ---------------- */
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Get User Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

router.get("/verify", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Verify Token Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
