const crypto = require("crypto");
const { OTP } = require("../config/constants");

class OTPService {
  constructor() {
    // In-memory store (use Redis in production)
    this.store = new Map();
  }

  /**
   * Generate a random 6-digit OTP
   */
  generate() {
    return crypto.randomInt(100000, 999999).toString();
  }

  /**
   * Save OTP with associated data
   */
  save(email, otp, additionalData = {}) {
    this.store.set(email, {
      otp,
      ...additionalData,
      expiresAt: Date.now() + OTP.EXPIRY,
      attempts: 0,
      verified: false,
      createdAt: Date.now(),
    });
    console.log(
      `📧 OTP saved for ${email}: ${otp} (expires in ${OTP.EXPIRY / 1000}s)`
    );
  }

  /**
   * Get OTP data for an email
   */
  get(email) {
    return this.store.get(email);
  }

  /**
   * Verify OTP against stored value
   */
  verify(email, otp) {
    const data = this.store.get(email);

    if (!data) {
      return {
        success: false,
        message: "OTP not found. Please request a new one.",
      };
    }

    // Check expiration
    if (Date.now() > data.expiresAt) {
      this.store.delete(email);
      return {
        success: false,
        message: "OTP has expired. Please request a new one.",
      };
    }

    // Check attempts
    if (data.attempts >= OTP.MAX_ATTEMPTS) {
      this.store.delete(email);
      return {
        success: false,
        message:
          "Maximum OTP verification attempts exceeded. Please request a new one.",
      };
    }

    // Verify OTP
    if (data.otp !== otp) {
      data.attempts += 1;
      this.store.set(email, data);
      const remainingAttempts = OTP.MAX_ATTEMPTS - data.attempts;
      return {
        success: false,
        message: `Invalid OTP. ${remainingAttempts} attempt${
          remainingAttempts !== 1 ? "s" : ""
        } remaining.`,
      };
    }

    // Mark as verified
    data.verified = true;
    this.store.set(email, data);

    return {
      success: true,
      message: "OTP verified successfully",
      data,
    };
  }

  /**
   * Check if OTP is verified
   */
  isVerified(email) {
    const data = this.store.get(email);
    return data && data.verified === true;
  }

  /**
   * Delete OTP data
   */
  delete(email) {
    this.store.delete(email);
  }

  /**
   * Clean up expired OTPs (call periodically)
   */
  cleanup() {
    const now = Date.now();
    for (const [email, data] of this.store.entries()) {
      if (now > data.expiresAt) {
        this.store.delete(email);
      }
    }
  }
}

// Create singleton instance
const otpService = new OTPService();

// Cleanup expired OTPs every minute
setInterval(() => otpService.cleanup(), 60000);

module.exports = otpService;
