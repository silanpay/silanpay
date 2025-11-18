const esbuild = require("esbuild");
const { join } = require("path");
const fs = require("fs");

// Ensure dist directory exists
const distDir = join(__dirname, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log("🔨 Building backend with esbuild...");

esbuild
  .build({
    entryPoints: [join(__dirname, "src/server.js")],
    bundle: true,
    platform: "node",
    target: "node18",
    outfile: join(__dirname, "dist/server.js"),
    external: [
      "express",
      "mongoose",
      "bcryptjs",
      "jsonwebtoken",
      "nodemailer",
      "dotenv",
      "cors",
      "helmet",
      "express-rate-limit",
      "morgan",
      "compression",
    ],
    minify: process.env.NODE_ENV === "production",
    sourcemap: process.env.NODE_ENV !== "production",
    logLevel: "info",
  })
  .then(() => {
    console.log("✅ Build completed successfully!");
    console.log("📦 Output: dist/server.js");
  })
  .catch((error) => {
    console.error("❌ Build failed:", error);
    process.exit(1);
  });
