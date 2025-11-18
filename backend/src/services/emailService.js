const transporter = require("../config/email");

class EmailService {
  /**
   * Send OTP email
   */
  async sendOTP(email, otp, type = "registration") {
    const subjects = {
      registration: "Email Verification - OTP",
      forgot: "Password Reset - OTP",
      resend: "Email Verification - New OTP",
    };

    const messages = {
      registration:
        "Thank you for registering with SilanPay. Please verify your email address.",
      forgot:
        "You requested to reset your password. Use the OTP below to proceed.",
      resend: "Here is your new verification code.",
    };

    const mailOptions = {
      from:
        process.env.EMAIL_FROM ||
        `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${process.env.APP_NAME || "SilanPay"} - ${subjects[type]}`,
      html: this.getOTPTemplate(otp, type, messages[type]),
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Email send error:", error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get HTML template for OTP email
   */
  getOTPTemplate(otp, type, message) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa; padding: 20px; }
          .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #228DCE 0%, #1a6fa8 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: #ffffff; font-size: 28px; font-weight: 600; margin: 0; }
          .header p { color: #e0f2ff; font-size: 14px; margin-top: 8px; }
          .content { padding: 40px 30px; }
          .message { color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
          .otp-container { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #228DCE; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
          .otp-label { color: #1f2937; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; }
          .otp-code { font-size: 48px; font-weight: bold; color: #228DCE; letter-spacing: 12px; font-family: 'Courier New', Courier, monospace; margin: 10px 0; }
          .otp-validity { color: #6b7280; font-size: 13px; margin-top: 15px; }
          .info-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 25px 0; }
          .info-box p { color: #92400e; font-size: 14px; line-height: 1.5; margin: 0; }
          .security-note { background: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 25px; }
          .security-note h3 { color: #1f2937; font-size: 14px; font-weight: 600; margin-bottom: 10px; }
          .security-note p { color: #6b7280; font-size: 13px; line-height: 1.5; }
          .footer { background: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer p { color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 5px 0; }
          .footer a { color: #228DCE; text-decoration: none; }
          .divider { height: 1px; background: #e5e7eb; margin: 25px 0; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>${process.env.APP_NAME || "SilanPay"}</h1>
            <p>Payment Gateway Platform</p>
          </div>
          
          <div class="content">
            <p class="message">${message}</p>
            
            <div class="otp-container">
              <div class="otp-label">Your Verification Code</div>
              <div class="otp-code">${otp}</div>
              <div class="otp-validity">⏱️ Valid for 5 minutes</div>
            </div>
            
            <div class="info-box">
              <p><strong>⚠️ Important:</strong> This OTP can only be used once and will expire in 5 minutes. Do not share this code with anyone.</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="security-note">
              <h3>🔒 Security Tips</h3>
              <p>
                • Never share your OTP with anyone, including ${
                  process.env.APP_NAME || "SilanPay"
                } staff<br>
                • We will never ask for your OTP via phone or email<br>
                • If you didn't request this OTP, please ignore this email
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} ${
      process.env.APP_NAME || "SilanPay"
    }. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
            <p>Need help? Contact us at <a href="mailto:support@silanpay.com">support@silanpay.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Send welcome email after registration
   */
  async sendWelcomeEmail(email, name) {
    const mailOptions = {
      from:
        process.env.EMAIL_FROM ||
        `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to ${process.env.APP_NAME || "SilanPay"}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f5f7fa; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #228DCE 0%, #1a6fa8 100%); padding: 40px 20px; text-align: center; color: white; }
            .content { padding: 40px 30px; }
            .btn { display: inline-block; padding: 12px 30px; background: #228DCE; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ${process.env.APP_NAME || "SilanPay"}! 🎉</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}!</h2>
              <p>Your account has been successfully created. You can now start using our payment gateway services.</p>
              <a href="${
                process.env.FRONTEND_URL
              }/dashboard" class="btn">Go to Dashboard</a>
              <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                If you have any questions, feel free to reach out to our support team.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error("Welcome email error:", error);
      return { success: false };
    }
  }
}

module.exports = new EmailService();
