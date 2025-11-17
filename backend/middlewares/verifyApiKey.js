const verifyApiKey = (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) return res.status(401).json({ message: "API key required" });
    if (apiKey !== process.env.ADMIN_API_KEY) return res.status(403).json({ message: "Invalid API key" });
    next();
  } catch (error) {
    console.error("API Key Verification Error:", error);
    return res.status(500).json({ message: "API key verification failed" });
  }
};

module.exports = verifyApiKey;
