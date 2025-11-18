const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify email connection
transporter.verify((error, success) => {
  if (error) {
    console.warn("⚠️  Email service error:", error.message);
    console.log("💡 Make sure EMAIL_USER and EMAIL_PASSWORD are set in .env");
  } else {
    console.log("✅ Email service ready");
  }
});

module.exports = transporter;
