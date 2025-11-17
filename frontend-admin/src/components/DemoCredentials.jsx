import React, { useState } from "react";
import { Eye, EyeOff, Copy, CheckCircle, Shield, Zap } from "lucide-react";

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
      password:
        import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "Admin@123456",
      role: "Admin",
      access: "Full Dashboard Access",
      color: "blue",
      bgColor: "bg-blue-50",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-700",
      borderColor: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      buttonBg: "bg-blue-600",
      buttonHover: "hover:bg-blue-700",
    },
    {
      id: "superadmin",
      title: "Super Admin",
      email:
        import.meta.env.VITE_DEMO_SUPERADMIN_EMAIL ||
        "superadmin@silanpay.com",
      password:
        import.meta.env.VITE_DEMO_SUPERADMIN_PASSWORD ||
        "SuperAdmin@123456",
      role: "Super Admin",
      access: "All Features + User Management",
      color: "purple",
      bgColor: "bg-purple-50",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-700",
      borderColor: "border-purple-200",
      hoverBorder: "hover:border-purple-400",
      buttonBg: "bg-purple-600",
      buttonHover: "hover:bg-purple-700",
    },
    {
      id: "manager",
      title: "Manager Account",
      email: import.meta.env.VITE_DEMO_MANAGER_EMAIL || "manager@silanpay.com",
      password:
        import.meta.env.VITE_DEMO_MANAGER_PASSWORD || "Manager@123456",
      role: "Manager",
      access: "View Only + Reports",
      color: "green",
      bgColor: "bg-emerald-50",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-700",
      borderColor: "border-emerald-200",
      hoverBorder: "hover:border-emerald-400",
      buttonBg: "bg-emerald-600",
      buttonHover: "hover:bg-emerald-700",
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
    <div className="mt-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-2xl p-8 border border-indigo-100 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Demo Login Credentials
              </h2>
            </div>
            <p className="text-gray-600">
              Test the admin panel with different role-based accounts
            </p>
          </div>
        </div>

        {/* Test Mode Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-indigo-200">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">
            Test Mode Active
          </span>
        </div>
      </div>

      {/* Credentials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credentials.map((cred) => (
          <div
            key={cred.id}
            className={`${cred.bgColor} rounded-xl border-2 ${cred.borderColor} ${cred.hoverBorder} transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden`}
          >
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {cred.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{cred.access}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${cred.badgeBg} ${cred.badgeText}`}
                >
                  {cred.role}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Email Address
                </label>
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 overflow-hidden">
                  <input
                    type="text"
                    value={cred.email}
                    readOnly
                    className="flex-1 px-3 py-2.5 text-sm bg-transparent focus:outline-none cursor-pointer font-medium text-gray-900"
                    onClick={() =>
                      copyToClipboard(cred.email, `${cred.id}-email`)
                    }
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(cred.email, `${cred.id}-email`)
                    }
                    className="px-3 py-2.5 text-gray-500 hover:text-primary-600 transition-colors border-l border-gray-200"
                    title="Copy email"
                  >
                    {copiedField === `${cred.id}-email` ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Password
                </label>
                <div className="flex items-center gap-0 bg-white rounded-lg border border-gray-300 overflow-hidden">
                  <input
                    type={showPasswords[cred.id] ? "text" : "password"}
                    value={cred.password}
                    readOnly
                    className="flex-1 px-3 py-2.5 text-sm bg-transparent focus:outline-none font-mono cursor-pointer text-gray-900"
                    onClick={() =>
                      copyToClipboard(cred.password, `${cred.id}-password`)
                    }
                  />
                  <button
                    onClick={() => togglePassword(cred.id)}
                    className="px-3 py-2.5 text-gray-500 hover:text-primary-600 transition-colors border-l border-gray-200"
                    title="Toggle password visibility"
                  >
                    {showPasswords[cred.id] ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        cred.password,
                        `${cred.id}-password`
                      )
                    }
                    className="px-3 py-2.5 text-gray-500 hover:text-primary-600 transition-colors border-l border-gray-200"
                    title="Copy password"
                  >
                    {copiedField === `${cred.id}-password` ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Login Button */}
              {onQuickLogin && (
                <button
                  onClick={() => onQuickLogin(cred.email, cred.password)}
                  className={`w-full py-2.5 px-4 text-sm font-semibold text-white rounded-lg transition-all duration-200 transform hover:scale-105 ${cred.buttonBg} ${cred.buttonHover} shadow-sm hover:shadow-md mt-2`}
                >
                  Quick Login
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-200">
              <span className="text-sm font-bold text-amber-800">!</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-900 mb-1">
              ⚠️ Development Only
            </h4>
            <p className="text-xs text-amber-800">
              These are demo credentials for testing purposes. <strong>Never use these in production.</strong> Always change all passwords and update security settings before deploying to live environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoCredentials;
