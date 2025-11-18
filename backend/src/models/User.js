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
    apiKey: { type: String, unique: true, sparse: true },
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
      photo: String, // base64 encoded
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

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ apiKey: 1 });
UserSchema.index({ role: 1 });

// Hash password before save
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Instance method to compare password
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate API key
UserSchema.methods.generateApiKey = function () {
  const key = "sk_" + crypto.randomBytes(32).toString("hex");
  return key;
};

module.exports = mongoose.model("User", UserSchema);
