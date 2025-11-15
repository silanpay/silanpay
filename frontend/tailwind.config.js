/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#e6f5fb",
          100: "#cceaf7",
          200: "#99d6ef",
          300: "#66c1e7",
          400: "#33addf",
          500: "#238dcf",
          600: "#1c71a6",
          700: "#15557c",
          800: "#0e3853",
          900: "#071c29",
        },
        // Professional accent (Emerald)
        secondary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        accent: {
          gold: "#d97706",
          silver: "#6b7280",
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
