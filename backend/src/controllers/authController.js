const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const otpService = require("../services/otpService");
const emailService = require("../services/emailService");
const { HTTP_STATUS, REGEX } = require("../config/constants");

class AuthController {
  /**
   * STEP 1: Register - Send OTP to email
   */
  async registerStep1(req, res) {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email and password are required",
        });
      }

      if (!REGEX.EMAIL.test(email)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Invalid email format",
        });
      }

      if (!REGEX.PASSWORD.test(password)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(HTTP_STATUS.CONFLICT).json({
          success: false,
          message: "Email already registered. Please login instead.",
        });
      }

      // Generate OTP
      const otp = otpService.generate();

      // Hash password
      const passwordHash = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_ROUNDS) || 10
      );

      // Save OTP with hashed password
      otpService.save(email.toLowerCase(), otp, { passwordHash });

      // Send OTP email
      const emailResult = await emailService.sendOTP(
        email,
        otp,
        "registration"
      );

      if (!emailResult.success) {
        console.error("Email send failed:", emailResult.error);
        // In development, return OTP in response if email fails
        if (process.env.NODE_ENV === "development") {
          return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "OTP generated (email service unavailable)",
            devOtp: otp, // Only in development
          });
        }
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Failed to send OTP email. Please try again.",
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "OTP sent to your email address",
      });
    } catch (error) {
      console.error("Register Step 1 error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Registration failed. Please try again.",
      });
    }
  }

  /**
   * STEP 2: Verify OTP
   */
  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email and OTP are required",
        });
      }

      // Verify OTP
      const result = otpService.verify(email.toLowerCase(), otp);

      if (!result.success) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(result);
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "OTP verified successfully. Proceed to complete registration.",
      });
    } catch (error) {
      console.error("Verify OTP error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "OTP verification failed. Please try again.",
      });
    }
  }

  /**
   * Resend OTP
   */
  async resendOTP(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email is required",
        });
      }

      // Get existing data
      const existingData = otpService.get(email.toLowerCase());
      if (!existingData) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message:
            "No registration found. Please start the registration process again.",
        });
      }

      // Generate new OTP
      const otp = otpService.generate();

      // Save new OTP with existing password hash
      otpService.save(email.toLowerCase(), otp, {
        passwordHash: existingData.passwordHash,
      });

      // Send new OTP
      const emailResult = await emailService.sendOTP(email, otp, "resend");

      if (!emailResult.success) {
        if (process.env.NODE_ENV === "development") {
          return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "New OTP generated (email service unavailable)",
            devOtp: otp,
          });
        }
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Failed to send OTP. Please try again.",
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "New OTP sent to your email",
      });
    } catch (error) {
      console.error("Resend OTP error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to resend OTP. Please try again.",
      });
    }
  }

  /**
   * STEP 3: Complete Registration with Profile Data
   */
  async completeRegistration(req, res) {
    try {
      const {
        email,
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

      // Check if OTP is verified
      if (!otpService.isVerified(email.toLowerCase())) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Please verify your email with OTP first",
        });
      }

      // Validate required fields
      if (!firstName || !lastName || !phone) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "First name, last name, and phone are required",
        });
      }

      // Validate phone
      if (!REGEX.PHONE.test(phone)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Phone number must be 10 digits",
        });
      }

      // Validate Aadhar if provided
      if (aadharNumber && !REGEX.AADHAR.test(aadharNumber)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Aadhar number must be 12 digits",
        });
      }

      // Validate PAN if provided
      if (panNumber && !REGEX.PAN.test(panNumber.toUpperCase())) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Invalid PAN format (e.g., ABCDE1234F)",
        });
      }

      // Get stored data
      const storedData = otpService.get(email.toLowerCase());
      if (!storedData || !storedData.passwordHash) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Registration session expired. Please start again.",
        });
      }

      // Create user with profile
      const user = new User({
        name: `${firstName} ${lastName}`,
        email: email.toLowerCase(),
        password: storedData.passwordHash,
        phone,
        profile: {
          firstName,
          lastName,
          aadharNumber: aadharNumber || undefined,
          panNumber: panNumber ? panNumber.toUpperCase() : undefined,
          businessName: businessName || undefined,
          businessType: businessType || undefined,
          address: address || undefined,
          city: city || undefined,
          state: state || undefined,
          pincode: pincode || undefined,
          photo: photo || undefined,
          isKYCVerified: false,
          kycStatus: "pending",
        },
      });

      // Generate API key
      user.apiKey = user.generateApiKey();

      await user.save();

      // Clean up OTP
      otpService.delete(email.toLowerCase());

      // Send welcome email (don't wait for it)
      emailService
        .sendWelcomeEmail(email, firstName)
        .catch((err) => console.error("Welcome email failed:", err));

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || "30d" }
      );

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "Registration completed successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          apiKey: user.apiKey,
          profile: user.profile,
        },
      });
    } catch (error) {
      console.error("Complete registration error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Registration failed. Please try again.",
      });
    }
  }

  /**
   * Login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Find user with password field
      const user = await User.findOne({ email: email.toLowerCase() }).select(
        "+password"
      );

      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Check if account is active
      if (!user.isActive) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: "Account is deactivated. Please contact support.",
        });
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Update last login
      user.lastLogin = Date.now();
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || "30d" }
      );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          apiKey: user.apiKey,
          profile: user.profile,
          lastLogin: user.lastLogin,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Login failed. Please try again.",
      });
    }
  }

  /**
   * Forgot Password - Send OTP
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email is required",
        });
      }

      // Check if user exists
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        // Don't reveal if email exists
        return res.status(HTTP_STATUS.OK).json({
          success: true,
          message: "If the email exists, an OTP has been sent",
        });
      }

      // Generate OTP
      const otp = otpService.generate();

      // Save OTP for password reset
      otpService.save(`reset_${email.toLowerCase()}`, otp, {
        userId: user._id,
      });

      // Send OTP
      const emailResult = await emailService.sendOTP(email, otp, "forgot");

      if (!emailResult.success && process.env.NODE_ENV === "development") {
        return res.status(HTTP_STATUS.OK).json({
          success: true,
          message: "OTP generated for password reset",
          devOtp: otp,
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Password reset OTP sent to your email",
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to process request. Please try again.",
      });
    }
  }

  /**
   * Verify Forgot Password OTP
   */
  async verifyResetOTP(req, res) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email and OTP are required",
        });
      }

      const result = otpService.verify(`reset_${email.toLowerCase()}`, otp);

      if (!result.success) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(result);
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "OTP verified. You can now reset your password.",
      });
    } catch (error) {
      console.error("Verify reset OTP error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Verification failed. Please try again.",
      });
    }
  }

  /**
   * Reset Password
   */
  async resetPassword(req, res) {
    try {
      const { email, newPassword } = req.body;

      if (!email || !newPassword) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email and new password are required",
        });
      }

      if (!REGEX.PASSWORD.test(newPassword)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }

      // Check if OTP is verified
      if (!otpService.isVerified(`reset_${email.toLowerCase()}`)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Please verify OTP first",
        });
      }

      // Find user
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      // Update password (will be hashed by pre-save hook)
      user.password = newPassword;
      await user.save();

      // Clean up OTP
      otpService.delete(`reset_${email.toLowerCase()}`);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message:
          "Password reset successfully. You can now login with your new password.",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Password reset failed. Please try again.",
      });
    }
  }

  /**
   * Get Current User
   */
  async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          apiKey: user.apiKey,
          profile: user.profile,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
        },
      });
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to fetch user data",
      });
    }
  }

  /**
   * Admin Login
   */
  async adminLogin(req, res) {
    try {
      const { email, password, adminSecret } = req.body;

      if (!email || !password || !adminSecret) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email, password, and admin secret are required",
        });
      }

      // Verify admin secret
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: "Invalid admin secret",
        });
      }

      // Find admin user
      const user = await User.findOne({
        email: email.toLowerCase(),
        role: "admin",
      }).select("+password");

      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Generate token with shorter expiry for admin
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Admin login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Login failed. Please try again.",
      });
    }
  }
}

module.exports = new AuthController();
