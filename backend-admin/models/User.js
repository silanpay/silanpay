const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    phone: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    apiKey: { type: String },
    profile: {
      firstName: String,
      lastName: String,
      aadharNumber: String,
      panNumber: String,
      businessName: String,
      businessType: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      photo: String,
      isKYCVerified: { type: Boolean, default: false },
      kycStatus: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  if (user.$locals && user.$locals.passwordAlreadyHashed) {
    delete user.$locals.passwordAlreadyHashed;
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Instance method to compare password
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate simple API key and save to user
UserSchema.methods.generateApiKey = function () {
  const key = crypto.randomBytes(32).toString("hex");
  this.apiKey = key;
  return key;
};

module.exports = mongoose.model("User", UserSchema);
