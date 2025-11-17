import { useState } from "react";
import {
  Code2,
  Copy,
  CheckCircle,
  Eye,
  EyeOff,
  Trash2,
  Plus,
} from "lucide-react";

export default function DevelopersPage() {
  const [showKeys, setShowKeys] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);

  const apiKeys = [
    {
      id: 1,
      name: "Production API Key",
      key: "sk_live_51234567890abcdefghijklmnop",
      status: "active",
      created: "2025-01-01",
      lastUsed: "2025-01-17",
      requests: 125420,
    },
    {
      id: 2,
      name: "Sandbox Testing",
      key: "sk_test_51234567890abcdefghijklmnop",
      status: "active",
      created: "2024-12-15",
      lastUsed: "2025-01-17",
      requests: 45320,
    },
    {
      id: 3,
      name: "Mobile App Integration",
      key: "sk_live_mobile_1234567890abcdefghijk",
      status: "inactive",
      created: "2024-10-01",
      lastUsed: "2025-01-10",
      requests: 12450,
    },
  ];

  const toggleKeyVisibility = (id) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key) => {
    const visible = key.slice(-8);
    const masked = "*".repeat(key.length - 8);
    return masked + visible;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Developers</h1>
          <p className="text-gray-600 mt-2">Manage API keys and integrations</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" />
          New API Key
        </button>
      </div>

      {/* Documentation Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <div className="flex items-start gap-4">
          <Code2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              API Documentation
            </h2>
            <p className="text-gray-600 mb-4">
              Get started with our REST API to integrate payment processing into your application.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                View Docs
              </a>
              <a
                href="#"
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
              >
                API Reference
              </a>
              <a
                href="#"
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
              >
                Webhooks
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">API Keys</h2>
          <p className="text-gray-600 text-sm mt-1">
            Your secret keys for API authentication
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-6 hover:bg-gray-50 transition">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    {apiKey.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Created on {apiKey.created}
                  </p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    apiKey.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {apiKey.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Key Display */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                <code className="text-sm text-gray-700 font-mono">
                  {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                </code>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white transition"
                  >
                    {showKeys[apiKey.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white transition"
                  >
                    {copiedKey === apiKey.key ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">
                    REQUESTS
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {(apiKey.requests / 1000).toFixed(1)}K
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">
                    LAST USED
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {apiKey.lastUsed}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">
                    CREATED
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {apiKey.created}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                  Regenerate
                </button>
                <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                  Edit
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Quick Start</h2>
        </div>
        <div className="p-6">
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre>{`// Initialize SDK
import SilanPay from 'silarpay-sdk';

const payment = new SilanPay({
  apiKey: 'sk_live_...',
});

// Create payment
const result = await payment.createPayment({
  amount: 10000,
  currency: 'USD',
  customerEmail: 'customer@example.com'
});`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
