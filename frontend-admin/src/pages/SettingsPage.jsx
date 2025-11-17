import { Settings as SettingsIcon, Shield, Key, Database } from "lucide-react";

export default function SettingsPage() {
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your admin account settings</p>
      </div>

      {/* Admin Profile */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary-600" />
            Admin Profile
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={adminUser.name || ""}
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={adminUser.email || ""}
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <input
              type="text"
              value={adminUser.role || ""}
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 capitalize"
            />
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Key className="w-5 h-5 mr-2 text-primary-600" />
            API Configuration
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> API keys and secret codes are managed
              through environment variables for security.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Backend API
              </h3>
              <p className="text-xs text-gray-600">
                {import.meta.env.VITE_API_URL || "http://localhost:5000/api"}
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Environment
              </h3>
              <p className="text-xs text-gray-600">
                {import.meta.env.MODE || "development"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Database className="w-5 h-5 mr-2 text-primary-600" />
            System Information
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Version</p>
              <p className="text-lg font-semibold text-gray-900">1.0.0</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Last Updated</p>
              <p className="text-lg font-semibold text-gray-900">Today</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Status</p>
              <p className="text-lg font-semibold text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">
          🔒 Security Notice
        </h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• All admin actions are logged and monitored</li>
          <li>• Never share your admin credentials or API keys</li>
          <li>• Use strong passwords and enable 2FA when available</li>
          <li>• Regularly review user access and permissions</li>
        </ul>
      </div>
    </div>
  );
}
