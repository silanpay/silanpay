import React, { useState } from "react";
import { Eye, EyeOff, Copy, CheckCircle } from "lucide-react";

const DemoCredentials = ({ onQuickLogin }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    admin: false,
    superadmin: false,
    manager: false,
  });

  const credentials = [
    {
      id: "admin",
      title: "Admin Account",
      email: import.meta.env.VITE_DEMO_ADMIN_EMAIL || "admin@silanpay.com",
      password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "Admin@123456",
      role: "Admin",
      access: "Full Dashboard Access",
      color: "blue",
    },
    {
      id: "superadmin",
      title: "Super Admin",
      email:
        import.meta.env.VITE_DEMO_SUPERADMIN_EMAIL || "superadmin@silanpay.com",
      password:
        import.meta.env.VITE_DEMO_SUPERADMIN_PASSWORD || "SuperAdmin@123456",
      role: "Super Admin",
      access: "All Features + User Management",
      color: "purple",
    },
    {
      id: "manager",
      title: "Manager Account",
      email: import.meta.env.VITE_DEMO_MANAGER_EMAIL || "manager@silanpay.com",
      password: import.meta.env.VITE_DEMO_MANAGER_PASSWORD || "Manager@123456",
      role: "Manager",
      access: "View Only + Reports",
      color: "green",
    },
  ];

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const togglePassword = (id) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-blue-200">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold text-gray-900">
          🔐 Demo Login Credentials
        </h3>
        <p className="text-sm text-gray-600">
          Choose any account to test the admin panel
        </p>
      </div>

      <div className="space-y-4">
        {credentials.map((cred) => (
          <div
            key={cred.id}
            className={`p-4 bg-white rounded-lg border-2 border-${cred.color}-200 hover:border-${cred.color}-400 transition-all duration-200 shadow-sm hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{cred.title}</h4>
                <p className="text-xs text-gray-500">{cred.access}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  cred.color === "blue"
                    ? "text-blue-700 bg-blue-100"
                    : cred.color === "purple"
                    ? "text-purple-700 bg-purple-100"
                    : "text-green-700 bg-green-100"
                }`}
              >
                {cred.role}
              </span>
            </div>

            {/* Email */}
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Email
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={cred.email}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    copyToClipboard(cred.email, `${cred.id}-email`)
                  }
                />
                <button
                  onClick={() =>
                    copyToClipboard(cred.email, `${cred.id}-email`)
                  }
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Copy email"
                >
                  {copiedField === `${cred.id}-email` ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="flex items-center gap-2">
                <input
                  type={showPasswords[cred.id] ? "text" : "password"}
                  value={cred.password}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none font-mono cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    copyToClipboard(cred.password, `${cred.id}-password`)
                  }
                />
                <button
                  onClick={() => togglePassword(cred.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Toggle password visibility"
                >
                  {showPasswords[cred.id] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(cred.password, `${cred.id}-password`)
                  }
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Copy password"
                >
                  {copiedField === `${cred.id}-password` ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick Login Button */}
            {onQuickLogin && (
              <button
                onClick={() => onQuickLogin(cred.email, cred.password)}
                className={`w-full py-2 px-4 text-sm font-semibold text-white rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  cred.color === "blue"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : cred.color === "purple"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Quick Login
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          ⚠️ <strong>Development Only:</strong> These are demo credentials for
          testing purposes. Change all passwords in production!
        </p>
      </div>
    </div>
  );
};

export default DemoCredentials;
