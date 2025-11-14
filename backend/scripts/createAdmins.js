const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import User model
const User = require("../models/User");

const createAdminUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/silanpay"
    );
    console.log("✓ Connected to MongoDB");

    const admins = [
      {
        name: "Admin",
        email: "admin@silanpay.com",
        password: "Admin@123456",
        role: "admin",
        phone: "9999999999",
      },
      {
        name: "Super Admin",
        email: "superadmin@silanpay.com",
        password: "SuperAdmin@123456",
        role: "admin",
        phone: "9999999998",
      },
      {
        name: "Manager",
        email: "manager@silanpay.com",
        password: "Manager@123456",
        role: "admin",
        phone: "9999999997",
      },
    ];

    console.log("\n========================================");
    console.log("Creating Admin Users...");
    console.log("========================================\n");

    for (const adminData of admins) {
      // Check if admin already exists
      const existingAdmin = await User.findOne({ email: adminData.email });

      if (existingAdmin) {
        console.log(`⚠  ${adminData.name} already exists (${adminData.email})`);
        continue;
      }

      // Create admin user
      const admin = new User(adminData);
      await admin.save();

      console.log(`✓ ${adminData.name} created successfully`);
      console.log(`  Email: ${adminData.email}`);
      console.log(`  Password: ${adminData.password}`);
      console.log("");
    }

    console.log("========================================");
    console.log("Admin Creation Complete!");
    console.log("========================================");
    console.log("\nYou can now login with these credentials at:");
    console.log("http://localhost:5174/login\n");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin users:", error);
    process.exit(1);
  }
};

// Run the script
createAdminUsers();
