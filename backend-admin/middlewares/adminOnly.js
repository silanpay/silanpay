const adminOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }
    next();
  } catch (error) {
    console.error("Admin Verification Error:", error);
    return res.status(500).json({ message: "Authorization check failed" });
  }
};

module.exports = adminOnly;
